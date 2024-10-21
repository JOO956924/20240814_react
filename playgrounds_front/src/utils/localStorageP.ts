export const readItemFromStorageP = (key: string) =>
  new Promise<string | null>(async (resolve, reject) => {
    try {
      // localStorage는 웹브라우저에 데이터를 저장할 수 있는 객체
      const value = localStorage.getItem(key)
      resolve(value)
    } catch (e) {
      reject(e)
    }
  })

export const writeItemToStorageP = (key: string, value: string) =>
  new Promise<string>(async (resolve, reject) => {
    try {
      // localStorage는 웹브라우저에 데이터를 저장할 수 있는 객체
      localStorage.setItem(key, value)
      resolve(value)
    } catch (e) {
      reject(e)
    }
  })

export const readStringP = readItemFromStorageP
export const writeStringP = writeItemToStorageP
