import { MESSAGE_FLOW, MESSAGE_STATUS, MESSAGE_TYPES } from '../enums/message'
import { IUser } from './user'

export type Message = IMessage_Text | IMessage_Image | IMessage_System

interface IBaseMessage {
  id: string
  type: MESSAGE_TYPES
  timestamp: number
  conversationId: string
  status: MESSAGE_STATUS
  to: IUser
  flow: MESSAGE_FLOW
}

interface IUserMessage extends IBaseMessage {
  from: IUser
}

export interface IMessage_Text extends IUserMessage {
  type: MESSAGE_TYPES.TEXT
  content: string
}

export interface IMessage_Image extends IUserMessage {
  type: MESSAGE_TYPES.IMAGE
  content: string
}

export interface IMessage_System extends IBaseMessage {
  type: MESSAGE_TYPES.SYSTEM
  content: string
  flow: MESSAGE_FLOW.IN
}
