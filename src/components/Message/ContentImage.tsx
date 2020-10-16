import React from 'react'
import './ContentImage.css'
import { Image } from 'antd'

interface IProps {
  content: string
}

export default function ContentImage({ content }: IProps) {
  return (
    <div className="content-image">
      <Image src={content} alt={content} width={200} preview={false} />
    </div>
  )
}
