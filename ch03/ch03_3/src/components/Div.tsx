import type {FC, DetailedHTMLProps, HTMLAttributes, PropsWithChildren} from 'react'
import type {WidthHeight} from './WidthHeight'
import type {LeftRightTopBottom} from './LeftRightTopBottom'

// prettier-ignore
export type ReactDivProps = 
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement>

// prettier-ignore
export type DivProps = 
  ReactDivProps & PropsWithChildren<WidthHeight> & LeftRightTopBottom & {src?: string}

// prettier-ignore
export const Div: FC<DivProps> = ({
  width,height,style: _style,src,className: _className,left,right,
  top,bottom,...props
}) => {
  const style = {
    ..._style,width,height,backgroundImage: src && `url(${src})`,
    left,right,top,bottom
  }
  // box-sizing : 컨테이너 크기를 결정(content-box, border-box, padding-box, inherit)
  // tailwindcss에는                  box-content, box-border 2가지가 존재
  const className = ['box-sizing', src && 'bg-gray-300', _className].join(' ')
  return <div {...props} className={className} style={style} />
}
