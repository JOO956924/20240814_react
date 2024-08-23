import type {FC, DetailedHTMLProps, HTMLAttributes} from 'react'
import {makeClassName} from './textUtils'

// prettier-ignore
type TextProps = 
  DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>,HTMLParagraphElement>
// TextProps: p태그가 가지는 모든 속성들을 한꺼번에 할당받은 객체
export type TitleProps = TextProps & {numberOfLines?: number}
export const Title: FC<TitleProps> = ({
  className: _className,
  numberOfLines,
  ...props
}) => {
  const className = makeClassName(
    'font-bold text-5xl text-center whitespace-pre-line',
    _className,
    numberOfLines
  )
  return <p {...props} className={className} />
}

export type SubtitleProps = TitleProps & {}
export const Subtitle: FC<SubtitleProps> = ({
  className: _className,
  numberOfLines,
  ...props
}) => {
  const className = makeClassName(
    'font-semibold text-3xl text-center whitespace-pre-line',
    _className,
    numberOfLines
  )
  return <p {...props} className={className} />
}
export type SummaryProps = SubtitleProps & {}
export const Summary: FC<SummaryProps> = ({
  className: _className,
  numberOfLines,
  ...props
}) => {
  const className = makeClassName(
    'text-sm whitespace-pre-line',
    _className,
    numberOfLines
  )
  return <p {...props} className={className} />
}
export type ParagraphProps = SummaryProps & {}
export const Paragraph: FC<ParagraphProps> = ({
  className: _className,
  numberOfLines,
  ...props
}) => {
  const className = makeClassName(
    'font-normal text-base whitespace-pre-line',
    _className,
    numberOfLines
  )
  return <p {...props} className={className} />
}
