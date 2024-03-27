export interface IUser {
  username: string
  email: string
  first_name: string
  last_name: string
  id: number
  is_superuser: boolean
}

export interface IUserCreate {
  email: string
  first_name: string
  last_name: string
  password: string
  username: string
}
