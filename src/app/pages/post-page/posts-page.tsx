import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
    fetchPosts,
    updatePostLocally,
    deletePostLocally,
    addPostLocally,
} from "../../store/posts/postSlice";
import { Post } from "../../types/post.type";
import PostItem from "../../components/post-item/post-item";
import EditPostForm from "../../components/edit-post-form/edit-post-form";
import CreatePostForm from "../../components/create-post-form/create-post-form";
import SearchFilter from "../../components/search-filter-component/search-filter-component";
import Pagination from "../../components/pagination-component/pagination-component";
import "./posts-page.scss";

const PostsPage = () => {
    const dispatch = useAppDispatch();
    const { posts, status, error } = useAppSelector((state) => state.posts);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [creatingPost, setCreatingPost] = useState(false);
    const [postCreated, setPostCreated] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    useEffect(() => {
        const filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [posts, searchTerm]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    useEffect(() => {
        if (postCreated) {
            const filtered = posts.filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const totalPages = Math.max(
                Math.ceil(filtered.length / postsPerPage),
                1
            );
            setCurrentPage(totalPages);
            setPostCreated(false);
        }
    }, [posts, postCreated, searchTerm, postsPerPage]);

    useEffect(() => {
        const totalPages = Math.max(
            Math.ceil(filteredPosts.length / postsPerPage),
            1
        );
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [filteredPosts, currentPage, postsPerPage]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.max(
        Math.ceil(filteredPosts.length / postsPerPage),
        1
    );

    const paginate = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleEdit = (post: Post) => {
        setEditingPost(post);
    };

    const handleDelete = (postId: number) => {
        if (window.confirm("¿Estás seguro de que deseas borrar este post?")) {
            dispatch(deletePostLocally(postId));
            if (currentPosts.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        }
    };

    const handleSaveEdit = (post: Post) => {
        dispatch(updatePostLocally(post));
        setEditingPost(null);
    };

    const handleSaveCreate = (post: Post) => {
        dispatch(addPostLocally(post));
        setCreatingPost(false);
        setPostCreated(true);
    };

    const handleCancelEdit = () => {
        setEditingPost(null);
    };

    const handleCancelCreate = () => {
        setCreatingPost(false);
    };

    return (
        <div className="page-container">
            <h1>Posts</h1>
            <div className="create-post-container">
                <button onClick={() => setCreatingPost(true)}>
                    Crear Post
                </button>
            </div>
            <SearchFilter searchTerm={searchTerm} handleSearch={handleSearch} />
            {status === "loading" && <div>Cargando...</div>}
            {status === "failed" && <div>Error: {error}</div>}
            {status === "succeeded" && (
                <div>
                    {currentPosts.map((post) => (
                        <PostItem
                            key={post.id}
                            post={post}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        paginate={paginate}
                    />
                </div>
            )}
            {editingPost && (
                <EditPostForm
                    post={editingPost}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                />
            )}
            {creatingPost && (
                <CreatePostForm
                    onSave={handleSaveCreate}
                    onCancel={handleCancelCreate}
                />
            )}
        </div>
    );
};

export default PostsPage;
