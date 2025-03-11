import { useQuery } from '@tanstack/react-query'
import { ApiMessage } from '../../../requests/message'

export const useChatHistoryData = () => {
  const userId = '123' //useGlobalStore((state) => state.userid)
  return useQuery({
    queryKey: ['chatHistory'],
    queryFn: async () => {
      if (userId) {
        const res = await ApiMessage.getLastMessages()
        return res
      }
    },
    enabled: !!userId,
  })
}
