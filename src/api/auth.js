import apiClient from './client'

function extractToken(data) {
  return (
    data?.token ??
    data?.accessToken ??
    data?.data?.token ??
    data?.data?.accessToken ??
    data?.jwt ??
    null
  )
}

function extractUser(data) {
  return data?.user ?? data?.data?.user ?? data?.data ?? data
}

export async function registerUser(payload) {
  const { data } = await apiClient.post('/auth/register', payload)
  return {
    token: extractToken(data),
    user: extractUser(data),
    raw: data,
  }
}

export async function loginUser(payload) {
  const { data } = await apiClient.post('/auth/login', payload)
  return {
    token: extractToken(data),
    user: extractUser(data),
    raw: data,
  }
}

export async function getCurrentUser() {
  const { data } = await apiClient.get('/auth/me')
  return extractUser(data)
}

export async function logoutUser() {
  const { data } = await apiClient.post('/auth/logout')
  return data
}

