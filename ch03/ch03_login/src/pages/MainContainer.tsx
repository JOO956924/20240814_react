import {Title} from '../components'

export default function LoginContainer() {
  const setLabel = function (wSize: number): object {
    return {width: wSize + 'px', display: 'inline-block'}
  }

  return (
    <section
      className="mt-4 w-full h=full"
      style={{background: 'gray', backgroundColor: 'pink'}}>
      <Title className="mb-5" style={{color: 'white'}}>
        Main
      </Title>
    </section>
  )
}
