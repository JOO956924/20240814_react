import {Button} from '../../theme/daisyui'

export default function Size() {
  return (
    <section className="mt-4">
      <h2 className="text-3xl font-bold text-center">Size</h2>
      <div className="flex mt-4 justify-evenly">
        <Button className="btn-lg btn-primary">size lg</Button>
        <Button className="btn-md btn-secondary">size md</Button>
        <Button className="btn-sm btn-accent">size sm</Button>
        <Button className="btn-xs btn-info">size xs</Button>
      </div>
    </section>
  )
}
