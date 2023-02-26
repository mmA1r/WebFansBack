# WebFans Backend methods

### UserMethods
```typescript
useLoginHandler  {
    (
        method: string = 'login',
        login: string,
        password: string,
    ) => {
        response: {result: string, data: { token: string }} = {
            result: 'ok',
            data: { data: obj }
        }
    }
}
```
____

```typescript
useLogoutHandler {
    (
        method: string = 'logout',
        token: string,
    ) => {
        response: {result: string, data: boolean} = {
            result: 'ok',
            data: boolean
        }
    }
}
```
____

```typescript
useRegistrationHandler {
    (
        method: string = 'registration',
        name: 'string',
        login: 'string',
        password: 'string'
    ) => {
        response: {result: string, data: boolean} = {
            result: 'ok',
            data: boolean
        }
    }
}
```

____

```typescript
getUserHandler {
    (
        method: string = 'getUser',
        token: string
    ) => {
        response: {result: string, data: boolean} = {
            result: 'ok',
            data: User
        }
    }
}
```

### ChatMethods

```typescript
getMessagesHandler  {
    (
        method: string = 'getMessages',
        chatHas: string
    ) => {
        response: {result: string, data: { token: string }} = {
            result: 'ok',
            data: { data: { messges: any[], hash: string } }
        }
    }
}
```
____

```typescript
sendGeneralMessageHandler {
    (
        method: string = 'sendGeneralMessage',
        message: string,
        senderId: string
    ) => {
        response: {result: string, data: boolean} = {
            result: 'ok',
            data: { chatHash: string }
        }
    }
}
```
____

```typescript
sendPrivateMessageHandler {
    (
        method: string = 'sendGeneralMessage',
        message: string,
        senderId: string,
        messageTraget: string
    ) => {
        response: {result: string, data: boolean} = {
            result: 'ok',
            data: { chatHash: string }
        }
    }
}

