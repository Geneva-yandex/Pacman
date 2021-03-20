export interface CommentCreateDto {
    title: string;
    description: string;
    user_id: number,
    last_message_txt?: string
}

export interface ForumMessageCreateDto {
    title: string,
    description: string,
    user_id: number,
    message_id: number,
    topic_id: number,
}
