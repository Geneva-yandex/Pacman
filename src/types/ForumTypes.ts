export interface IComment {
    id: number,
    userId: number,
    content: string,
    avatar: string | null,
    firstName: string,
    secondName: string
}

export interface ITopic {
    id: number,
    userId: number,
    title: string,
    description: string,
    avatar: string | null,
    firstName: string,
    secondName: string,
    comments: IComment[]
}

export type ForumTypes = ITopic[];
