import { useTranslation } from 'react-i18next'
import { AxiosError } from 'axios'
import { useErrorHandlerModal } from './store/useErrorHandlerModal'

export function useHandleError() {
  const { t } = useTranslation()

  const handleError = (error: AxiosError | string) => {
    console.log('error', error)
    if (typeof error === 'string') {
      const status = error.split(', ')[0]
      if (status === '400') {
        useErrorHandlerModal.setState({
          text: '',
          title: t('errorMessages.400.4.text'),
          opened: true,
        })
      } else if (status === '401') {
        localStorage.removeItem('BEARER_TOKEN')
        // useModalTikTokAuth.setState({
        //   opened: true,
        //   firstAuth: true,
        // });
      } else if (status === '471') {
        useErrorHandlerModal.setState({
          text: '',
          title: t('errorMessages.471.text'),
          opened: true,
        })
      } else if (status === '403') {
        useErrorHandlerModal.setState({
          text: '',
          title: t('errorMessages.403.1.text'),
          showPrice: true,
          status: 403,
          opened: true,
        })
      } else {
        useErrorHandlerModal.setState({
          text: '',
          title: t(error),
          opened: true,
        })
      }
    } else if (error !== undefined && error.response !== undefined) {
      const data = error.response.data
      const status = error.response.status
      if (status === 401) {
        localStorage.removeItem('BEARER_TOKEN')
        // useModalTikTokAuth.setState({
        //   opened: true,
        //   firstAuth: true,
        // });
      } else if (status === 403) {
        useErrorHandlerModal.setState({
          text: '',
          title: t('errorMessages.403.1.text'),
          showPrice: true,
          status: 403,
          opened: true,
        })
      } else if (
        data &&
        typeof data === 'object' &&
        'detail' in data &&
        data.detail === 'Audio file is too short only from 1 minute'
      ) {
        useErrorHandlerModal.setState({
          text: '',
          title: t('errorMessages.400.6.text'),
          opened: true,
        })
      } else if (
        status === 400 &&
        typeof data === 'string' &&
        data.toLocaleLowerCase() === 'not found tikTok account'
      ) {
        useErrorHandlerModal.setState({
          text: '',
          title: t(data),
          opened: true,
        })
      } else if (
        status === 400 &&
        typeof data === 'string' &&
        data.toLocaleLowerCase() === 'tracking error'
      ) {
        useErrorHandlerModal.setState({
          text: '',
          title: t('errorMessages.trackingError'),
          opened: true,
        })
      } else if (
        status === 400 &&
        typeof data === 'string' &&
        data.toLocaleLowerCase() === 'author on tracking'
      ) {
        useErrorHandlerModal.setState({
          text: '',
          title: t(data),
          opened: false,
        })
      } else if (
        status === 400 &&
        typeof data === 'string' &&
        data.includes('HttpClient.Timeout')
      ) {
        useErrorHandlerModal.setState({
          text: '',
          title: t('errorMessages.400.2.text'),
          opened: true,
        })
      } else if (
        status === 400 &&
        data &&
        typeof data === 'object' &&
        'error' in data &&
        data.error === 'Invalid url to download'
      ) {
        useErrorHandlerModal.setState({
          text: '',
          title: t('errorMessages.400.3.text'),
          opened: true,
        })
      } else if (status === 400 && data === null) {
        useErrorHandlerModal.setState({
          text: '',
          title: t('errorMessages.400.1.text'),
          opened: true,
        })
      } else if (status === 471) {
        useErrorHandlerModal.setState({
          text: '',
          title: t('errorMessages.471.text'),
          opened: true,
        })
      } else if (status === 524) {
        useErrorHandlerModal.setState({
          text: '',
          title: t('errorMessages.524.text'),
          opened: true,
        })
      } else {
        useErrorHandlerModal.setState({
          text: t('errorMessages.400.4.text'),
          title: t('errorMessages.400.4.title'),
          opened: true,
        })
      }
    }
  }

  return { handleError }
}
