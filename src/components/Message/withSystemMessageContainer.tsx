import React from 'react'
import './withSystemMessageContainer.css'
import { IMessage_System, Message } from '../../interfaces/message'
import { formateTime } from '../../utils/date'

interface IProps {
  message: IMessage_System
}

export default function withSystemMessageContainer(
  WrappedComponent: React.FunctionComponent<Message>
) {
  return function ({ message }: IProps) {
    return (
      <div className="system-message-container">
        <div className="info">{formateTime(message.timestamp)}</div>
        <div className="content">
          <WrappedComponent {...message} />
        </div>
      </div>
    )
  }
}
