// 가져올 데이터 타입 선언
export type IRandomUser = {
  email: string
  name: {title: string; first: string; last: string}
  picture: {large: string}
}

// email, name, picture만 담기 위한 객체선언
const convertRandomUser = (result: unknown) => {
  const {email, name, picture} = result as IRandomUser
  return {email, name, picture}
}

//무작위로 사용자 정보 가져오기.
export const fetchRandomUser = (): Promise<IRandomUser> =>
  new Promise((resolve, reject) => {
    fetch('https://randomUser.me/api')
      .then(res => res.json())
      .then((data: unknown) => {
        console.log(data)
        const {results} = data as {results: IRandomUser[]}
        resolve(convertRandomUser(results[0]))
      })
      .catch(reject)
  })
