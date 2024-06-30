# React-redux

## Protocole de mise en place de react-redux au sein d'un projet react

> si on estime que l'utilisation de Redux est pertinente dans notre projet (grosse arbo, gestion de beaucoup de données, state complexe, mutations du state complexe/fréquentes...)

1. Installer les dépendances nécessaires

```bash
pnpm i @reduxjs/toolkit react-redux
```

2. Création d'un store

```js
// => src/store/store.ts

// 2a - import de configurestore
import { configureStore } from "@reduxjs/toolkit";

// 2b - on déclare nos différents states avec leurs reducers
const store = configureStore({
    reducer : {
        chat : chatReducer
    }
})

export default store;

```

3. On crée un reducer pour chaque state


```js
// => src/store/reducers/chatReducer.ts
import { createReducer, createAction } from "@reduxjs/toolkit";

interface IChatState {
    messages: IMessage[]
}

// 3a - on définit l'initialState + typage
const initialState: IChatState = {
    messages: [ { id: 1, author: "moi", content: "cc sava?"} ]
}

// 3b - on crée le reducer
export const chatReducer = createReducer(initialState, (builder) => {
    // 
})

```

4. Rendre le store accessible

```js
// => src/main.tsx
{...}
import { Provider } from 'react-redux';
// 4a - récupérer le store créé
import store from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // 4b - wrapper notre app dans le Provider en lui fournissant le store
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>,
)
```

5. Préparation des custom hooks (typescript)

```js
// => src/store/store.ts
// 5a - extraction des types de notre store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// => src/hooks/redux.ts
// 5b - on récupère les types de notre store
import { RootState, AppDispatch } from "../store/store";
// 5c - on importe les hooks originaux de react-redux
import { useSelector, useDispatch } from "react-redux";


// 5d - on re exporte ces hooks surchargés avec les types de notre store
// c'est ceux là, nos custom hooks, qu'on utilisera tout au long de l'app
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

```



## Opérations sur le store

### Lecture

On utilise le hook `useAppSelector` qui va remplir 2 rôles :

1. Lire le state et nous retourner la partie du state demandée (dans le callback)
2. Abonner notre composant (écoute des changements) à la partie précise du state retournée

> 🚨 Donc, il faut toujours s'assurer de retourner exactement la/les parties du states strictement nécessaires au composant, pour ne pas occasioner de rerendu inutile ! 

```js
import { useAppSelector } from "../hooks/redux"

function MessageList() {
    // récupérer la partie du state qui nous intéresse
    const messages = useAppSelector(store => store.chat.messages)
    {...}
}

```

#### selectors

On peut préparer des sélectors à fournir au hook `useSelector`

-> une fonction qui prend le store en entrée et qui en retourne une partie (directement ou après avoir exécuté une certaine logique : tri, condition, formattage, etc...)

```js
// => src/store/selectors.chat.ts

// par exemple, ne retourner que les messages dont je suis l'auteur
export const getMyMessages = (store: RootState) => {
    return store.chat.messages.filter((m) => m.author === "moi")
}
```


### Mutation




## Protocole pour créer une nouvelle intention/nouvel ordre au sein du store

> intention/ordre => manière de modifier mon state

-> dans colorReducer.ts

1. créer un ActionCreator avec la méthode `createAction`

2. faire le lien entre cette action et une manipulation de mon state => on rajoute un case dans notre reducer avec `builder.addCase(action)`

3. décrire les manipulations à effectuer sur le state dans notre nouveau case => un callback qui prend en arguments `state` et `action`

-> dans n'importe quel composant

4. on peut exécuter cette nouvelle intention avec un dispatch de l'action creator => dispatch(actionCreator())