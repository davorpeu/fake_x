import { useState, useEffect } from 'react';
import { fetchPosts, fetchUsers } from '../api/posts.Api';
import { Post, User } from '../types/posts.types';

interface PostWithUser extends Post {
    userName: string;
}

export const usePosts = () => {
    const [posts, setPosts] = useState<PostWithUser[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [postsData, usersData] = await Promise.all([
                    fetchPosts(),
                    fetchUsers()
                ]);

                const postsWithUsers = postsData.map(post => ({
                    ...post,
                    userName: usersData.find(user => user.id === post.userId)?.name || 'Unknown'
                }));

                setPosts(postsWithUsers);
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const filteredPosts = posts.filter(post =>
        post.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return { posts: filteredPosts, loading, searchTerm, setSearchTerm };
};