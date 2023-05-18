export interface Post {
    id: number
    dateCreation: Date
    title: string
    text: string
    userId: number
}

export interface Postwithoutid extends Omit<Post, 'id'> { id?: number; }

export interface PostWithUnderfined{
    dateCreation?: Date
    title?: string
    text?: string
    userId?: number
}