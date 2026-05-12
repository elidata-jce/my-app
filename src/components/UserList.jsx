import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const UserList = ({ highlightRole }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'users'))
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setUsers(items)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="h4 mb-0">Users</h2>
          <span className="badge text-bg-secondary">{users.length}</span>
        </div>

        {loading && (
          <div className="d-flex align-items-center gap-2 text-secondary">
            <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
            <span>Loading users...</span>
          </div>
        )}

        {error && <div className="alert alert-danger mb-0">Error: {error}</div>}

        {!loading && !error && users.length === 0 && (
          <div className="alert alert-info mb-0">No users found.</div>
        )}

      {!loading && !error && users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-light">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => {
              const shouldHighlight =
                String(highlightRole ?? '').toLowerCase() === 'admin' &&
                String(user.role ?? '').toLowerCase() === 'admin'

              return (
                <tr
                  key={user.id}
                  style={
                    shouldHighlight
                      ? { backgroundColor: '#ffe69c', fontWeight: 600 }
                      : undefined
                  }
                >
                  <td>{user.firstName ?? '-'}</td>
                  <td>{user.lastName ?? '-'}</td>
                  <td>{user.email ?? '-'}</td>
                  <td>{user.role ?? '-'}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </section>
  )
}

export default UserList
