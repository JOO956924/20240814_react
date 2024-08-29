export const imageFileReaderP = function (file: Blob) {
  // Promise<string> : Promise의 결과 타입은 string
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader()

    // fileReader.readAsDataURL: 컨텐츠를 특정 Blob 이나 File에서 읽어 오는 역할
    fileReader.readAsDataURL(file)

    // fileReader.onload: 읽기 동작이 성공적으로 완료 되었을 때
    fileReader.onload = function (e: ProgressEvent<FileReader>) {
      const result = e.target?.result
      console.log('result:' + result)
      // if문은 두개의 조건이 true일 때 resolve 실행하여 result를 반환
      if (result && typeof result === 'string') resolve(result)
      else reject(new Error(`imageFileReaderP: can't read image file`))
    }
  })
}
