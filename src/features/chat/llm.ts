export namespace ApiLLM {
  interface IRequest {
    user_id: string
    conversation_id: string
    user_prompt: string
    is_user_authorized_through_tiktok: boolean
    user_tiktok_nickname?: string
    user_region: string
  }

  export interface IResponse {
    ConversationId: string
    ConversationName: string
    Date: string
    Text: string
    Data: any
    DataType: string
    Context: unknown
    daysStats?: {
      dayOfWeek: number
      dayName: string
      hoursStats: { hour: number; percent: number }[]
    }[]
    Actions: Array<{ label?: string; link?: string }>
    raiting?: -1 | 1
  }
}
