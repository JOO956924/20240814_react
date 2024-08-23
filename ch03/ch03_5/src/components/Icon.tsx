import type {FC, DetailedHTMLProps, HTMLAttributes} from 'react'

type ReactSpanProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

export type IconProps = ReactSpanProps & {name: string}
export const Icon: FC<IconProps> = function (iconProps: IconProps) {
  const {name, className: _className, ...props} = iconProps
  const className = 'material-symbols-outlined'
  return (
    <span className={className} {...props}>
      {name}
    </span>
  )
}
