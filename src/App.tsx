import { Button, Card, Col, Row } from 'antd'
import React, { useState } from 'react'
import './App.css'
import ChatWindow from './components/ChatWindow'
import { Message } from './interfaces/message'
import {
  generateTextMessageIn,
  generateTextMessageOut,
  generateImageMessageIn,
  generateImageMessageOut,
  generateSystemMessage,
} from './utils/messageGenerator'

const ACTIONS = [
  {
    name: 'Receive a text message',
    generator: generateTextMessageIn,
  },
  {
    name: 'Send a text message',
    generator: generateTextMessageOut,
  },
  {
    name: 'Receive an image message',
    generator: generateImageMessageIn,
  },
  {
    name: 'Send an image message',
    generator: generateImageMessageOut,
  },
  {
    name: 'Receive a system message',
    generator: generateSystemMessage,
  },
]

export default function App() {
  const [messageList, setMessageList] = useState<Message[]>([])
  const appendMessage = (message: Message) => setMessageList([...messageList, message])

  return (
    <Row className="app" gutter={40}>
      <Col span={16} className="col">
        <ChatWindow messageList={messageList} />
      </Col>
      <Col span={8} className="col">
        <div className="actions">
          {ACTIONS.map(action => (
            <div className="item" key={action.name}>
              <Button onClick={() => appendMessage(action.generator())}>{action.name}</Button>
            </div>
          ))}
        </div>
      </Col>
    </Row>
  )
}
