import {Div, Title, Subtitle} from '../components'
import * as D from '../data'

export default function JustifyCenterTest() {
  const boxes = D.range(0, 5).map(index => (
    <Div key={index} className="w-4 h-4 m-1 bg-black" minHeight="auto" />
  ))

  return (
    <section className="p-4 mt-4">
      <Title>JustifyCenterTest</Title>
      <div className="mt-4">
        <Subtitle>flex flex-row justify-center</Subtitle>
        {/* flex-row일 때는item가 수직이고 justify가 수평 */}
        <div className="flex flex-row items-center justify-center h-40 bg-gray-300 min-h-40">
          {boxes}
        </div>
      </div>
      <div className="mt-4">
        <Subtitle>flex flex-col justify-center</Subtitle>
        {/* flex-col일 때는item가 수평이고 justify가 수직 */}
        <div className="flex flex-col items-center justify-center h-40 bg-gray-300">
          {boxes}
        </div>
      </div>
    </section>
  )
}
