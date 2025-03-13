import {
  Accordion,
  AppShell,
  Box,
  Divider,
  Flex,
  ScrollArea,
  Skeleton,
  Stack,
  Textarea,
} from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { IconSend2 } from '@tabler/icons-react'
import { Fragment, memo, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useChatHistoryData } from '../hooks/useChatHistoryData'
import { useSendMessage } from '../hooks/useSendMessage'
import { useChatStore } from '../store'
import { Header } from './Header'
import { Message } from './Message'
import { AxiosError } from 'axios'
import { ReadyState } from 'react-use-websocket'
import { Loader } from '@mantine/core'
import { getPresetsCopilotButton } from './presetsQuestions'
import { useHandleError } from '../../errorHandler/handleError'
import { Presets } from './presets'
import { useGlobalStore } from '../../store/globalStore'

const Chat = memo(() => {
  const { t } = useTranslation()
  const { handleError } = useHandleError()
  const userid = '123' //useGlobalStore((state) => state.userid)
  const used = useGlobalStore((state) => state.used)
  const limit = useGlobalStore((state) => state.limit)
  const remaining = limit - used
  const { messages } = useChatStore()
  const { defaultButtons, AuthModalButton } = Presets()
  const scrollRef = useRef<HTMLDivElement>(null)

  const {
    prompt,
    send,
    setPrompt,
    isPending,
    isLoadingMessages,
    connectionStatusNewCopilot,
    readyStateNew,
  } = useSendMessage()

  const { data, isLoading, isSuccess, isError, error } = useChatHistoryData()

  useEffect(() => {
    if (isError) {
      handleError(error as AxiosError)
    }
  }, [isError])

  useEffect(() => {
    // scrollRef.current?.scrollTo(
    //   0,
    //   scrollRef?.current?.scrollHeight
    // )
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  const firstMessageWithButtons = messages.find(
    (el) => el?.buttons?.length ?? 0 > 0
  )
  const featuresOfCopilotButton = getPresetsCopilotButton(send)
  return (
    <Stack gap={10} align="stretch">
      <Textarea
        autosize
        disabled={
          remaining <= 0 || readyStateNew !== ReadyState.OPEN || !userid
        } // || readyState !== ReadyState.OPEN
        value={prompt}
        onChange={(e) => setPrompt(e.currentTarget.value)}
        sx={() => ({
          '.mantine-Textarea-input': {
            //borderColor: theme.colors.gray[6],
            '&:focus': {
              borderColor: '#344054',
            },
          },
        })}
        // variant="unstyled"
        placeholder={t('chat.enterRequest')}
        rightSection={<IconSend2 />}
        rightSectionProps={{
          onClick: () => {
            if (userid) {
              //clearChatNotHistory();
              send(prompt)
            } //else openModalAuth()                                    //for not logged in users
          },
        }}
        onKeyDown={(e) => {
          if (['Enter', 'NumpadEnter'].includes(e.code)) {
            if (userid) {
              //clearChatNotHistory();
              send(prompt)
            } //else openModalAuth()                                    //for not logged in users
          }
        }}
      />
      <ScrollArea h={700} viewportRef={scrollRef} offsetScrollbars>
        <Header />

        {isSuccess && data && data.length > 0 && (
          <Stack h="auto" mt={8}>
            <Accordion
              variant="contained"
              radius="md"
              transitionDuration={1000}
              styles={{
                control: {
                  backgroundColor: 'transparent',
                  fontWeight: 700,
                  ':hover': {
                    backgroundColor: 'var(--mantine-color-dark_pink-4)',
                    color: 'var(--mantine-color-dark-7)',
                  },
                },
              }}
            >
              <Accordion.Item value="Last messages">
                <Accordion.Control>{t('chat.lastMessages')}</Accordion.Control>
                <Accordion.Panel>
                  <ScrollArea h={400} offsetScrollbars>
                    {isLoading && (
                      <Stack gap={16}>
                        <MessageSkeleton />
                        <MessageSkeleton />
                        <MessageSkeleton />
                      </Stack>
                    )}
                    {data.map((el, idx, arr) => {
                      {
                        return (
                          <Fragment key={idx}>
                            <Message
                              key={idx}
                              message={el}
                              first={false}
                              type="history"
                            />
                            {idx < arr.length - 1 && <Divider my={25} />}
                          </Fragment>
                        )
                      }
                    })}
                  </ScrollArea>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Stack>
        )}
        {/*  <Divider size="lg" my="xs" label="Last messages" labelPosition="center" /> */}

        <Stack py={30} px={16}>
          <Box>
            {userid && (
              <>
                <Message
                  type="message"
                  first={true}
                  message={{
                    message: t('chat.message'),
                    messageId: 'buttons features',
                    buttons: featuresOfCopilotButton,
                    isCopilot: true,
                    date: new Date().toISOString(),
                  }}
                />
                <Divider my={25} />
              </>
            )}
            {messages.map((el, idx, arr) => {
              const isLastMessage = idx === arr.length - 1
              const showMessage =
                el === firstMessageWithButtons || !el.isCopilot

              if ((isLastMessage && el.message !== '') || showMessage) {
                return (
                  <Fragment key={idx}>
                    <Message
                      key={idx}
                      message={el}
                      first={false}
                      type="message"
                    />
                    <Divider my={25} />
                  </Fragment>
                )
              }
              return null
            })}
          </Box>

          {(isPending || isLoadingMessages) && (
            <Flex justify="center">
              <Loader type="dots" color="dark_pink.4" />
            </Flex>
          )}
          {remaining <= 0 && userid && (
            <>
              <Divider my={25} />
              <Message
                type="message"
                first={false}
                message={{
                  message: t('chat.outOfRequests'),
                  messageId: 'out of requests',
                  isCopilot: true,
                  date: new Date().toISOString(),
                }}
              />
            </>
          )}
          {remaining <= 0 && !userid && (
            <>
              <Divider my={25} />
              <Message
                type="message"
                first={true}
                message={{
                  message: t('chat.loginToUse'),
                  messageId: 'buttons auth',
                  buttons: AuthModalButton,
                  isCopilot: true,
                  date: new Date().toISOString(),
                }}
              />
            </>
          )}

          {(connectionStatusNewCopilot === 'Closed' ||
            connectionStatusNewCopilot === 'Connecting') && (
            <Message
              type="message"
              first={false}
              message={{
                message: t('chat.noConnection'),
                messageId: 'buttons no connection',
                isCopilot: true,
                date: new Date().toISOString(),
                buttons: defaultButtons,
              }}
            />
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  )
})

export default Chat

const Aside = styled(AppShell.Aside)`
  @media (min-width: 768px) {
    background-color: #31323440;
  }

  justify-content: center;
`

const MessageSkeleton = () => (
  <Stack gap={8}>
    <Flex gap={12}>
      <Skeleton radius={'xl'} w={40} h={40} />
      <Skeleton w={60} h={12} />
    </Flex>
    <Stack gap={4}>
      <Skeleton w={'50%'} h={16} />
      <Skeleton w={'750%'} h={16} />
      <Skeleton w={'25%'} h={16} />
    </Stack>
  </Stack>
)
