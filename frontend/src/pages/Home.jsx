import { Link } from 'react-router-dom'
import { getToken } from '../services/auth.js'

function Home() {
  const token = getToken()

  return (
    <section className="home">
      <h1>Blog Management</h1>
      <p>Manage blog posts stored in MongoDB.</p>

      <div className="home-actions">
        {token ? (
          <p className="status">You are logged in.</p>
        ) : (
          <>
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline">
              Register
            </Link>
          </>
        )}
      </div>
    </section>
  )
}

export default Home
