const cache: Record<string, any> = {}
// Record는 key와 value를 가지는 객체 타입. key는 number,string 가능
// any는 모든 타입을 허용할 수 있는 타입. 기존 자바스크립트는 분별력이 떨어지는데
// 이러한 코드를 수용할 수 있도록 설계된 타입

export const useOrCreate = function <T>(key: string, callback: () => T): T {
  if (!cache[key]) cache[key] = callback()
  return cache[key] as T
}
