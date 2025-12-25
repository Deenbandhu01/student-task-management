
import { useEffect, useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:8080/api/tasks'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('low')

  const load = async () => {
    const res = await axios.get(API)
    setTasks(res.data)
  }

  useEffect(() => { load() }, [])

  const addTask = async () => {
    if (!title) return
    await axios.post(API, { title, priority, completed: false })
    setTitle('')
    load()
  }

  const toggle = async (t) => {
    await axios.put(`${API}/${t.id}`, { completed: !t.completed })
    load()
  }

  const remove = async (id) => {
    await axios.delete(`${API}/${id}`)
    load()
  }

  return (
    <div className="container">
      <h1>Student Task Manager</h1>

      <div className="add">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map(t => (
          <li key={t.id} className={t.completed ? 'done' : ''}>
            <span onClick={() => toggle(t)}>
              {t.title} ({t.priority})
            </span>
            <button onClick={() => remove(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
