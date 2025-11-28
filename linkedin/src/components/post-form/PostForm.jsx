import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

export default function PostForm({ post }) {
    
    const [imagePreview, setImagePreview] = useState(
        (post && post.featuredImage) 
            ? appwriteService.getFilePreview(post.featuredImage) 
            : null
    );
    const [imageError, setImageError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (!userData) {
            navigate('/login');
        }
    }, [userData, navigate]);

    const submit = async (data) => {
        setLoading(true);

        if (!userData) {
            setLoading(false);
            navigate('/login');
            return;
        }

        try {
            if (post) {
                let file = null;
                if(data.image && data.image.length > 0) {
                     file = await appwriteService.uploadFile(data.image[0]);
                }

                if (file && post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } 
            else {
                if (!data.image || !data.image[0]) {
                    setLoading(false);
                    alert("Please select a featured image.");
                    return;
                }

                const file = await appwriteService.uploadFile(data.image[0]);
                
                if (!file) {
                    throw new Error("File upload failed - Service returned null");
                }
                
                const dbPost = await appwriteService.createPost({
                    ...data,
                    featuredImage: file.$id,
                    userId: userData.$id,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Appwrite Service Error:", error);
            alert(error.message || "Something went wrong while saving the post.");
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback(
        (value) => {
            if (value && typeof value === "string")
                return value
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z\d\s]+/g, "-")
                    .replace(/\s/g, "-");

            return "";
        },
        []
    );

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setImageError("File size should be less than 5MB");
                setValue("image", null); 
                return;
            }
            setImageError("");
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row gap-6 p-2 md:p-4">
            <div className="flex-1 w-full min-w-0">
                <Input 
                    label="Title :" 
                    placeholder="Title" 
                    className="mb-6" 
                    {...register("title", { required: true })} 
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-6"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <div className="w-full overflow-hidden">
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
            </div>
            
            <div className="w-full lg:w-1/3 lg:max-w-sm">
                <div className="sticky top-4 space-y-4">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post, onChange: handleImageChange })}
                    />
                    {imageError && <p className="text-red-500 text-sm mb-4">{imageError}</p>}
                    {imagePreview && (
                        <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="w-full h-48 object-cover" 
                                onError={() => setImagePreview(null)} 
                            />
                        </div>
                    )}
                    <Select 
                        options={["active", "inactive"]} 
                        label="Status : " 
                        className="mb-6" 
                        {...register("status", { required: true })} 
                    />
                    <Button 
                        type="submit" 
                        bgColor={post ? "bg-green-500" : undefined} 
                        className="w-full py-3"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : (post ? "Update Post" : "Submit Post")}
                    </Button>
                </div>
            </div>
        </form>
    );
}

PostForm.propTypes = {
    post: PropTypes.shape({
        $id: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string,
        featuredImage: PropTypes.string,
        status: PropTypes.string
    })
}