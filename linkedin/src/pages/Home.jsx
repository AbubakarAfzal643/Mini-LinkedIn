import { useEffect, useState } from 'react';
import authService from '../appwrite/auth'; 
import { Container } from '../components'; 

function Home() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        authService.getCurrentUser()
            .then((user) => {
                if (user) {
                    setUserData(user);
                } else {
                    setUserData(null); 
                }
            })
            .catch((error) => {
                console.error("Failed to fetch user data in Home:", error);
                setUserData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); 

    // Loading State
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brandBlue"></div>
                    </div>
                </Container>
            </div>
        );
    }

    // Not Logged In State
    if (!userData) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="p-12 max-w-2xl mx-auto bg-brandDark rounded-xl shadow-lg border border-gray-100">
                        <h1 className="text-3xl font-bold text-white mb-4">
                            Welcome to Mini LinkedIn!
                        </h1>
                        <p className="text-gray-400 mb-6">
                            Please log in to see your profile and posts.
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    // Logged in state 
    return (
        <div className='w-full py-12'>
            <Container>
                <div className='max-w-3xl mx-auto bg-brandDark shadow-2xl rounded-2xl p-10 border border-blue-500 text-white relative overflow-hidden'>
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-5 pointer-events-none"></div>

                    <div className='text-center relative z-10'>
                        <div className="inline-flex items-center justify-center p-4 bg-white rounded-full mb-6 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brandBlue" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        
                        <h1 className='text-4xl font-extrabold mb-2 tracking-tight'>
                            Welcome, {userData.name}
                        </h1>
                        <p className='text-lg text-blue-100 mb-8 font-light'>
                            This is your Mini LinkedIn Profile Page.
                        </p>
                    </div>


                    <div className="space-y-5 pt-8 border-t border-blue-400/50">
                        <div className="flex justify-between items-center text-left">
                            <span className="font-medium text-blue-200">User ID:</span>
                            <span className="text-white font-mono text-sm bg-blue-700/50 px-3 py-1 rounded">{userData.$id}</span>
                        </div>
                        <div className="flex justify-between items-center text-left">
                            <span className="font-medium text-blue-200">Name:</span>
                            <span className="text-white font-semibold text-lg">{userData.name}</span>
                        </div>
                        <div className="flex justify-between items-center text-left">
                            <span className="font-medium text-blue-200">Email:</span>
                            <span className="text-white">{userData.email}</span>
                        </div>
                        <div className="flex justify-between items-center text-left">
                            <span className="font-medium text-blue-200">Email Verification:</span>
                            <span className={`font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider ${userData.emailVerification ? 'bg-green-400 text-green-900' : 'bg-yellow-400 text-yellow-900'}`}>
                                {userData.emailVerification ? 'Verified' : 'Pending'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-left">
                            <span className="font-medium text-blue-200">Account Created:</span>
                            <span className="text-white">{new Date(userData.$createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home;