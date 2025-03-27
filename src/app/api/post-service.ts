import axios from "axios";
import { Post } from "../types/post.type";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const postService = {
    getPosts: async (): Promise<Post[]> => {
        const response = await axios.get(`${API_BASE_URL}/posts`);
        return response.data;
    },
};
