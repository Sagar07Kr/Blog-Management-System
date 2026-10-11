import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function registerUser(data) {
  return await axios.post(`${API_URL}/auth/register`, data)
}

export async function loginUser(data) {
  return await axios.post(`${API_URL}/auth/login`, data)
}

export function saveToken(token) {
  localStorage.setItem('token', token)
}

export function getToken() {
  return localStorage.getItem('token')
}

export function removeToken() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export function saveUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function getUser() {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}
