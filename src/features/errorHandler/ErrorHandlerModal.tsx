import { Modal, Button, Image, Text, Stack } from '@mantine/core'
import {
  useErrorHandlerModal,
  closeErrorHandlerModal,
} from './store/useErrorHandlerModal'
import { useNavigate } from 'react-router-dom'
import { curvesBg, warningIcon, limitation } from '../../assets/img'

export const ErrorHandlerModal = () => {
  const opened = useErrorHandlerModal((s) => s.opened)
  const { text, title, status } = useErrorHandlerModal((s) => s)
  const navigate = useNavigate()
  const url = location.pathname
  const error = location.search.includes('error')

  return (
    <Modal
      withCloseButton={false}
      closeOnClickOutside={false}
      opened={opened}
      //onClose={closeErrorHandlerModal}
      onClose={() => {
        if (error) {
          navigate(url)
          closeErrorHandlerModal()
        } else {
          closeErrorHandlerModal()
        }
      }}
      centered
      transitionProps={{
        transition: 'fade',
        duration: 600,
        timingFunction: 'linear',
      }}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      styles={{
        body: {
          backgroundColor: 'transparent',
          backgroundImage: `url(${curvesBg})`,
          overflowX: 'hidden',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        },
      }}
    >
      <Stack justify="center" align="center" gap={15} p={20}>
        <Image
          src={status === 403 ? limitation : warningIcon}
          alt="warning"
          w={210}
        />
        {status !== 403 && <Image src={warningIcon} alt="warning" w={210} />}
        <Text c="white" fw="600" fz="20px" style={{ textAlign: 'center' }}>
          {title}
        </Text>
        <Text c="white" fw="200" fz="14px" style={{ textAlign: 'center' }}>
          {text}
        </Text>
        <Button
          bg="#d1fd0a"
          c="black"
          w={179}
          onClick={() => {
            if (error) {
              navigate('/')
              closeErrorHandlerModal()
            } else {
              closeErrorHandlerModal()
            }
          }}
        >
          Ok
        </Button>
      </Stack>
    </Modal>
  )
}
