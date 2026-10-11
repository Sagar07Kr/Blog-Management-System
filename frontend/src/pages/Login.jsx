import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser, saveToken, saveUser } from '../services/auth.js'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const res = await loginUser({ email, password })
      saveToken(res.data.token)
      if (res.data.user) {
        saveUser(res.data.user)
      }
      window.location.href = '/'
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="form-page">
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        {error && <p className="alert">{error}</p>}

        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <div className="actions">
          <button type="submit" className="btn" disabled={saving}>
            {saving ? 'Logging in…' : 'Login'}
          </button>
          <Link to="/register" className="btn btn-outline">
            Register
          </Link>
        </div>
      </form>
    </section>
  )
}

export default Login
