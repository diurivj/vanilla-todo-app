# Vanilla todo app
Este proyecto esta diseñado para poner en práctica nuestros conocimientos de HTML, CSS y Javascript.
En este proyecto, se trabajará la mayor parte en javascript, haciendo uso de las APIs del DOM, fetch, etc.

## Requerimientos
- Toda la data debe interactuar con la API y persistir la data en la DB.
- Poder agregar un _todo_ a través de la web app.
- Poder marcar un _todo_ como completado o no completado.
- Poder filtrar los _todos_ por **All**, **Active**, **Completed**.

## Recursos
- [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [HTML listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

## API
Este proyecto proporciona una API para practicar el manejo de APIs a través del DOM.

### Base URL
El base URL es dinámico, es decir deben de proporcionar su usuario, para uso personal.

```js
// Base URL
const baseURL = `https://wd1-todos-api.diurivj.workers.dev/api/${user}/todos`

// Ejemplo
const baseURL = `https://wd1-todos-api.diurivj.workers.dev/api/diego/todos`
```

### `GET /todos`
Este endpoint nos permitira obtener todos los _todos_ de la API.

#### Endpoint
```
https://wd1-todos-api.diurivj.workers.dev/api/user/todos
```

#### Payload
```
headers: {
    Content-Type: 'application/json'
}

[optional]
query_params: ?filter=completed, ?filter=active
```

#### Response
```
{
    "todos": [
        {
            "id": 1,
            "todo": "Comprar tortillas",
            "completed": false
        }
    ] 
}
```

### `POST /todos`
Este endpoint nos permitirá crear un _todo_ en la API.

#### Endpoint
```
https://wd1-todos-api.diurivj.workers.dev/api/diego/todos
```

#### Payload
```
headers: {
    Content-Type: 'application/json'
}

body: {
    todo: todo
}
```

#### Response
```
{
    "todo": {
        "id": 2,
        "todo": "Otro todo",
        "completed": false
    }
}
```

### `PATCH /todos`
Este endpoint nos permitirá modificar el estatus de un _todo_ de la API.

#### Endpoint
```
https://wd1-todos-api.diurivj.workers.dev/api/diego/todos
```

#### Payload
```
headers = {
    Content-Type: 'application/json'
}

body = {
    id: number,
    completed: boolean
}
```

#### Response
```
{
    "todo": {
        "id": 2,
        "todo": "Otro todo",
        "completed": true
    }
}
```

## Funciones

#### `async loadTodos`
Esta función lo único que debe de hacer es lo siguiente:

- Realizar una petición GET con la función `fetch`
- Regresar los _todos_
- Debe de ser lo suficientemente inteligente, para mandar los filtros aplicados*

#### `async createTodo(todo)`
Esta función lo único que debe de hacer es lo siguiente:

- Realizar una petición POST con la función `fetch`
- Regresar el _todo_ creado.

#### `async updateTodo(todo, completed)`
Esta función lo único que debe de hacer es lo siguiente:

- Realizar una petición PATCH con la función `fetch`
- Ejecutar la función `replaceTodo`

#### `generateTodo(todo)`
Esta función lo único que debe de hacer es lo siguiente:

- Crear un elemento `li`
    - Agregar el atributo `id`, con valor del `todo.id`
    - Agregar la siguiente clase, `flex p-4 items-center gap-x-4`
    - Si el _todo_ está completado, agregar la clase `line-through`

- Crear un elemento `input`
    - Agregar el atributo `id`, con el valor de `${todo.id}-${todo.todo}`
    - Agregar la clase, `w-5 h-5 cursor-pointer`
    - Agregar el atributo `type`, con el valor de `checkbox`
    - Si el _todo_ está completado, agregar `input.checked = true`
    - Agregar la función `updateTodo` cuando el botón sea clickeado
    ```js
        input.onchange = e => updateTodo(todo, e.target.checked) 
    ```

- Crear un elemento `label`
    - Agregar la clase, `cursor-pointer w-full`
    - Agregar el atributo `htmlFor`, con valor de `${todo.id}-${todo.todo}`
    - Agregar el `innerText`, con valor de `todo.todo`

- Apendear el input al li
- Apendear el label al li
- Regresar el li creado

#### `appendTodo(todo)`
Esta función lo único que debe de hacer es lo siguiente:

- Ejecutar la función `generateTodo(todo)`
- Apendear al contenedor de los _todos_ el _todo_ generado

```js
const li = generateTodo(todo)
todosContainer.appendChild(li)
```

#### `renderTodos`
Esta función lo único que debe de hacer es lo siguiente:

- Ejecutar la función `loadTodos`
- Recorrer el array de _todos_ que regresa la función `loadTodos`
- Por cada elemento dentro del array ejecutar la función `appendTodo(todo)`

#### `replaceTodo(todo)`
Esta función lo único que debe de hacer es lo siguiente:

- Obtener el _todo_ que queremos reemplazar, es decir, el _todo_ que fue clickeado
- Ejecutar la función `generateTodo(todo)`
- Reemplazar el _todo_ antiguo con el nuevo

```js
const node = document.getElementById(todo.id)
const newNode = generateTodo(todo)
node.replaceWith(newNode)
```

#### `styleFilters`
Esta función lo único que debe de hacer es lo siguiente:

- Obtener los `searchParams` del URL
- Dependiendo del valor del filtro, estilizar de la siguiente manera el elemento correspondiente:
    - Si el filtro es `active`, agregar la clases: `border-black border shadow-md`
    - Si el fitro es `completed`, agregar la clases: `border-black border shadow-md`
    - Si el fitro es cualquier otro, agregar las clases: `border-black border shadow-md`

- Nota: No olvides, quitar las clases cuando ya no esta activo

Las funciones `renderTodos` y `styleFilters`, son las únicas funciones que se deben ejecutar de manera inicial

```js
renderTodos()
styleFilters()
```

El listener del input debe de verse así:
```js
createTodoInput.addEventListener('keydown', async e => {
  if (e.key === 'Enter') {
    const todo = await createTodo(e.target.value)
    appendTodo(todo)
    e.target.value = ''
  }
})
```

## Ejemplos de fetch

### GET
```js
fetch(endpoint, {
    method: 'GET', // optional
    headers: {
        'Content-Type': 'application/json'
    }
})
```

### POST
```js
const body = {
    todo: 'Comprar tortillas'
}

fetch(endpoint, {
    method: 'POST', // required, just send one
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
})
```

### PATCH
```js
const body = {
    id: 2,
    completed: true
}

fetch(endpoint, {
    method: 'PATCH', // required, just send one
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
})
```

