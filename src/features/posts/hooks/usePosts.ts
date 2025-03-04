import { useState, useEffect, useCallback } from 'react';
import { fetchPosts, fetchUsers } from '../api/posts.Api';
import { Post, User } from '../types/posts.types';

interface PostWithUser extends Post {
    userName: string;
}

export const usePosts = () => {
    const [posts, setPosts] = useState<PostWithUser[]>([]);
    const [allPosts, setAllPosts] = useState<PostWithUser[]>([]);
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

                setAllPosts(postsWithUsers);
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

    useEffect(() => {
        if (searchTerm) {
            const filtered = allPosts.filter(post =>
                post.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.body.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setPosts(filtered);
        } else {
            setPosts(allPosts);
        }
    }, [searchTerm, allPosts]);

    const fetchSuggestions = useCallback((query: string) => {
        // Generate suggestions from all posts and users
        if (!query) return [];

        // User suggestions
        const userSuggestions = users
            .filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
            .map(user => ({
                value: user.name,
                label: `${user.name} (User)`
            }));

        // Post content suggestions
        const postSuggestions = allPosts
            .filter(post => post.body.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5) // Limit to 5 suggestions for performance
            .map(post => ({
                value: post.body.substring(0, 30) + "...",
                label: `${post.body.substring(0, 30)}... (Post)`
            }));

        return [...userSuggestions, ...postSuggestions];
    }, [users, allPosts]);

    return {
        posts,
        loading,
        searchTerm,
        setSearchTerm,
        fetchSuggestions
    };
};