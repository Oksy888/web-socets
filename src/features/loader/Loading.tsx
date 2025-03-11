import { Flex, Loader } from '@mantine/core'

export const Loading = () => {
  return (
    <Flex align={'center'} justify={'center'} mih={'100dvh'}>
      <Loader color="dark_pink.4" size="100px" />
    </Flex>
  )
}
