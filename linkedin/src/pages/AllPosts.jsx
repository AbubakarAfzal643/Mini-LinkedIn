
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import { Query } from 'appwrite'; 

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (!userData) {
            setPosts([]); 
            setLoading(false);
            return;
        }

        
        appwriteService.getPosts([Query.equal("userId", userData.$id)])
            .then((posts) => {
                if (posts && posts.documents) {
                    setPosts(posts.documents);
                } else {
                    setPosts([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            })
            .finally(() => setLoading(false));
    }, [userData]); 

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold text-gray-500">
                            Loading Posts . . .
                        </h1>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                {posts.length === 0 ? ( // no post state 
                    <div className="text-center text-gray-900 text-xl font-semibold">
                        No posts found for this account.
                    </div>
                ) : ( // posts available state 
                    <div className="flex flex-wrap -mx-4 ">
                        {posts.map((post) => (
                            <div key={post.$id} className="w-full md:w-1/2 lg:w-1/3 p-4 ">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;
