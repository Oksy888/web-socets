export namespace ApiLLM {
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
