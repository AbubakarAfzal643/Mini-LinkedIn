import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="w-full py-8 bg-brandDark border-t border-gray-800">
      <div className="w-full px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start justify-between lg:w-4/12">
            <div className="mb-6 inline-flex items-center">
              <Logo width="50px" className="rounded-lg opacity-90 hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto md:mx-0">
              The professional platform for modern developers. Connect, share, and grow.
            </p>
            <p className="mt-4 text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Mini-LinkedIn. All Rights Reserved.
            </p>
          </div>

          <div className="flex flex-wrap w-full lg:w-7/12 gap-8 justify-center md:justify-between">
            
            <div className="w-full sm:w-1/3 md:w-auto">
              <h3 className="tracking-wider mb-4 text-xs font-semibold uppercase text-gray-500">
                Company
              </h3>
              <ul className="space-y-3">
                {["Features", "Pricing", "Affiliate Program", "Press Kit"].map((item) => (
                  <li key={item}>
                    <Link
                      className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                      to="/"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full sm:w-1/3 md:w-auto">
              <h3 className="tracking-wider mb-4 text-xs font-semibold uppercase text-gray-500">
                Support
              </h3>
              <ul className="space-y-3">
                {["Account", "Help", "Contact Us", "Customer Support"].map((item) => (
                  <li key={item}>
                    <Link
                      className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                      to="/"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full sm:w-1/3 md:w-auto">
              <h3 className="tracking-wider mb-4 text-xs font-semibold uppercase text-gray-500">
                Legals
              </h3>
              <ul className="space-y-3">
                {["Terms & Conditions", "Privacy Policy", "Licensing"].map((item) => (
                  <li key={item}>
                    <Link
                      className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                      to="/"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer