
import './App.css'
import UserList from './components/UserList'
import Menu from './components/Menu'

function App() {
  return (
    <div className="bg-light min-vh-100">
      <Menu />

      <main className="container py-4">
        <UserList highlightRole="admin" />
      </main>
    </div>
  )
}

export default App
