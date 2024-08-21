export default function Color() {
  return (
    <div className="p-4 m-2 bg-sky-700">
      <p className="w-full p-4 text-3xl text-white">Color</p>
      <div>
        <p className="text-white">Email address</p>
        <input
          type="email"
          name="email"
          id="email"
          className="text-gray-900 border-sky-200 border-4"
        />
        <p className="text-rose-500">This field is required</p>
      </div>
    </div>
  )
}
