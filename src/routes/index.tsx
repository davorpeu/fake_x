import { Routes, Route } from 'react-router-dom';
import {PostsPageContainer} from "../features/postList/components/PostPageContainer";
import { PostContainer} from '../features/post/components/PostContainer';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/posts" element={<PostsPageContainer />} />
            <Route path="/post/:id" element={<PostContainer />} />
            <Route path="/" element={<PostsPageContainer />} />
        </Routes>
    );
};