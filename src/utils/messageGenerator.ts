import { IUser } from '../interfaces/user'
import { IMessage_Image, IMessage_System, IMessage_Text } from '../interfaces/message'
import { MESSAGE_STATUS, MESSAGE_TYPES, MESSAGE_FLOW } from '../enums/message'
import image_0 from '../assets/0.jpg'
import image_1 from '../assets/1.jpg'
import image_2 from '../assets/2.jpg'
import image_3 from '../assets/3.jpg'
import image_4 from '../assets/4.jpg'

const IMAGES = [image_0, image_1, image_2, image_3, image_4]

const USER_NAMES = ['Javascript', 'Typescript', 'React', 'Vue', 'NodeJs']

const USERS: IUser[] = USER_NAMES.map(name => ({
  id: `U_${name}`,
  name,
  avatar: name,
}))

// USERS[0] as the current user's name
function getUserTo() {
  return USERS[0]
}

function getUserFrom(flowType: MESSAGE_FLOW) {
  return {
    [MESSAGE_FLOW.IN]: USERS.slice(1)[Date.now() % USERS.slice(1).length],
    [MESSAGE_FLOW.OUT]: USERS[0],
  }[flowType]
}

function increaser() {
  let id = 0
  return function () {
    return ++id
  }
}

const idGenerator = increaser()

function generateBaseMessage() {
  return {
    id: `M_${idGenerator()}`,
    conversationId: 'C_1',
    to: getUserTo(),
    status: MESSAGE_STATUS.SUCCESS,
    timestamp: Date.now(),
    flow: MESSAGE_FLOW.IN,
  }
}

function generateTextMessage() {
  return {
    ...generateBaseMessage(),
    type: MESSAGE_TYPES.TEXT,
    content: 'text '.repeat((Date.now() % 20) + 1),
  }
}

export function generateTextMessageIn() {
  return {
    ...generateTextMessage(),
    from: getUserFrom(MESSAGE_FLOW.IN),
    flow: MESSAGE_FLOW.IN,
  } as IMessage_Text
}

export function generateTextMessageOut() {
  return {
    ...generateTextMessage(),
    from: getUserFrom(MESSAGE_FLOW.OUT),
    flow: MESSAGE_FLOW.OUT,
  } as IMessage_Text
}

function generateImageMessage() {
  return {
    ...generateBaseMessage(),
    type: MESSAGE_TYPES.IMAGE,
    content: IMAGES[Date.now() % IMAGES.length],
  }
}

export function generateImageMessageIn() {
  return {
    ...generateImageMessage(),
    from: getUserFrom(MESSAGE_FLOW.IN),
    flow: MESSAGE_FLOW.IN,
  } as IMessage_Image
}

export function generateImageMessageOut() {
  return {
    ...generateImageMessage(),
    from: getUserFrom(MESSAGE_FLOW.OUT),
    flow: MESSAGE_FLOW.OUT,
  } as IMessage_Image
}

export function generateSystemMessage() {
  return {
    ...generateBaseMessage(),
    type: MESSAGE_TYPES.SYSTEM,
    content: 'system '.repeat((Date.now() % 10) + 1),
  } as IMessage_System
}
