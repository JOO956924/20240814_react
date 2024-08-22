//null로 fill한 이유: undefined를 null로 주면 배열의 map적용시 에러 안남.
export const makeArray = (length: number) => new Array(length).fill(null)

export const range = (min: number, max: number): number[] => 
  makeArray(max - min).map((notUsed, index) => index + min);
export const random = (min: number, max: number): number => 
  Math.floor(Math.random() * (max - min)) + min;