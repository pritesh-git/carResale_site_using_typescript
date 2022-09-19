import { User } from '../model/StatesModel'

export class AuthService {
  public async login(
    userName: string,
    password: string,
  ): Promise<User | undefined> {
    if (userName === 'tester' && password === 'AaBbCcDd') {
      return {
        userName: userName,
        email: 'abc@email.com',
        profilePic: undefined,
      }
    } else {
      return undefined
    }
  }

  public async register(
    userName: string,
    password: string,
    email: string,
  ): Promise<User | undefined> {
    if (userName && password && email) {
      return {
        userName: userName,
        email: email,
        profilePic: undefined,
      }
    } else {
      return undefined
    }
  }
}
