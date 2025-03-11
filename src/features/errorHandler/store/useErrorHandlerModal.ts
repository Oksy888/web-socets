import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Environment } from '../../../core/environment'

type IOpenVideoModal = {
  opened: boolean
  showPrice: boolean
  text: string
  title: string
  status: number
  duplicate?: {
    text: string
    title: string
  }
}

export const useErrorHandlerModal = create<IOpenVideoModal>()(
  devtools(
    () => ({
      opened: false,
      text: '',
      title: '',
      status: 0,
      showPrice: false,
      duplicate: {
        text: 'Duplicate account',
        title:
          'This TikTok account is already linked. Please select a different one',
      },
    }),
    {
      enabled: Environment.isDev ? true : false,
      name: 'errors',
    }
  )
)

export const closeErrorHandlerModal = () =>
  useErrorHandlerModal.setState(() => ({
    opened: false,
  }))

export const openErrorHandlerModal = () => {
  useErrorHandlerModal.setState({
    opened: true,
  })
}
