import {Title} from '../components'
import {Form} from '../components'
// import * as D from '../data'
// import Card from './Card'

export default function JoinContainer() {
  const setLabel = (wSize: number): object => {
    return {width: wSize + 'px', display: 'inline-block'}
  }

  return (
    <section
      className="m-4"
      style={{background: 'gray', width: '500px', borderRadius: '20px', color: 'white'}}>
      <Title className="mb-5" style={{color: 'white'}}>
        Join
      </Title>
      <form method="post" action="">
        <div className="flex items-center justify-center mb-3 ">
          <label htmlFor="exampleInputid1" style={setLabel(80)}>
            id
          </label>
          <input
            type="email"
            className="p-1 text-black rounded-md form-control"
            id="exampleInputid1"
            aria-describedby="idHelp"
          />
        </div>
        <div className="flex items-center justify-center mb-3">
          <label htmlFor="exampleInputPassword1" style={setLabel(80)}>
            Pass
          </label>
          <input
            type="password"
            className="p-1 text-black rounded-md form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="flex items-center justify-center mb-3">
          <label htmlFor="exampleInputPassword2" style={setLabel(80)}>
            RePass
          </label>
          <input
            type="password"
            className="p-1 text-black rounded-md form-control"
            id="exampleInputPassword2"
          />
        </div>
        <div className="flex items-center justify-center mb-3 ">
          <label htmlFor="exampleInputmobile1" style={setLabel(80)}>
            mobile
          </label>
          <input
            type="email"
            className="p-1 text-black rounded-md form-control"
            id="exampleInputmobile1"
            aria-describedby="mobileHelp"
          />
        </div>
        <div className="flex items-center justify-center mb-3 ">
          <label htmlFor="exampleInputEmail1" style={setLabel(80)}>
            email
          </label>
          <input
            type="email"
            className="p-1 text-black rounded-md form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="flex items-center justify-center mb-3">
          <label htmlFor="exampleInputgender1" style={setLabel(80)}>
            성별
          </label>
          <div style={setLabel(185)}>
            <label htmlFor="genderMale" className="mr-1.5">
              남
            </label>
            <input
              style={setLabel(50)}
              type="radio"
              id="genderMale"
              name="gender"
              value="male"
              className="mr-3"
            />
            <label htmlFor="genderFemale" className="mr-1.5">
              여
            </label>
            <input
              style={setLabel(50)}
              type="radio"
              id="genderFemale"
              name="gender"
              value="female"
              className="mr-3"
            />
          </div>
        </div>

        <div className="flex flex-row items-center justify-center mb-3">
          <button type="button" className="btn btn-warning">
            <span style={setLabel(70)}>가입</span>
          </button>
          <label htmlFor="exampleInputPassword1" style={setLabel(20)}></label>
          <button type="button" className="btn btn-info">
            <span style={setLabel(70)}>취소</span>
          </button>
        </div>
      </form>
    </section>
  )
}
