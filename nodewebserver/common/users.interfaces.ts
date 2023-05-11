export interface User {
    username: string, 
    name?: string
}

export interface Userwithid extends User {
    id: number
}

export interface Userwithoutusername extends Omit<User, 'username'> {
    username?: string
}