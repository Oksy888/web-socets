import styled from 'styled-components'
import { useState } from 'react'
import { IconThumbDown, IconThumbUp } from '@tabler/icons-react'
import { ApiMessage } from '../../../requests/message'

interface IProps {
  messageId: string | number
}

export const RateMessageForm: React.FC<IProps> = ({ messageId }) => {
  const [activeRating, setActiveRating] = useState<null | boolean>(null)

  async function handleRating(value: boolean): Promise<any> {
    try {
      const data: ApiMessage.IDataRate = {
        messageId,
        raiting: value ? 1 : -1,
      }
      await ApiMessage.setRate({
        ...data,
      })
      setActiveRating(value)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      {messageId && (
        <BtnsContainer>
          <Button
            onClick={() => handleRating(true)}
            className={activeRating === true ? 'activeLike' : ''}
          >
            <IconThumbUp size={20} className="icon" />
          </Button>
          <Button
            onClick={() => handleRating(false)}
            className={activeRating === false ? 'activeDislike' : ''}
          >
            <IconThumbDown size={20} className="icon" />
          </Button>
        </BtnsContainer>
      )}
    </>
  )
}
const BtnsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Button = styled.button`
  background-color: transparent;
  padding: 0;
  border: none;
  cursor: pointer;

  &:hover .icon {
    color: aliceblue;
  }

  & .icon {
    transition: all 250ms ease;
    color: #696969;
  }
  &.activeLike .icon {
    color: #d1fd0a; /* Колір іконки при натисканні */
  }
  &.activeDislike .icon {
    color: #fd630a; /* Колір іконки при натисканні */
  }
`
