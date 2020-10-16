import React, { useEffect, useRef } from 'react'
import './index.css'
import { Message as TypeMessage } from '../../interfaces/message'
import Message from '../Message'

interface IProps {
  messageList: TypeMessage[]
}

export default function ChatWindow(props: IProps) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  })
  return (
    <div className="chat-window">
      {props.messageList.map(message => (
        <Message message={message} key={message.id} />
      ))}
      <div ref={ref}></div>
    </div>
  )
}
