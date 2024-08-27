import {useRef, useEffect, useState} from 'react'
import Clock from './pages/Clock'
import {useClock} from './hooks'

function App() {
  const [count, setCount] = useState(0)

  //1) setInterval 함수는 페이지가 호출될 때 한번만 호출되어야 한다.
  // let today = new Date()
  // const id = setInterval(() => {
  //   today = new Date()
  //   console.log(today)
  //   const clock = document.querySelector('div>Clock')
  //   //시간 업데이트를 위한 구문이 필요
  // }, 1000)

  //2) 1번과 함께 컴포넌트 생성시 한번만 호출되는 생명주기 훅
  // useEffect, useLayoutEffect 사용
  // useEffect(() => {
  //   id
  //   //useEffect 훅만으로는 Clock의 today를 갱신할 방법이 없다
  //   return function () {
  //     clearInterval(id)
  //   }
  // }, []) //[]는 의존성목록이고 목록이 비었으므로 컴포넌트생성시에만 호출
  // return (
  //   <div className="w-full h-full">
  //     <Clock today={today}></Clock>
  //   </div>
  // )

  //3) 메서드 호출에 관여하는 useRef 훅 사용
  // let today = useRef(new Date())
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     today.current = new Date()
  //     console.log(today.current.toLocaleTimeString())
  //   }, 1000)
  //   return () => clearInterval(id)
  // }, [])
  // return (
  //   <div className="w-full h-full">
  //     <Clock today={today.current}></Clock>
  //   </div>
  // )

  //4) 데이터 관리(useMemo,useCallback,useStage,useReducer)중
  //   useState 훅 사용
  // const [today, setToday] = useState(new Date())
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setToday(new Date())
  //   }, 1000)
  //   return () => clearInterval(id)
  // }, [])
  // return (
  //   <div className="w-full h-full">
  //     <Clock today={today}></Clock>
  //   </div>
  // )

  // 리액트 함수 실행 불가
  //a) 지역변수 블록 안에서 훅 호출 불가
  /*
  export default function App(){
    { //지역 변수 블록 사용불가
      const[x, setX] = useState<number>(0) 
    }
  }
  */
  //b) if블록 안에서 사용 불가
  /*
  export default function App(){
    if(true) { //지역 변수 블록 사용불가
      const[x, setX] = useState<number>(0) 
    }
  }
  */
  //c) 비동기 콜백 함수를 입력받는 훅은 사용 불가
  /*
  export default function App(){
    useEffect(async () => { //사용불가
      await Promise.resolve(1)
    },[])
  }
  */

  //5) custom hook 함수 사용(재사용을 목적)
  const today = useClock()
  return <Clock today={today} />
}

export default App

/* 일반적인 자바스크립트로 시간 갱신 할 때
<!DOCTYPE html>
<html lang="ko">
<head></head>
<body><h1 id="time">요소의 중앙 배치 flex 이용</h1></body>
<script>
  let today = new Date()
  var time = document.getElementById("time")
  setInterval(function () {
    time.textContent = new Date()
  }, 1000)
</script>
</html>
*/
