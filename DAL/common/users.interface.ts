import { Post } from './posts.interface'

export interface User {
    id: number
    username: string, 
    email: string
    age: number
    info?: string
    address: {
        city: string
        street: string
    }
    posts?: Post[];
}

export interface Userwithoutid extends Omit<User, 'id'>{ id?: number; }

export interface UserWithUnderfined{
    username?: string, 
    email?: string
    age?: number
    info?: string
    address?: {
        city?: string
        street?: string
    }
}