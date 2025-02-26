import axios from 'axios';
import { Post, Comment, User } from '../types/posts.types';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async (): Promise<Post[]> => {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
};

export const fetchPost = async (id: string): Promise<Post> => {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
};

export const fetchComments = async (postId: string): Promise<Comment[]> => {
    const response = await axios.get(`${API_URL}/posts/${postId}/comments`);
    return response.data;
};

export const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
};