import api from '../config'
import { LoginResponse } from '../types'

export const authService = {
  login: (username: string, password: string) => 
    api.post<LoginResponse>('/auth/login', { username, password }),
  register: (username: string, password: string) =>
    api.post('/auth/register', { username, password }),
  resetPassword: (email: string) =>
    api.post('/auth/reset-password', { email }),
  logout: () => {
    localStorage.removeItem("userInfo");
  }
}