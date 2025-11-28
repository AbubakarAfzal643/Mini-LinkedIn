import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this post?");
        if (isConfirmed) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    
                    toast.success("Post deleted successfully!", {
                        position: "top-right",
                        autoClose: 2000,
                    });
                    setTimeout(() => {
                        navigate("/all-posts");
                    }, 2000);
                }
            });
        }
    };

    return post ? (
        <div className="py-8">
            <Container>
                <ToastContainer />

                <Link to="/all-posts">
                    <button className="text-blue-700 hover:underline">
                        &larr; Back to All posts
                    </button>
                </Link>

                {isAuthor && (
                    <div className="flex justify-end mb-4">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3 hover:bg-green-600">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost} className="hover:bg-red-600">
                            Delete
                        </Button>
                    </div>
                )}

                {/* Post Title */}
                <div className="w-full mb-6 ">
                    <h1 className="text-3xl font-extrabold text-white">Title : {post.title}</h1>
                    <p className="text-sm text-white mt-1">
                        Posted by: {post.userId}
                    </p>
                </div>

                {/* Post Content */}
                <div className="browser-css prose max-w-none mb-10">
                    <h1 className="text-3xl mt-10 mb-1 font-extrabold text-white"> Content: </h1>
                    <p className="text-white">
                        {parse(post.content)}
                    </p>
                </div>

                {/* image display */}
                <div className="w-full flex justify-center mb-6">
                    <div className="border rounded-xl shadow-lg overflow-hidden max-w-2xl max-h-[300px] lg:max-w-3xl">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-full object-contain rounded-xl"
                        />
                    </div>
                </div>

            </Container>
        </div>
    ) : null;
}