import React from 'react'
import './withUserMessageContainer.css'
import { Avatar } from 'antd'
import { IMessage_Image, IMessage_Text, Message } from '../../interfaces/message'
import { MESSAGE_FLOW } from '../../enums/message'
import { formateTime } from '../../utils/date'

interface IProps {
  message: IMessage_Image | IMessage_Text
}

export default function withUserMessageContainer(
  WrappedComponent: React.FunctionComponent<Message>
) {
  return function ({ message }: IProps) {
    const flow = message.flow === MESSAGE_FLOW.OUT ? 'right' : 'left'
    return (
      <div className={`user-message-container ${flow}`}>
        <div className="container-wrapper">
          <div className="container">
            <div className="avatar-container">
              <Avatar size={40}>{message.from.name}</Avatar>
            </div>
            <div className="content-container">
              <div className="info">
                {message.from.name} ({formateTime(message.timestamp)})
              </div>
              <div className="content">
                <WrappedComponent {...message} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
