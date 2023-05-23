export interface Post {
    id: number
    dateCreation: Date
    title: string
    text: string
    userId: number
}

export interface PostWithoutId extends Omit<Post, 'id'> { id?: number; }

export type PartialPost = Partial<Post>;