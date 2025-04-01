import axios from "axios";
import { Post } from "../types/post.type";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const postService = {
    //Get all posts
    getPosts: async (): Promise<Post[]> => {
        const response = await axios.get(`${API_BASE_URL}/posts`);
        return response.data;
    },

    //Get post by its ID
    getPostById: async (id: number): Promise<Post> => {
        const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
        return response.data;
    },

    //Create new post
    createPost: async (post: Post): Promise<Post> => {
        const response = await axios.post(`${API_BASE_URL}/posts`, post);
        return response.data;
    },

    //Update an existing post
    updatePost: async (id: number, post: Partial<Post>): Promise<Post> => {
        const response = await axios.put(`${API_BASE_URL}/posts/${id}`, post);
        return response.data;
    },

    //Delete an existing post
    deletePost: async (id: number): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/posts/${id}`);
    },
};
