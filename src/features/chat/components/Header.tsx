import { ActionIcon, Button, Flex, Progress, Stack, Text } from '@mantine/core'
import { IconBolt, IconX } from '@tabler/icons-react'
import styled from 'styled-components'

import { clearChat } from '../store'
import { useGlobalStore } from '../../store/globalStore'

export const Header = () => {
  const limit = useGlobalStore((state) => state.limit)

  const used = useGlobalStore((state) => state.used)
  return (
    <Wrapper>
      <Stack>
        <Flex gap={8} justify={'space-between'} align={'center'}>
          <Flex align={'center'} gap={4}>
            <IconBolt color="#000" size={16} />
            <Text fz="xs" lh="xs" fw="600" c="black">
              AI Assistant Beta
            </Text>
            <Button
              ml={8}
              size="compact-xs"
              variant="outline"
              color="#000"
              onClick={clearChat}
            >
              Clear chat
            </Button>
          </Flex>
          <ActionIcon variant="subtle" color="black" radius={'xl'} size={'sm'}>
            <IconX />
          </ActionIcon>
        </Flex>
        <Flex gap="sm">
          <Text fw="400" c="black">
            {used} / {limit}
          </Text>
          <Text fw="500" c="black" fz="xs">
            requests to AI Assistant
          </Text>
        </Flex>
        <Progress
          color="dark_pink.9"
          size="sm"
          value={(used && limit && (used / limit) * 100) || 0}
          animated
        />
      </Stack>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: var(--mantine-color-dark_pink-4);
  padding: 8px 12px;
`
