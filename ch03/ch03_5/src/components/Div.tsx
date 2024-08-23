import type {FC, DetailedHTMLProps, HTMLAttributes, PropsWithChildren} from 'react'
import type {WidthHeight} from './WidthHeight'
import type {LeftRightTopBottom} from './LeftRightTopBottom'
import type {MinMaxWidthHeight} from './MinMaxWidthHeight'

// prettier-ignore
export type ReactDivProps = 
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement>

// prettier-ignore
export type DivProps = 
  ReactDivProps & PropsWithChildren<WidthHeight> & LeftRightTopBottom 
  & MinMaxWidthHeight & {src?: string}

// prettier-ignore
export const Div: FC<DivProps> = ({
  width,height,style: _style,src,className: _className,left,right,
  top,bottom,minWidth,maxWidth,minHeight,maxHeight, ...props
}) => {
  const style = {
    ..._style,width,height,backgroundImage: src && `url(${src})`,
    left,right,top,bottom,minWidth,maxWidth,minHeight,maxHeight,
  }
  // box-sizing :  컨테이너 크기를 결정(content-box, border-box, padding-box, inherit)
  // tailwindcss에는                  box-content, box-border 2가지가 존재
  const className = ['box-sizing', src && 'bg-gray-300', _className].join(' ')
  return <div {...props} className={className} style={style} />
}
