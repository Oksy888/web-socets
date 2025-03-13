import queryString from 'query-string'
import axios from 'axios'

export namespace ApiSoundUsedByAuthor {
  const link = `/Statistics/SoundUsedByAuthor`

  export type IRequest = Partial<{
    days: number
    order: string
    sorting: string
    take: number
    skip: number
    authorId?: number | string
  }>

  export interface IResponse {
    sounds: Sound[]
    totalPages: number
  }

  export interface Sound {
    url: string
    title: string
    cover: string
    creator: string
    musicId: string
    musicOriginal: boolean
    duration: number
    reposts: number
    dailyRise: number
    dailyRiseForecasting: number
    album: string
    updateDate: string
    parseDate: string
    recognitionLink: string
    artistRegion: string
    authorIdLong: number
    authorUniqueId: string
    authorNickname: string
    isArtist: boolean
    musicStatus: number
    notAvailable: boolean
    topAudienceLocation: string
    topCategories: string[]
    totalCountries: number
    totalCategories: number
    lastWeekViewStats: number[]
    trendViews: number
    isAuthor: boolean
    link: string
  }

  export const get = async (params: IRequest) => {
    const res = await axios.get<IResponse>(
      `${link}?${queryString.stringify(params)}`
    )

    return res.data
  }
}
