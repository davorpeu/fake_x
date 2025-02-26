import { Routes, Route } from 'react-router-dom';
import { PostsPage } from '../pages/Posts';
import { PostDetailPage } from '../pages/PostDetail';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route path="/" element={<PostsPage />} />
        </Routes>
    );
};