import { Comment } from "./comment.type";

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    comments?: Comment[];
}

export type NewPost = Omit<Post, "id" | "comments">;