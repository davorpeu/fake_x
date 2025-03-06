import { useState, useEffect, useCallback } from 'react';
import { fetchPosts, fetchUsers } from '../api/posts.Api';
import { Post, User } from '../types/postList.types';

interface PostWithUser extends Post {
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
                post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (filtered.length !== 0 ){
                setPosts(filtered);
            }
            else   setPosts(allPosts);
        } else {
            setPosts(allPosts);
        }
    }, [searchTerm, allPosts]);

    const fetchSuggestions = useCallback((query: string) => {
        if (!query) return [];


        const normalizedQuery = query.toLowerCase().replace(/\s+/g, '');

        const userSuggestions = users
            .filter(user => user.name.toLowerCase().replace(/\s+/g, '').includes(normalizedQuery))
            .map(user => ({
                value: user.name,
                label: `${user.name} (User)`,
                type: 'user'
            }));

        const postSuggestions = allPosts
            .filter(post => {
                const cleanBody = post.body.toLowerCase().replace(/\s+/g, '');
                const cleanTitle = post.title.toLowerCase().replace(/\s+/g, '');

              /*  console.log('Post Body (clean):', cleanBody);
                console.log('Post Title (clean):', cleanTitle);
                console.log('Normalized Query:', normalizedQuery);
                console.log('Body Includes Query:', cleanBody.includes(normalizedQuery));
                console.log('Title Includes Query:', cleanTitle.includes(normalizedQuery));*/

                return cleanBody.includes(normalizedQuery) || cleanTitle.includes(normalizedQuery);
            })
            .slice(0, 5)
            .map(post => ({
                value: post.body,
                label: `${post.body.substring(0, 30)}... (Post)`,
                type: 'post',
                fullTitle: post.body
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