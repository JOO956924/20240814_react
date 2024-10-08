import type {ReactInputProps} from './Input'
import {forwardRef, useImperativeHandle, useMemo, useRef} from 'react'

export type ValidatableInputMethods = {
  validate: () => [boolean, string]
}

export const ValidatableInput = forwardRef<ValidatableInputMethods, ReactInputProps>(
  ({type, className: _className, ...inputProps}, methodsRef) => {
    const className = useMemo(() => ['input', _className].join(' '), [_className])
    const inputRef = useRef<HTMLInputElement>(null)

    // useImperativeHandle은 다른 컴포넌트들과 달리 컴포넌트 내부에서만 사용해야 한다.
    // useImperativeHandle은 사용함으로 사용자컴포넌트에 포함되는 함수를 정의할 수 있다
    // useImperativeHandle은 ref로 노출되는 핸들을 사용자가 직접 정의할 수 있게 한다.
    useImperativeHandle(
      methodsRef,
      () => ({
        validate: (): [boolean, string] => {
          const value = inputRef.current?.value
          if (!value || !value.length) return [false, '사용자가 입력한 내용이 없습니다']

          switch (type) {
            case 'email': {
              const regEx =
                /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
              const valid = regEx.test(value)
              return valid ? [true, value] : [false, '틀린 이메일 주소입니다']
            }
          }
          return [true, value]
        }
      }),
      [type]
    )

    return <input {...inputProps} className={className} ref={inputRef} />
  }
)
