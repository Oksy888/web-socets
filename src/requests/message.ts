import api from '../core/axiosInstance'

export namespace ApiMessage {
  const link = `/Conversation`

  export interface IPostMessagesRequest {
    actions?: string
    conversationId: string
    conversationName?: string
    date: string
    text: string
    data?: string | null
    dataType?: string | null
    context?: unknown
  }

  export interface ISavedMessage {
    id: string
    actions?: string
    conversationId: string
    isCopilotMessage: boolean
    date: string
    text: string
    data: string | null
    dataType: null | string
    raiting: number
    context: string | null
  }

  export interface IDataRate {
    messageId: string | number
    raiting: number
  }
  export interface ILimitInfo {
    limit: number
    used: number
    remaining: number
  }

  export const getLastMessages = async () => {
    const res = await api.get<ISavedMessage[]>(`${link}/GetLastMessages`)

    return res.data
  }

  export const fromUser = async (params: IPostMessagesRequest) => {
    const res = await api.post(`${link}/SaveUserMessage`, params)

    return res.data
  }

  export const fromCopilot = async (params: IPostMessagesRequest) => {
    const res = await api.post<ISavedMessage>(
      `${link}/SaveCopilotMessage`,
      params
    )

    return res.data
  }

  export const getLimit = async () => {
    const res = await api.get<ILimitInfo>(`${link}/GetConversationLimit`)

    return res.data
  }

  export const setRate = async (params: IDataRate) => {
    const res = await api.post(`${link}/SetRaiting`, params)

    return res.data
  }
}
