import type {ReactInputProps} from './Input'
import {forwardRef, useImperativeHandle, useMemo, useRef} from 'react'

export type ValidatableInputMethods = {
  validate: () => [boolean, string]
}

// forwardRef는 컴포넌트가 ref를 사용하여 부모 컴포넌트의 DOM 노드를 노출할 수 있다.
export const ValidatableInput = forwardRef<ValidatableInputMethods, ReactInputProps>(
  function ({type, className: _className, ...inputProps}, methodsRef) {
    const className = useMemo(() => ['input', _className].join(' '), [_className])
    const inputRef = useRef<HTMLInputElement>(null)

    // useImperativeHandle을 사용함으로 사용자컴포넌트에 포함되는 함수를 정의할수있다.
    // 그래서 다른 컴포넌트들과 달리 컴포넌트 내부에서만 사용해야 한다.
    // 다시말하자면 ref로 노출되는 핸들을 사용자가 직접 정의할 수 있게 한다.
    useImperativeHandle(
      methodsRef,
      function () {
        return {
          validate: function (): [boolean, string] {
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
        }
      },
      [type]
    )

    return <input {...inputProps} className={className} ref={inputRef} />
  }
)
