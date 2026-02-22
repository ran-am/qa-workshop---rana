import { useEffect, useState } from 'react'
import './App.css'

type Todo = {
  id: number
  title: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((res) => res.json())
      .then((data: Todo[]) => {
        setTodos(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="app" data-testid="app-loading">
        <h1 data-testid="app-heading">QA Workshop</h1>
        <p data-testid="loading-message">Loading...</p>
      </div>
    )
  }

  return (
    <div className="app">
      <h1 data-testid="app-heading">QA Workshop</h1>
      <ul className="todo-list" data-testid="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} data-testid={`todo-item-${todo.id}`}>
            <label data-testid={`todo-label-${todo.id}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                data-testid={`todo-checkbox-${todo.id}`}
              />
              <span data-testid={`todo-title-${todo.id}`}>{todo.title}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
