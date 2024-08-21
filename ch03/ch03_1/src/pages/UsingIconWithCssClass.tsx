import {Icon3} from '../components'
export default function UsingIconWithCssClass() {
  return (
    <div>
      <h3>UsingIconWithCssClass</h3>
      <Icon3
        name="check_circle_outline"
        className="text-red"
        style={{fontSize: '50px'}}
      />
    </div>
  )
}
