export interface User {
  userName: string
  email: string
  profilePic?: string
}
export interface AppState {
  showLoginModal: boolean
  showRegisterModal: boolean
  user: User | undefined
}
export interface LoginState {
  userName: string
  password: string
  error: any
}
export interface RegisterState {
  email: string
  userName: string
  password: string
  error: any
}

export interface carsState {
  cars: any
  featuredCars: any
  price: number
  maxPrice: number
  maxSize: number
  type: string
  carMake: string
  minPrice: number
  minSize: number
  gps: boolean
  sportPackage: boolean
}
