import { Link } from 'react-router-dom';

const Breadcrumb = ({ product }) => {
    return (
        <nav className="text-gray-400 text-sm sm:text-base">
            <Link to="/" className="hover:text-white">
                Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/" className="hover:text-white">
                Products
            </Link>
            <span className="mx-2">/</span>
            <span className="truncate">{product?.productName}</span>
        </nav>
    );
};

export default Breadcrumb;
