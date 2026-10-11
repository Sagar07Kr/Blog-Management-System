import { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../services/auth.js'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      await registerUser({ name, email, password })
      setSuccess('Registration successful! Redirecting to login…')
      window.location.href = '/login'
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="form-page">
      <h1>Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        {error && <p className="alert">{error}</p>}
        {success && <p className="status">{success}</p>}

        <label>
          Name
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

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
            {saving ? 'Registering…' : 'Register'}
          </button>
          <Link to="/login" className="btn btn-outline">
            Login
          </Link>
        </div>
      </form>
    </section>
  )
}

export default Register
