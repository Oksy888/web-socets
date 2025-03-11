import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { Environment } from '../../core/environment'
import { devtools } from 'zustand/middleware'
import { ApiSounds } from '../../requests/sounds/sounds'
import { ApiAuthorAnalytics } from '../../requests/author/authorAnalytics'
import { ApiAuthorStatesAnalytics } from '../../requests/author/authorStates'
import { ApiSoundUsedByAuthor } from '../../requests/sounds/soundUsedByAuthor'

type IState = {
  chatId: string
  messages: IMessage[]
  data?: ApiSounds.IResponse
  dataAuthor?: [
    {
      DataType: 'AuthorData' | 'AuthorStatesAnalytic' | 'SongsUsedByAuthor'
      Data:
        | ApiAuthorAnalytics.IResponse
        | ApiAuthorStatesAnalytics.IResponse
        | ApiSoundUsedByAuthor.IResponse
    },
  ]
}
export type ITimePostAI = {
  id: string | number | null
  dayOfWeek: string
  isCorrectTime: string
  systemSuggestion: string
  title: string
  userTime: string
}

export interface IMessage {
  messageArray?: string[]
  message: string | string[]
  messageId: string
  isCopilot: boolean
  dataType?: string | null
  data?:
    | ApiAuthorAnalytics.IResponse
    | ApiSounds.IResponse
    | ITimePostAI[]
    | null
  date: string
  buttons?: {
    link?: string
    label: string
    dataType?: string
    onClick?: () => void
  }[]
  raiting?: -1 | 1
}

export const useChatStore = create<IState>()(
  devtools(
    () => ({
      chatId: uuidv4(),
      messages: [
        {
          isCopilot: true,
          date: new Date().toISOString(),
          messageId: uuidv4(),
          message: '',
        },
      ],
    }),
    {
      enabled: Environment.isDev,
      name: 'chat',
    }
  )
)

export const addMessage = (message: IMessage) => {
  useChatStore.setState((prev) => ({
    ...prev,
    messages: [...prev.messages, message],
  }))
}

export const clearChat = () => {
  useChatStore.setState({
    chatId: uuidv4(),
    messages: [
      {
        isCopilot: true,
        date: new Date().toISOString(),
        messageId: uuidv4(),
        message: '',
      },
    ],
  })
}
export const clearChatAllEmpty = () => {
  useChatStore.setState({
    chatId: uuidv4(),
    messages: [
      {
        isCopilot: true,
        date: new Date().toISOString(),
        messageId: uuidv4(),
        message: '',
      },
    ],
  })
}
