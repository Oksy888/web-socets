import useWebSocket, { ReadyState } from 'react-use-websocket'
import {
  SendJsonMessage,
  SendMessage,
} from 'react-use-websocket/dist/lib/types'
import { ApiLLM } from '../llm'

interface useWebSocketsProps {
  WS_URL: string
  newCopilotOpen: boolean
  firstCopilotOpen: boolean
}

export const useWebSockets = ({
  WS_URL,
  newCopilotOpen,
  firstCopilotOpen,
}: useWebSocketsProps): {
  sendJsonMessage: SendJsonMessage
  sendMessage: SendMessage
  readyState: ReadyState
  lastMessage: MessageEvent<any> | null
  lastJsonMessageCopilot: ApiLLM.IResponse
  connectionStatusCopilot: string
} => {
  //const { userInfo } = useGlobalStore();
  const userInfo = { id: '123' }
  const {
    sendJsonMessage,
    sendMessage,
    readyState,
    lastJsonMessage,
    lastMessage,
  } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
      reconnectAttempts: 10,
    },
    firstCopilotOpen && !!userInfo.id
      ? firstCopilotOpen
      : !!userInfo.id && newCopilotOpen
  )
  const lastJsonMessageCopilot = lastJsonMessage as ApiLLM.IResponse
  const connectionStatusCopilot = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState]
  return {
    sendJsonMessage,
    sendMessage,
    readyState,
    lastMessage,
    lastJsonMessageCopilot,
    connectionStatusCopilot,
  }
}
