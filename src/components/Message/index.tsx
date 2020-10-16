import React from 'react'
import { MESSAGE_TYPES } from '../../enums/message'
import { Message } from '../../interfaces/message'
import ContentText from './ContentText'
import ContentImage from './ContentImage'
import ContentSystem from './ContentSystem'
import withUserMessageContainer from './withUserMessageContainer'
import withSystemMessageContainer from './withSystemMessageContainer'

/**
 * you could build a hoc pipeline to wrap the message content component here
 * such as:
 *    pipe(withMessageContainer, withActionMenu)(ContentComponent)
 */
function getMessageComponent(message: Message) {
  if (message.type === MESSAGE_TYPES.SYSTEM) {
    return withSystemMessageContainer(ContentSystem)
  }
  if (message.type === MESSAGE_TYPES.TEXT) {
    return withUserMessageContainer(ContentText)
  }
  if (message.type === MESSAGE_TYPES.IMAGE) {
    return withUserMessageContainer(ContentImage)
  }
  return (() => 'Invalid Message') as any
}

interface IProps {
  message: Message
}

export default function Message({ message }: IProps) {
  const Component = getMessageComponent(message)
  return <Component message={message} />
}
