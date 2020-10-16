import React from 'react'

interface IProps {
  content: string
}

export default function ContentSystem({ content }: IProps) {
  return <div>{content}</div>
}
