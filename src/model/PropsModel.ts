import { AuthService } from '../services/AuthService'
import { User } from './StatesModel'

export interface LoginProps {
  show: boolean
  showRegister: () => void
  close: () => void
  authService: AuthService
  setUser: (user: User) => void
}

export interface RegisterProps {
  show: boolean
  close: () => void
  showLogin: () => void
  authService: AuthService
  setUser: (user: User) => void
}
export interface MenuProps {
  login: () => void
  signup: () => void
  user: User | undefined
}

export interface carsProps {
  carMake: string
  description: string
  extras: any
  featured: boolean
  gps: boolean
  id: string
  images: any
  name: string
  price: number
  size: number
  slug: string
  sportPackage: boolean
  type: string
}
