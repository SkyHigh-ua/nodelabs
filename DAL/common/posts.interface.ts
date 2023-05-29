import { User } from "./users.interface"

export interface Post {
    id: number
    dateCreation: Date
    title: string
    text: string
    userId: number
    user?: User
}

export interface PostWithoutId extends Omit<Post, 'id'> { id?: number; }

export type PartialPost = Partial<Post>;