import React from 'react'

interface IProps {
  content: string
}

export default function ContentText({ content }: IProps) {
  return <div>{content}</div>
}
