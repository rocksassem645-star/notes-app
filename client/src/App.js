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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-600">My Notes</h1>
          <button
            onClick={() => setUserId(null)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:border-blue-500"
          />
          <textarea
            placeholder="Write your note here"
            value={body}
            onChange={e => setBody(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:border-blue-500 h-32"
          />
          <button
            onClick={saveNote}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Save Note
          </button>
        </div>
        <div className="space-y-4">
          {notes.map(note => (
            <div key={note.id} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{note.title}</h3>
              <p className="text-gray-600">{note.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App