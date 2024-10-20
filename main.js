// Hola a todos, aqui es donde tienen que trabajar
// Buena suerte 🫡
const endpoint = `https://wd1-todos-api.diurivj.workers.dev/api/diego/todos`
const headers = {
  'Content-Type': 'application/json',
}

const container = document.getElementById('container')

async function loadTodos() {
  const url = new URL(document.URL)
  const filter = url.searchParams.get('filter')

  let filterString = ''
  if (filter === 'active') {
    filterString = '?filter=active'
  }

  if (filter === 'completed') {
    filterString = '?filter=completed'
  }

  const response = await fetch(`${endpoint}${filterString ?? ''}`, {
    headers,
    method: 'GET',
  })
  const data = await response.json()
  return data.todos
}

async function createTodo(todo) {
  const response = await fetch(endpoint, {
    headers,
    method: 'POST',
    body: JSON.stringify({ todo }),
  })
  const data = await response.json()
  return data.todo
}

async function updateTodo(todo, completed) {
  const response = await fetch(endpoint, {
    headers,
    method: 'PATCH',
    body: JSON.stringify({ id: todo.id, completed }),
  })
  const data = await response.json()
  replaceTodo(data.todo)
}

function generateTodo(todo) {
  const li = document.createElement('li')
  li.setAttribute('id', todo.id)
  li.className = 'flex p-4 items-center gap-x-4'

  const input = document.createElement('input')
  input.setAttribute('id', `${todo.id}-${todo.todo}`)
  input.setAttribute('type', 'checkbox')
  input.className = 'w-5 h-5 cursor-pointer'

  if (todo.completed) {
    li.classList.add('line-through')
    input.checked = true
  }

  input.onchange = e => {
    updateTodo(todo, e.target.checked)
  }

  const label = document.createElement('label')
  label.className = 'cursor-pointer w-full'
  label.htmlFor = `${todo.id}-${todo.todo}`
  label.innerText = todo.todo

  li.appendChild(input)
  li.appendChild(label)
  return li
}

function appendTodo(todo) {
  const li = generateTodo(todo)
  container.appendChild(li)
}

async function renderTodos() {
  const todos = await loadTodos()
  todos.forEach(todo => appendTodo(todo))
  //todos.forEach(appendTodo);
}

function replaceTodo(todo) {
  const node = document.getElementById(todo.id)
  const newNode = generateTodo(todo)
  node.replaceWith(newNode)
}

function styleFilters() {
  const url = new URL(document.URL)
  const filter = url.searchParams.get('filter')

  const allLink = document.querySelector('a[href="/"]')
  const activeLink = document.querySelector('a[href="/?filter=active"]')
  const completedLink = document.querySelector('a[href="/?filter=completed"]')

  const activeClassNames = ['border-black', 'border', 'shadow-md']

  if (filter === 'active') {
    activeLink.classList.add(...activeClassNames)
    allLink.classList.remove(...activeClassNames)
    completedLink.classList.remove(...activeClassNames)
    return
  }

  if (filter === 'completed') {
    activeLink.classList.remove(...activeClassNames)
    allLink.classList.remove(...activeClassNames)
    completedLink.classList.add(...activeClassNames)
    return
  }

  activeLink.classList.remove(...activeClassNames)
  allLink.classList.add(...activeClassNames)
  completedLink.classList.remove(...activeClassNames)
}

renderTodos()
styleFilters()

const createTodoInput = document.querySelector('input')
createTodoInput.addEventListener('keydown', async e => {
  if (e.key === 'Enter') {
    const todo = await createTodo(e.target.value)
    appendTodo(todo)
    e.target.value = ''
  }
})
