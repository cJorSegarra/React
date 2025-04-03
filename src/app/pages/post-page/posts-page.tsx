import React, { useState, useEffect } from "react";
import {
    useGetPostsQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} from "../../api/postApiSlice";
import { Post, NewPost } from "../../types/post.type";
import PostItem from "../../components/post-item/post-item";
import EditPostForm from "../../components/edit-post-form/edit-post-form";
import CreatePostForm from "../../components/create-post-form/create-post-form";
import SearchFilter from "../../components/search-filter-component/search-filter-component";
import Pagination from "../../components/pagination-component/pagination-component";
import "./posts-page.scss";

const PostsPage = () => {
    const { data: posts, error, isLoading, refetch } = useGetPostsQuery();
    const [createPost] = useCreatePostMutation();
    const [updatePost] = useUpdatePostMutation();
    const [deletePost] = useDeletePostMutation();

    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [creatingPost, setCreatingPost] = useState(false);
    const [postCreated, setPostCreated] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (posts) {
            const filtered = posts.filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPosts(filtered);
        }
    }, [posts, searchTerm]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    useEffect(() => {
        if (postCreated) {
            if (filteredPosts) {
                const totalPages = Math.max(
                    Math.ceil(filteredPosts.length / postsPerPage),
                    1
                );
                setCurrentPage(totalPages);
            }
            setPostCreated(false);
        }
    }, [postCreated, filteredPosts, postsPerPage]);

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

    const handleDelete = async (postId: number) => {
        if (window.confirm("¿Estás seguro de que deseas borrar este post?")) {
            await deletePost(postId);

            if (currentPosts.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
            refetch();
        }
    };

    const handleSaveEdit = async (post: Post) => {
        await updatePost({ id: post.id, post });
        setEditingPost(null);
        refetch();
    };

    const handleSaveCreate = async (post: NewPost) => {
        await createPost(post);
        setCreatingPost(false);
        setPostCreated(true);
        refetch();
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
                    Create Post
                </button>
            </div>
            <SearchFilter searchTerm={searchTerm} handleSearch={handleSearch} />

            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.toString()}</div>}

            {posts && (
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
