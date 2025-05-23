import axios, { isAxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { addMessage, useChatStore } from '../store'
import { v4 as uuidv4 } from 'uuid'
import { ApiMessage } from '../../../requests/message'
import { Presets } from '../components/presets'
import { ApiLLM } from '../llm'
import { useGlobalStore } from '../../store/globalStore'
import { useWebSockets } from './useWebSockets'
import { TOKEN } from '../../../core/axiosInstance'

type Payload = Pick<
  ApiMessage.IPostMessagesRequest,
  'conversationId' | 'text' | 'date'
>

export const getUserInfo = async (link: string) => {
  return await axios.get(link, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('BEARER_TOKEN')}`,
    },
  })
}
const userRegion = navigator.language
/*
export const useSendMessage = () => */
export const useSendMessage = () => {
  const {
    sendJsonMessage: sendJsonMessageNew,
    readyState: readyStateNew,
    lastMessage: lastMessageNew,
    lastJsonMessageCopilot: socketJsonMessage,
    connectionStatusCopilot: connectionStatusNewCopilot,
  } = useWebSockets({
    WS_URL: 'wss://gi-llm.gromus.io/v2/copilot/connect',
    newCopilotOpen: true,
    firstCopilotOpen: false,
  })
  const userId = '123' //useGlobalStore((state) => state.userInfo.id);
  const [prompt, setPrompt] = useState('')
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false)
  const { presetButtons, defaultButtons } = Presets()
  const queryClient = useQueryClient()
  const [allMessages, setAllMessages] = useState<ApiLLM.IResponse[]>([])

  useEffect(() => {
    if (socketJsonMessage) {
      const trimmedMessageToText = socketJsonMessage.Text
      setIsLoadingMessages(true)
      // setAllMessages((prevData) => [...prevData, socketJsonMessage])
      setAllMessages((prevData) => {
        const updatedAllMessages = [...prevData, socketJsonMessage]
        const updatedQueue = [
          ...prevData.map((data) => data.Text),
          trimmedMessageToText,
        ]
        collectMessages(socketJsonMessage, updatedQueue)
        return updatedAllMessages
      })

      if (trimmedMessageToText === '<|endoftext|>') {
        setIsLoadingMessages(false)
        setAllMessages([])
      }
    }
  }, [socketJsonMessage])

  useEffect(() => {
    if (
      connectionStatusNewCopilot === 'Closed' ||
      connectionStatusNewCopilot === 'Connecting'
    )
      setIsLoadingMessages(false)
  }, [connectionStatusNewCopilot])

  async function collectMessages(
    data: ApiLLM.IResponse,
    updatedQueue: string[] | null
  ) {
    const date = new Date().toISOString()

    const isDuplicate = allMessages.some(
      (webhook) =>
        webhook.Actions &&
        webhook?.Actions?.[0].link === data?.Actions?.[0].link &&
        webhook.DataType === data.DataType
    )
    const messageData = {
      isCopilot: true,
      data: data && data.Data,
      dataType: data && data.DataType,
      message: updatedQueue
        ? updatedQueue.join('').replace('<|endoftext|>', '').trim()
        : '',
      date,
    }
    let savedMessage: ApiMessage.ISavedMessage = {
      id: '',
      actions: '',
      conversationId: '',
      isCopilotMessage: true,
      date: '',
      text: '',
      data: null,
      dataType: null,
      raiting: 0,
      context: '',
    }

    const GroupedMsg =
      updatedQueue && updatedQueue.join('').replace('<|endoftext|>', '').trim()
    if (data?.Text === '<|endoftext|>') {
      if (GroupedMsg) {
        savedMessage = await ApiMessage.fromCopilot({
          conversationId: data.ConversationId,
          date,
          text: GroupedMsg,
          data: JSON.stringify(data.Data),
          dataType: data.DataType,
          context: data.Context,
          actions: JSON.stringify(data.Actions),
        })
      }
      if (savedMessage) {
        queryClient.invalidateQueries({
          queryKey: ['chatHistory'],
        })
      }
    }
    if (data.Actions && !isDuplicate) {
      savedMessage = await ApiMessage.fromCopilot({
        conversationId: data.ConversationId,
        date,
        text: data.Text,
        data: JSON.stringify(data.Data),
        dataType: data.DataType,
        actions: JSON.stringify(data.Actions),
        context: data.Context,
      })
    }
    if (!data.Actions) {
      addMessage({
        ...messageData,
        message: GroupedMsg ?? '',
        messageId: uuidv4(),
      })
    } else {
      const buttons =
        data.Actions?.map((el: { label?: string; link?: string }) => ({
          label: el.label ?? '',
          link: el.link ?? '',
          dataType: data.DataType,
        })) ?? []
      addMessage({
        ...messageData,
        messageId: savedMessage.id,
        buttons,
      })
    }

    if (data.DataType === 'SoundSearch' && data.Data) {
      useChatStore.setState({
        data: data.Data,
      })
      // navigate('/ai-data')
    }

    if (
      data.DataType === 'HashtagsPersonal' ||
      (data.DataType === 'HashtagsGeneral' && data.Data)
    ) {
      useChatStore.setState({
        data: data.Data,
      })
      //navigate('/ai-hashtags')
    }
  }

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      conversationId,
      text,
    }: Payload): Promise<ApiLLM.IResponse> => {
      useGlobalStore.setState((state) => ({ used: state.used + 1 }))
      const Message = {
        user_id: userId,
        conversation_id: conversationId,
        user_prompt: text,
        is_user_authorized_through_tiktok: false,
        user_region: userRegion,
        authorization: `Bearer ${TOKEN}`,
      }

      sendJsonMessageNew(Message)

      return lastMessageNew && JSON.parse(lastMessageNew.data)
    },
    onSuccess: () => {},
    onMutate: (data: {
      text: string
      date: string
      conversationId: string
    }) => {
      setPrompt('')
      addMessage({
        messageId: '',
        isCopilot: false,
        message: data.text,
        date: data.date,
      })
      ApiMessage.fromUser({
        conversationId: data.conversationId,
        date: data.date,
        text: data.text,
      })
    },

    onSettled(error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 500 || error.response?.status === 520) {
          addMessage({
            date: new Date().toISOString(),
            messageId: '',
            isCopilot: true,
            message:
              "Please try another request, as I was unable to process this one. I'm working on your previous request and I will provide you with the answer shortly.",
            buttons: defaultButtons,
          })
        } else if (error.response?.status === 403) {
          addMessage({
            date: new Date().toISOString(),
            messageId: '',
            isCopilot: true,
            message: `You've reached the limit of interactions available under your current monthly subscription. It's been a pleasure to communicate and collaborate with you! I'll keep an eye on your music and account. If you'd like to resume immediately, consider upgrading your subscription tier. Otherwise, we can pick things up again at the beginning of next month.`,
            buttons: [...presetButtons],
          })
        } else {
          addMessage({
            date: new Date().toISOString(),
            messageId: '',
            isCopilot: true,
            message:
              'Please try another request, as I was unable to process this one.',
            buttons: defaultButtons,
          })
        }

        return
      }
    },
  })

  return {
    send: (p: string) => {
      const prompt = p.trim()
      if (prompt) {
        mutate({
          conversationId: useChatStore.getState().chatId,
          date: new Date().toISOString(),
          text: prompt,
        })
      }
    },
    isPending,
    isLoadingMessages,
    prompt,
    setPrompt,
    readyStateNew,
    connectionStatusNewCopilot,
  }
}
