import { Routes, Route } from 'react-router-dom';
import {PostsPageContainer} from "../features/posts/page/PostPageContainer";
import { PostDetailContainer} from '../features/posts/detail/PostDetailContainer';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/posts" element={<PostsPageContainer />} />
            <Route path="/post/:id" element={<PostDetailContainer />} />
            <Route path="/" element={<PostsPageContainer />} />
        </Routes>
    );
};