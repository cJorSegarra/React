export interface Comment {
    id: number;
    body: string;
    userId: number;
    postId: number;
}

export type NewComment = Omit<Comment, "id">;
