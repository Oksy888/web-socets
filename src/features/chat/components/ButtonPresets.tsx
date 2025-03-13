import { Button, Group, Text } from '@mantine/core'
import styled from 'styled-components'
import { useMediaQuery } from '@mantine/hooks'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useChatStore } from '../store'
import { useEffect } from 'react'

export const ButtonPresets = ({
  buttons,
  type,
}: {
  buttons: {
    label: string
    link: string
    dataType: string
    onClick?: () => void
  }[]
  type: string
}) => {
  useEffect(() => {
    if (type !== 'history') {
      if (buttons[0] && buttons[0].link) {
        handleButtonClick(buttons[0].link, buttons[0].dataType)
      }
    } else return
  }, [])
  const isMobile = useMediaQuery(`(max-width: 768px)`)
  const navigate = useNavigate()
  const handleButtonClick = async (link: string, DataType: string) => {
    if (link.includes('https://gromus.ai')) {
      navigate(link.split('https://gromus.ai')[1])
    } else {
      try {
        const res = await axios.get(link)

        switch (DataType) {
          case 'HashtagsPersonal':
          case 'HashtagsGeneral':
            res.data &&
              useChatStore.setState({
                data: res.data,
              })
            res.data && console.log('Hashtags', res.data)
            //navigate('/ai-hashtags')

            break

          case 'TimePost':
            res.data && console.log('Time to post', res.data)
            //setPosts(res.data);
            // navigate('/ai-calendar')
            break

          case 'SoundSearch':
            useChatStore.setState({
              data: res.data,
            })
            res.data && console.log('SoundSearch', res.data)
            //navigate('/ai-data')
            break

          default:
        }
      } catch (error) {}
    }
  }
  return (
    <>
      {buttons && buttons.length === 1 ? (
        <Text c="dark_pink.4" fz={14}>
          Follow this button:
        </Text>
      ) : (
        <Text c="dark_pink.4" fz={14}>
          Choose an option:
        </Text>
      )}
      <Group gap={6}>
        {buttons.map((btn) => {
          if (btn.label === '') return null
          else {
            return (
              <Button
                key={btn.label}
                variant="outline"
                radius="xl"
                color="white"
                styles={{ label: { whiteSpace: 'wrap' } }}
                style={{
                  flexGrow: 1,
                  '&:hover': {
                    color: '#d1fd0a',
                    borderColor: '#d1fd0a',
                    transition: 'color ease-in-out 0.5s',
                  },
                }}
                onClick={() => {
                  if (btn.link && btn.dataType)
                    handleButtonClick(btn.link, btn.dataType)
                  else {
                    btn.onClick && btn.onClick()
                  }
                  if (isMobile) {
                  }
                }}
              >
                {btn.label}
              </Button>
            )
          }
        })}
      </Group>
    </>
  )
}

export const StyledButton: typeof Button = styled(Button)`
  &:hover {
    color: white;
    border-color: #d1fd0a;
  }
`
