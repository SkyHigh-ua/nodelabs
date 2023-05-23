import { DeepPartial } from 'typeorm'
import { Post } from './posts.interface'

export interface Address {
    city: string
    street: string
}
export interface User {
    id: number
    username: string
    email: string
    age: number
    info?: string
    address: Address
    posts?: Post[]
}

export interface UserWithoutId extends Omit<User, 'id'>{ id?: number; }

export type PartialUser = DeepPartial<User>;