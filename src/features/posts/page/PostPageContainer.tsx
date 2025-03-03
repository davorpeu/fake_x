// features/posts/page/PostsPageContainer.tsx
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
    const POSTS_PER_PAGE = 5;
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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSetSearchTerm(e.target.value);
    };

    useEffect(() => {
        if (!loading) {
            if (posts.length > 0) {
                setVisiblePosts(posts.slice(0, page * POSTS_PER_PAGE));
                setHasMore(page * POSTS_PER_PAGE < posts.length);
            } else {
                setVisiblePosts([]);
                setHasMore(false);
            }
        }
    }, [posts, loading, page]);

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
            setSearchInputFocused={setSearchInputFocused} // Ensure this is passed
            handleSearchChange={handleSearchChange}
            lastPostElementRef={lastPostElementRef}
            users={users}
        />
    );
};