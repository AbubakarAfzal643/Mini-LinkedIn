import logo from '../../public/logo.png'
import PropTypes from 'prop-types'

function Logo({ width = '100px', className = '' }) {
  return (
    <div>
      <img
        src={logo}
        alt="Logo"
        className={className}
        style={{ width }}
      />
    </div>
  )
}
export default Logo;

Logo.propTypes = {
  width: PropTypes.string,
  className: PropTypes.string,
}



