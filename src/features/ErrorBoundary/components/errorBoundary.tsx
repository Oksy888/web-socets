import { Button, Center, Stack, Text } from '@mantine/core'
import { useRouteError } from 'react-router-dom'

export const ErrorBoundary = () => {
  const error = useRouteError()
  console.error(error)
  return (
    <Center mih="100vh">
      <Stack>
        <Text>Something went wrong</Text>
        <Button component="a" href="/">
          go Home
        </Button>
      </Stack>
    </Center>
  )
}
