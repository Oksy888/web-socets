import queryString from 'query-string'
import api from '../../core/axiosInstance'

export namespace ApiSounds {
  const link = `/Statistics/SoundsFiltered`
  const defaultLink = `/Default/SoundsFiltered`
  const linkFiltersData = `/Statistics/SoundsFiltersData`
  const linkByAuthor = `/Statistics/SoundUsedByAuthor`

  export type IRequestSounds = Partial<{
    days: number
    order: string
    sorting: string
    search: string
    videosLocation: string
    artistLocation: string
    category: string | number | string[]
    take: number
    skip: number
    authorId?: number | string
    pageSize?: number
    page?: number
    durationTo?: number
    repostsFrom: number
    repostsTo: number
    genre: string | number | string[]
  }>

  export interface IResponse {
    music: Music[]
    filters: Filters
    rowsCount: number
    pages: number
    totalRows: number
    /*
    daysStats?: {
      dayOfWeek: number;
      dayName: string;
      hoursStats: { hour: number; percent: number }[];
    }[];
    Actions?: {
      link: string;
      label: string;
    }[];*/
  }

  export interface Filters {
    skip: number
    take: number
    soundType: string | null
    recognize: string | null
    location: string | null
    artistLocation: string
    videosLocation: string
    riseFrom: number | null
    riseTo: number | null
    repostsFrom: number
    repostsTo: number
    rateFrom: number | null
    rateTo: number | null
    forecastingFrom: number | null
    forecastingTo: number | null
    durationFrom: number | null
    durationTo: number
    days: number
    sorting: string
    timeMachineDaysAgo?: string | null
    search: string
    category: string | number
    isArtist: boolean | null
    dateFrom: string | null
    dateTo: string | null
    favoriteForUser: string | null
    order: string
    country: string | null
    followers: number | null
    genre: string | number
  }

  export interface Music {
    playUrl: string
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
    artistRegion: null
    authorIdLong: number
    authorUniqueId: string | null
    authorNickname: string | null
    isArtist: boolean
    topAudienceLocation: string
    topCategories: string[]
    totalCountries: number
    totalCategories: number
    lastWeekViewStats: number[] | null
    videoViews: number
    tikTokLink: string
    shazamLink: null | string
    musicStatus: number
    notAvailable: boolean
    growth: number
    genre: string | number
  }

  export const get = async (params: IRequestSounds) => {
    const res = await api.get<IResponse>(
      `${link}?${queryString.stringify(params)}`
    )
    return res.data
  }
  export const getDefault = async () => {
    const res = await api.get<IResponse>(defaultLink)
    return res.data
  }
  export const getByAuthor = async (params: IRequestSounds) => {
    const res = await api.get<IResponse>(
      `${linkByAuthor}?${queryString.stringify(params)}`
    )

    return res.data
  }
  interface IFiltersResponse {
    categories: CategoriesList[]
    regions: CountriesList[]
    worldRegions: WorldRegionsList[]
  }

  interface CategoriesList {
    id: number
    categoryName: string
    sounds: number
    videos: number
    authors: number
  }

  interface CountriesList {
    countryCode: string
    countryName: string
    flagPath: string
  }
  interface WorldRegionsList {
    regionName: string
    countryCode: string
  }

  export const getFilters = () => {
    return api.get<IFiltersResponse>(linkFiltersData)
  }
}
