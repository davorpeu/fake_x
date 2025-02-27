import { usePosts } from '../../features/posts/hooks/usePosts';
import { PostCard } from '../../components/PostCard';
import { SharedLogger } from '../../components/SharedLogger';
import { Col, Row, Input, Skeleton, Spin, Empty, FloatButton } from "antd";
import { SearchOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from 'lodash';

interface Post {
    id:  number;
    title: string;
    body: string;
    userName: string;
}

export const PostsPage = () => {
    const { posts, loading, searchTerm, setSearchTerm } = usePosts();
    const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchInputFocused, setSearchInputFocused] = useState(false);

    // Properly type the ref for IntersectionObserver
    const observer = useRef<IntersectionObserver | null>(null);
    const POSTS_PER_PAGE = 5;

    const debouncedSetSearchTerm = useCallback(
        debounce((value: string) => {
            setSearchTerm(value);
            setPage(1);
            setVisiblePosts([]);
        }, 300),
        [setSearchTerm]
    );

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSetSearchTerm(e.target.value);
    };

    // Reset pagination when posts change
    useEffect(() => {
        if (!loading && posts.length > 0) {
            setVisiblePosts(posts.slice(0, page * POSTS_PER_PAGE));
            setHasMore(page * POSTS_PER_PAGE < posts.length);
        } else if (!loading && posts.length === 0) {
            setVisiblePosts([]);
            setHasMore(false);
        }
    }, [posts, loading, page]);

    // Intersection observer for infinite scroll
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
        <div className="container mx-auto p-4 min-h-screen relative">
            <FloatButton.BackTop>
                <div className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300">
                    <ArrowUpOutlined />
                </div>
            </FloatButton.BackTop>

            <Row justify="center">
                <Col xs={24} sm={20} md={16} lg={12} xl={10}>
                    <SharedLogger helloFrom="PostsPage" />

                    <div className="flex justify-center items-center mb-6">
                        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Posts
                        </h1>
                        {/* Badge commented out as per your code */}
                        {/*{!loading && posts.length > 0 && (
                            <Badge
                                count={posts.length}
                                className="ml-2 animate-bounce"
                                style={{ backgroundColor: '#3b82f6' }}
                            />
                        )}*/}
                    </div>

                    {/* Enhanced search input with animation */}
                    <div className={`search-container mb-8 transition-all duration-300 ${searchInputFocused ? 'scale-105' : ''}`}>
                        <Input
                            prefix={<SearchOutlined className={`${searchInputFocused ? 'text-blue-500' : 'text-gray-400'} transition-colors duration-300`} />}
                            type="text"
                            placeholder="Search by user name..."
                            defaultValue={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={() => setSearchInputFocused(true)}
                            onBlur={() => setSearchInputFocused(false)}
                            className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            size="large"
                            allowClear
                        />
                    </div>

                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <Skeleton
                                    key={i}
                                    active
                                    avatar
                                    paragraph={{ rows: 3 }}
                                    className="bg-white rounded-lg p-4 shadow-md"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4 transition-all duration-500">
                            {visiblePosts.length > 0 ? (
                                <>
                                    {visiblePosts.map((post, index) => {
                                        if (visiblePosts.length === index + 1) {
                                            return (
                                                <div
                                                    ref={lastPostElementRef}
                                                    key={post.id}
                                                    className="transform transition-all duration-300 hover:scale-102 hover:-translate-y-1 pointer-events-none"
                                                >
                                                    <PostCard
                                                        id={post.id}
                                                        title={post.title}
                                                        body={post.body}
                                                        userName={post.userName}
                                                    />
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div
                                                    key={post.id}
                                                    className="transform transition-all duration-300 hover:scale-102 hover:-translate-y-1"
                                                >
                                                    <PostCard
                                                        id={post.id}
                                                        title={post.title}
                                                        body={post.body}
                                                        userName={post.userName}
                                                    />
                                                </div>
                                            );
                                        }
                                    })}

                                    {/* Loading indicator for infinite scroll */}
                                    {hasMore && (
                                        <div className="flex justify-center py-4">
                                            <Spin tip="Loading more posts..." />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Empty
                                    description="No posts found matching your search"
                                    className="bg-white rounded-lg p-8 shadow-md"
                                />
                            )}
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
};