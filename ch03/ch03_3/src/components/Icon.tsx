import type {FC, DetailedHTMLProps, HTMLAttributes} from 'react'

type ReactSpanProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

export type IconProps = ReactSpanProps & {
  name: string
}

// prettier-ignore
export const Icon: FC<IconProps> = ({name, className: _className, ...props}) => {
  const className = ['material-symbols-outlined', _className].join(' ')
  return <span {...props} className={className}>{name}</span>
}
