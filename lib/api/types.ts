export interface ConfigResponse {
    name: string
    about: string
    starting_time: string
    ending_time: string
    prizes: string
    logo_url: string
  }
  
  export interface LoginResponse {
    user: {
      id: string
      username: string
      role: string
    }
    token: string
  }