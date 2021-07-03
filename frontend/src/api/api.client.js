import axios from 'axios'
import { API_URL } from '../constants/api'

export const fetchPosts = () => axios.get(API_URL);
export const createPost = (newPost) => axios.post(API_URL, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${API_URL}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${API_URL}/${id}`);
export const likePost = (id) => axios.patch(`${API_URL}/${id}/likePost`);