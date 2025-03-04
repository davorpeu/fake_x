import { FC } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from 'lodash';
import { Post } from "../types/posts.types";
import { PostsPage } from "./PostsPage";

export const PostsPageContainer: FC = () => {
    const [options, setOptions] = useState<{value: string, label: string}[]>([]);
    const { posts, loading, searchTerm, setSearchTerm, fetchSuggestions } = usePosts();
    const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchInputFocused, setSearchInputFocused] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const POSTS_PER_PAGE = useRef(5).current;

    const debouncedSetSearchTerm = useCallback(
        debounce((value: string) => {
            setSearchTerm(value);
            setPage(1);
            setVisiblePosts([]);
        }, 300),
        [setSearchTerm]
    );

    const onSearch = useCallback((value: string) => {
        const suggestions = fetchSuggestions(value);
        setOptions(suggestions);
    }, [fetchSuggestions]);

    const handleSearchChange = useCallback((value: string) => {
        debouncedSetSearchTerm(value);
    }, [debouncedSetSearchTerm]);

    useEffect(() => {
        if (!loading) {
            const newVisiblePosts = posts.slice(0, page * POSTS_PER_PAGE);
            const newHasMore = page * POSTS_PER_PAGE < posts.length;

            setVisiblePosts(newVisiblePosts);
            setHasMore(newHasMore);
        }
    }, [posts, loading, page, POSTS_PER_PAGE]);

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
            options={options}
            onSearch={onSearch}
        />
    );
};