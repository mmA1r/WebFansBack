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
            data: { token: string, user: obj }
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

