import queryString from 'query-string'
import axios from 'axios'

export namespace ApiAuthorAnalytics {
  const link = `/AuthorAnalytics`

  export type IRequest = {
    authorId?: number | string
    uniqueId?: number | string
  }

  export interface IResponse {
    author: Author
    chartPositions: ChartPosition[]
    calculations: Calculations
    risingSinceWeek: RisingSinceWeek
    authorStates: null
    videoRisedAuthor: null
    categories: Category[]
    avgSubscribersDailyRise: number
    influencerStatus: Status
    mostEngagement: Most
    mostLiked: Most
    mostShares: Most
    mostViews: Most
    mostComments: Most
    competitorsGeo: Author[]
    competitorsAudience: Author[]
    isFavorite: boolean
    isTracked: boolean
    locations: Location[]
    trendingStatus: ITrending
  }

  export interface ChartPosition {
    id: string
    bloggerId: string
    chartName: string
    place: number
    previousPlace: number
    value: number
    snapshotDate: string
  }

  export interface Author {
    id: string
    authorId: string
    subscribers: number
    subscribedAt: number
    clips: number
    likes: number
    diggCount: number
    url: string
    parser: 'UserItem' | 'SoundItem'
    uniqueId: string
    nickname: string
    avatar: null | string
    signature: string
    verified: boolean
    isADVirtual: boolean
    parseDate: string
    updateDate: string
    region: string
    subsDailyRise: number
    subsDailyRiseForecastError: number
    subsDailyRiseForecast: number
    subsGraphWeight: number
    isArtist: boolean
    commercialCategory: string | null
    notAvailable: boolean
    status: Status
  }
  export enum ITrending {
    LowTrendingChance = 'Low trending chance',
    HighTrendingChance = 'High trending chance',
    MiddleTrendingChance = 'Middle trending chance',
  }

  export enum Status {
    Giga = 'Giga',
    Nano = 'Nano',
    Started = 'Started',
    Ultra = 'Ultra',
  }

  export interface Calculations {
    authorId: string
    trendViews: number
    trendLikes: number
    trendComments: number
    trendShares: number
    engagementRate: number
    discussionRate: number
    socialRate: number
    effectiveRate: number
    audienceEngangement: number
    numberOfViews: number
    numberOfComments: number
    numberOfCommentsPer1000Likes: number
    medianShares: number
    numberOfSharesPer1000Likes: number
    date: string
    avgViews: number
    avgViews3Months: number
    avgViewsMonth: number
    avgViewsWeek: number
    chartsCount: number
    involvementRate: number
    averageDailyRise: number
    predictionStability: number
    averageLikes: number
    averageViews: number
    averageShares: number
    averageComments: number
  }

  export interface Category {
    categoryId: number
    categoryName: string
    count: number
    percentage: number
  }

  export interface Location {
    locationCode: string
    rate: number
  }

  export interface Most {
    videoId: string
    musicId: string
    authorId: string
    authorName: string
    user: string
    videoCreateTime: string
    playCount: number
    likes: number
    commentsCount: number
    collectCount: number
    cover: string
    shares: number
    videoTitle: string
    locationCreated: string
    videoUrl: string
    inDatabase: boolean
    isAd: boolean
  }

  export interface RisingSinceWeek {
    riseSubscribersSinceWeek: number
    riseLikesSinceWeek: number
    riseClipsSinceWeek: number
  }

  export const get = async (params: IRequest) => {
    return (
      await axios.get<IResponse>(`${link}?${queryString.stringify(params)}`)
    ).data
  }
}
