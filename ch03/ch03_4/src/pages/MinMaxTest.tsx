import {Div, Title} from '../components'
import * as D from '../data'

export default function MinMaxTest() {
  // prettier-ignore
  return (
    <section className="mt-4">
      <Title>MinMaxTest</Title>
      <Div className="p-4 bg-gray-300">
        <Div src={D.randomImage(800, 300)} className="bg-cover" minHeight="300px">
          <Div className="w-1/2 bg-blue-500 h-80"
            minwidth="300px" maxwidth="500px"/>
        </Div>
      </Div>
    </section>
  )
}
