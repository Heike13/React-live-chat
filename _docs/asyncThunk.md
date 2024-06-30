# Redux Asynchrone

De base on ne peut pas écrire de code asynchrone dans un reducer.

Embêtant pour nous développeurs.

Plusieurs solutions existent, dont la méthode `createAsyncThunk` de Toolkit.


# createAsyncThunk

- s'utilise comme `createAction`
- nous retourne un `actionCreator` qu'on peut dispatch dans nos composants
- peut contenir un payload ou pas


## Particularités

- génère 3 sous actions qui vont devoir correspondre à 3 cases dans le reducer

- prend 1 fonction asynchrone en 2nd argument => cette fonction contient tout le code asynchrone correspondant à l'action

- retourne de la donnée qui sera fournie au reducer

## Utilisation

```js
export const login = createAppAsyncThunk('SETTING/LOGIN_ASYNC', async (_, thunkAPI) => {...})

```

1. On dispatch l'`actionCreator` `login` (retourné par `createAsyncThunk`) dans un composant

2. La fonction asynchrone (= asyncThunk) est appelée avec 2 arguments :
    - `action` => l'action dispatchée dans le composant (on peut y trouver un payload)
    - `thunkAPI` => permet de se brancher sur le store, et notamment d'utiliser la méthode `thunkAPI.getState()` pour lire le store

3. La fonction commence l'éxécution du code asynchrone

4. l'action ``login.pending`` est dispatchée sans payload

5a. Si aucune erreur => l'action `login.fulfilled` est dispatchée avec comme payload ce qui retournée par l'asyncThunk 

5b. Si erreur => l'action `login.rejected` est dispatchée avec comme payload l'erreur qui a été levée