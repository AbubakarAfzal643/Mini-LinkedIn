import React, {useId} from 'react'
import PropTypes from 'prop-types';

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-2 pl-1 text-sm font-medium text-white break-words' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-gray-900 outline-none focus:bg-white focus:border-brandBlue focus:ring-1 focus:ring-brandBlue duration-200 border border-gray-300 w-full max-w-full transition-all ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input;

Input.propTypes = {
    label: PropTypes.node,
    type: PropTypes.string,
    className: PropTypes.string,
};