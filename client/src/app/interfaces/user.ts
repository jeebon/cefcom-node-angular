export interface UserRegRequestData {
  name: string,
  email: string,
  phone: string,
  password: string,
  repeatPassword?: string,
}

export interface UserLoginRequestData {
  email: string,
  password: string,
}

export interface UserResponseData {
  id?: string,
  _id: string,
  name: string,
  email: string,
  phone: string,
  token: string,
}
