import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Environment } from '../../core/environment'

type IGlobalState = {
  limit: number
  used: number
  remaining: number
}

export const useGlobalStore = create<IGlobalState>()(
  devtools(
    () => ({
      limit: 5,
      used: 0,
      remaining: 5,
    }),
    {
      enabled: Environment.isDev ? true : false,
      name: 'global',
    }
  )
)
