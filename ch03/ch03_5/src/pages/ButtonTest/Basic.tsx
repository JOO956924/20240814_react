import {Button} from '../../theme/daisyui'

export default function Basic() {
  return (
    <section className="mt-4">
      <h2 className="text-3xl font-bold text-center">Basic</h2>
      <div className="flex w-full mt-4 justify-evenly">
        <button>button</button>
        {/* prettier-ignore */}
        <button className=
          "px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-700">
          button + tailwindcss
        </button>
        <button className="btn btn-primary">button + daisyui</button>
        <Button className="btn btn-primary">Button + daisyui</Button>
      </div>
    </section>
  )
}
