# Server Chatroom

- install `yarn`
- start `yarn start` : http://localhost:3001

Routes :
- `POST http://localhost:3001/login`

    => give an object with email and password like that
    ```
    {
        email: 'bouclierman@herocorp.io',
        password: 'jennifer'
    }
    ```

  Valid credentials :
   - bouclierman@herocorp.io/jennifer
   - acidman@herocorp.io/fructis
   - captain.sportsextremes@herocorp.io/pingpong



- `POST http://localhost:3001/forgot`
- `GET http://localhost:3001/theme/{email}`
