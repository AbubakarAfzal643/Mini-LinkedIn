import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'; 

function PostCard({ $id, title, featuredImage }) {
    const fallbackImage = 'https://via.placeholder.com/300x200?text=No+Image';
 
    const imageUrl = featuredImage 
        ? appwriteService.getFilePreview(featuredImage) 
        : fallbackImage;

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-brandDark rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
                <div className='w-full aspect-video relative'>
                    <img
                        src={imageUrl}
                        alt={title}
                        className='w-full h-full object-cover'
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                </div>
                <div className="p-5">
                    <h2 className='text-lg font-bold text-white line-clamp-2 leading-tight group-hover:text-brandBlue transition-colors'>
                        {title}
                    </h2>
                    <p className="text-xs text-gray-400 mt-2 font-medium">Read article &rarr;</p>
                </div>
            </div>
        </Link>
    );
}

PostCard.propTypes = {
    $id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    featuredImage: PropTypes.string, 
};

export default PostCard;