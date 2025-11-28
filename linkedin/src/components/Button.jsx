import PropTypes from 'prop-types';

export default function Button({
    children,
    type = "button",
    bgColor = "bg-brandBlue", 
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button 
            type={type} 
            className={`px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-medium shadow-sm hover:opacity-90 transition-all duration-200 active:scale-95 ${bgColor} ${textColor} ${className}`} 
            {...props}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    className: PropTypes.string
}