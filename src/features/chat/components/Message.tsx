import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { Box, Button, Flex, Stack, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { formatDistance } from 'date-fns'
import styled from 'styled-components'
import { IMessage } from '../store'
import { RateMessageForm } from './RateMessageForm'
import { Loader } from '@mantine/core'
import { ButtonPresets } from './ButtonPresets'
import { ReactTyped } from 'react-typed'
import ReactMarkdown from 'react-markdown'
import { ApiMessage } from '../../../requests/message'

export type IMessages =
  | {
      type: 'message'
      first: boolean
      message: IMessage
    }
  | {
      type: 'history'
      first: boolean
      message: ApiMessage.ISavedMessage
    }

export const _Message = ({ message, first, type }: IMessages) => {
  let idMessage = ''
  if (type === 'message' && message) {
    const { messageId } = message
    idMessage = messageId
  }
  let buttons: { label: string; link: string; dataType: string }[] = []
  if (
    type === 'history' &&
    message?.actions &&
    message?.actions !== '' &&
    message?.actions?.length > 0
  ) {
    buttons = JSON.parse(message.actions)
  }
  return (
    <Stack>
      <Flex align={'center'} gap={8} justify={'space-between'}>
        <Flex align={'center'} gap={8}>
          {type === 'message'
            ? message?.isCopilot
              ? 'Copilot:'
              : null
            : type === 'history'
              ? message?.isCopilotMessage
                ? 'Copilot:'
                : null
              : null}
          <Text fz="sm" fw="700">
            {type === 'message'
              ? message?.isCopilot
                ? ' '
                : 'You'
              : type === 'history'
                ? message?.isCopilotMessage
                  ? ' '
                  : 'You'
                : null}
          </Text>
        </Flex>
        <Text fz={12} c="#56595C">
          {message &&
            formatDistance(new Date(message.date), new Date(), {
              addSuffix: true,
            })}
        </Text>
      </Flex>

      {type === 'message' && first && (
        <>
          <ReactTyped
            strings={[
              'Welcome!',
              'Great to see you!',
              message?.message as string,
            ]}
            typeSpeed={50}
            backSpeed={20}
            cursorChar="|"
            showCursor={true}
          />
          {message?.buttons && message?.buttons?.length > 0 && (
            <ButtonPresets
              type="message"
              buttons={message.buttons.map((button) => ({
                ...button,
                link: button.link || '',
                dataType: button.dataType || '',
              }))}
            />
          )}
        </>
      )}
      {!first && type === 'message' && (
        <>
          <Box style={{ whiteSpace: 'pre-wrap' }} component="div">
            {message?.message === 'Typing' ? (
              <Flex gap={10}>
                <Loader type="dots" color="white" />
              </Flex>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {message?.message as string}
              </ReactMarkdown>
            )}
          </Box>
          {message?.buttons && message?.buttons?.length > 0 && (
            <ButtonPresets
              type="message"
              buttons={message.buttons.map((button) => ({
                ...button,
                link: button.link || '',
                dataType: button.dataType || '',
              }))}
            />
          )}
        </>
      )}
      {!first && type === 'history' && (
        <>
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {message?.text}
          </ReactMarkdown>

          {message?.actions && message?.actions?.length > 0 && (
            <ButtonPresets
              buttons={buttons || [{ label: '', link: '', dataType: '' }]}
              type="history"
            />
          )}
          <RateMessageForm messageId={message?.id ?? ''} />
        </>
      )}
    </Stack>
  )
}

export const StyledButton: typeof Button = styled(Button)`
  flex-grow: 1;
  color: white;
  border-color: #6a6a6a;

  &:hover {
    color: white;
    border-color: #d1fd0a;
  }
`

const StyledText: typeof Text = styled(Text).attrs({
  fz: 'sm',
  fw: '600',
  lh: 'sm',
})``

export const Message = Object.assign(_Message, { Text: StyledText })
