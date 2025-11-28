
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    
    const navigate = useNavigate()

    const logoutHandler = async () => {
    try {
        await authService.logout();
        dispatch(logout()); // reset state in the slice reducer
        navigate('/login'); // navigate to login page
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

    
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 font-medium hover:bg-blue-100 hover:text-darkPurple rounded-full text-red-600'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn