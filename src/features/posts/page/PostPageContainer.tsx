
import { FC } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from 'lodash';
import {Post, User} from "../types/posts.types";
import { PostsPage } from "./PostsPage";
import {AutoCompleteProps} from "antd";

export const PostsPageContainer: FC = () => {
    const [users, setOptions] = useState<User[]>([]);
    const { posts, loading, searchTerm, setSearchTerm } = usePosts();
    const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchInputFocused, setSearchInputFocused] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const POSTS_PER_PAGE = useRef(5).current;
    const Username = posts.map(({ userName }) => userName);
    const debouncedSetSearchTerm = useCallback(

      debounce((value: string) => {
            setSearchTerm(value);
            setPage(1);
            setVisiblePosts([]);
            setOptions([])
        }, 300),
        [setSearchTerm]
    );
    const onSearch = useCallback((value: string) => {
        if (!value) {
            setOptions([]);
            return;
        }

        const filteredUsers = posts
            .filter(post => post.userName.toLowerCase().includes(value.toLowerCase()))
            .map(post => ({ value: post.userName, label: post.userName  }));

        const filteredText = posts
            .filter(post => post.body.toLowerCase().includes(value.toLowerCase()))
            .map(post => ({ value: post.body, label: post.body + " message"  }));
        const uniqueMap = new Map();
        filteredUsers.forEach(user => {
            if (!uniqueMap.has(user.value)) {
                uniqueMap.set(user.value, user);
            }
        });

        setOptions(Array.from(uniqueMap.values()));
    }, [posts]);
    const handleSearchChange = (value: string) => {
        debouncedSetSearchTerm(value);
    };

    useEffect(() => {
        if (!loading) {
            const newVisiblePosts = posts.slice(0, page * POSTS_PER_PAGE);
            const newHasMore = page * POSTS_PER_PAGE < posts.length;

            if (JSON.stringify(newVisiblePosts) !== JSON.stringify(visiblePosts)) {
                setVisiblePosts(newVisiblePosts);
                setHasMore(newHasMore);
            }
        }
    }, [posts, loading, page, POSTS_PER_PAGE, visiblePosts]);

    const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0]?.isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        }, { threshold: 0.8 });

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return (
        <PostsPage
            visiblePosts={visiblePosts}
            loading={loading}
            hasMore={hasMore}
            searchTerm={searchTerm}
            searchInputFocused={searchInputFocused}
            setSearchInputFocused={setSearchInputFocused}
            handleSearchChange={handleSearchChange}
            lastPostElementRef={lastPostElementRef}
            users={users}
            onSearch={onSearch}
        />
    );
};