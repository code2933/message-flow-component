# message-flow-component

A test for interview.

## Preview

### Environment

```plain
chrome ≥ 61
```

The project tries vite as a fresh dev tool which requires the Native-ESM support. (You may see some module errors in the chrome dev tool, because of the lack of ESM support in some Antd module. Luckly, these errors won't make effect. Due to time constraints，I only committed an issue.)

### Install

```shell
yarn
```

### Getting Started

```shell
yarn dev
```

The demo will run on [http://127.0.0.1:3000](http://127.0.0.1:3000)

You could click each action button to receive a message or send a message.

## Design Thinking

The main part of the component is the `Message` component.

From the perspective of content, a message can be classified as

- User message
  - Text message
  - Image message
- System message

As a type of user message, text message and image message should have plenty of commonalities, such as a user avatar and the same ui wrapper of content. It seems hoc wrappers like `withUserMessageContainer` and `withSystemMessageContainer` could be a good choice.

From the perspective of flow direction, a message can be classified as

- flow in
- flow out

A user message can be flow in or flow out. The difference of flow type can be simply handled in hoc `withUserMessageContainer` by css property `flex-direction` , unnecessarily to be treated as two different components since the demand we know yet is lacking.

A system message can be flow in only.

## About Expansibility

### How to add a new message type?

If you want to add a new message type, such as an audio message, you could simply do as follow.

First, you should define an `IMessage_Audio` interface which extends from `IUserMessage` as `IMessage_Text` or `IMessage_Image` does.

```typescript
export interface IMessage_Audio extends IUserMessage {
  type: MESSAGE_TYPES.AUDIO
  content: string
}
```

Second, you should define a `ContentAudio` component to describe how to render an audio content.

```typescript
export default function ContentAudio({ content }: IProps) {
  return (
    <audio>
      <source src={content}></source>
    </audio>
  )
}
```

At last, you should tell `getMessageComponent` how to dispatch an audio message to a certain component, which can be build by a hoc pipeline.

```typescript
function getMessageComponent(message: Message) {
  // ...
  if (message.type === MESSAGE_TYPES.AUDIO) {
    return withUserMessageContainer(ContentAudio)
  }
  // ...
}
```

### How to add a new message feature?

If you want to add a new message feature, such as a context menu, you could simply do as follow.

First, define a hoc `withContextMenu`

```typescript
export default function withContextMenu(WrappedComponent) {
  return function ({ onContextMenu }: IProps) {
    return (
      <div onContextMenu={onContextMenu}>
        <WrappedComponent {...props} />
      </div>
    )
  }
}
```

Second, you should build a hoc pipeline in `getMessageComponent`

```typescript
function getMessageComponent(message: Message) {
  // ...
  if (message.type === MESSAGE_TYPES.TEXT) {
    return pipe(withContextMenu, withUserMessageContainer)(ContentText)
  }
  // ...
}
```

That's all.
