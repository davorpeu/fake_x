import React, {FC} from 'react';
import {PostCard} from './PostCard';
import {SharedLogger} from '../../../components/SharedLogger';
import {Skeleton, Spin, Empty, FloatButton, AutoComplete} from "antd";
import { ArrowUpOutlined} from '@ant-design/icons';
import {Post} from "../types/postList.types";

interface PostsPageProps {
    visiblePosts: Post[],
    loading: boolean,
    hasMore: boolean,
    searchTerm: string,
    searchInputFocused: boolean,
    setSearchInputFocused: (focused: boolean) => void,
    handleSearchChange: (value: string) => void,
    lastPostElementRef: (node: HTMLDivElement | null) => void,
    options: {value: string, label: string}[],
    onSearch: (value: string) => void
}

export const PostsPage: FC<PostsPageProps> = ({
                                                  visiblePosts,
                                                  loading,
                                                  hasMore,
                                                  setSearchInputFocused,
                                                  handleSearchChange,
                                                  lastPostElementRef,
                                                  options,
                                                  onSearch
                                              }) => {
    return (
        <div className="bg-gray-50 min-h-screen min-w-screen" style={{
            minWidth: '100%',

        } }>
            <FloatButton.BackTop>
                <div className="bg-blue-500 text-white p-2 ">
                    <ArrowUpOutlined/>
                </div>
            </FloatButton.BackTop>

            <div style={{
                width: '100%',
                maxWidth: '480px',
                padding: '12px',
                margin: '0 auto',
                ...(window.innerWidth <= 480 && {  // Mobile (up to 480px)
                    maxWidth: '320px',
                    padding: '2px',
                }),
                ...(window.innerWidth > 480 && window.innerWidth <= 600 && {  // Tablet (481px - 768px)
                    maxWidth: '320px',
                    padding: '10px',
                }),

            }}>
                <SharedLogger helloFrom="PostsPage"/>

                <div className="flex justify-center mb-3">
                    <h1 className="text-xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Posts
                    </h1>
                </div>

                <div className="mb-4">
                    <AutoComplete
                        style={{ width: '100%' }}
                        placeholder="Search by name or post content..."
                        options={options}
                        onSearch={onSearch}
                        onSelect={handleSearchChange}
                        onChange={handleSearchChange}
                        onFocus={() => setSearchInputFocused(true)}
                        onBlur={() => setSearchInputFocused(false)}
                        className="rounded-lg shadow-md"
                        size="middle"
                        allowClear
                    />
                </div>

                {loading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <Skeleton
                                key={i}
                                active
                                avatar
                                paragraph={{rows: 2}}
                                className="bg-white rounded-lg p-2 shadow-md"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {(visiblePosts || []).length > 0 ? (
                            <>
                                {visiblePosts.map((post, index) => {
                                    if (visiblePosts.length === index + 1) {
                                        return (
                                            <div
                                                ref={lastPostElementRef}
                                                key={post.id}
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
                                            <div key={post.id}>
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

                                {hasMore && (
                                    <div className="flex justify-center py-2">
                                        <Spin tip="Loading..."/>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Empty
                                description="No posts found"
                                className="bg-white rounded-lg p-4 space-y-3 shadow-md"
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};