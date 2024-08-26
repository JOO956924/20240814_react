import type {FC, DetailedHTMLProps, HTMLAttributes} from 'react'

// prettier-ignore
type ReactFormProps = DetailedHTMLProps<HTMLAttributes<HTMLFormElement>,HTMLFormElement>

export type FormProps = ReactFormProps & {action?: string; method?: string}

// prettier-ignore
export const Form: FC<FormProps> = ({
  action, method, style: _style, className: _className, ...props
}) => {
  const style = {..._style }
  const className = ['bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4',_className].join(' ')
  return <form {...props} className={className} action={action} method={method} style={style}>{method}</form>
  
}
