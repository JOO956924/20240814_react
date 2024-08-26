import {FC} from 'react'
import {Div, Title, Subtitle} from '../components'

export type ClockProps = {today: Date}

const Clock: FC<ClockProps> = ({today}) => {
  return (
    <Div className="flex flex-col items-center justify-start w-screen h-32 text-white bg-primary">
      <Title className="text-5xl">{today.toLocaleTimeString()}</Title>
      <Subtitle className="mt-4 text-2xl">{today.toLocaleDateString()}</Subtitle>
    </Div>
  )
}

export default Clock
