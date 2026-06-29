import { useState, useEffect } from 'react'
import Register from './register'
import Login from './login'

function App() {
  const [page, setPage] = useState('login')
  const [userId, setUserId] = useState(null)
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    if (userId) {
      fetch('http://localhost:5000/notes')
        .then(res => res.json())
        .then(data => setNotes(data))
    }
  }, [userId])
  const saveNote = () => {
    fetch('http://localhost:5000/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body })
    })
      .then(res => res.json())
      .then(() => {
        fetch('http://localhost:5000/notes')
          .then(res => res.json())
          .then(data => setNotes(data))
        setTitle('')
        setBody('')
      })
  }

  if (page === 'register') {
    return <Register onSwitch={ ()=>setPage('login')}/>
  }
  if (!userId) {
    return <Login
      onLogin={(id) => setUserId(id)}
      onSwitch={() => setPage('register')}
    />
  }

   return (
    <div>
      <h1>My Notes</h1>
      <button onClick={() => setUserId(null)}>Logout</button>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Write your note here" value={body} onChange={e => setBody(e.target.value)} />
      <button onClick={saveNote}>Save Note</button>
      <hr />
      {notes.map(note => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.body}</p>
        </div>
      ))}
    </div>
  )
}

export default App