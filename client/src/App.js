import { useState, useEffect } from 'react'

function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])

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

  return (
    <div>
      <h1>My Notes</h1>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write your note here"
        value={body}
        onChange={e => setBody(e.target.value)}
      />
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