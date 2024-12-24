import { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import useAxiosSecure from '../hooks/useAxiosSecure';

const BookList = () => {
    const axiosSecure = useAxiosSecure();
    const { category } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axiosSecure.get(`/categoryBook?category=${category}`);
                setBooks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching books:', error);
                setLoading(false);
            }
        };
        fetchBooks();
    }, [category]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Setup Page-Title by react Helmet */}
            <PageTitle title="BookList" />

            {books.map(book => (
                <div key={book._id} className="border rounded shadow-md p-4">
                    <img src={book.image} alt={book.name} className="h-48 w-full object-cover" />
                    <h3 className="text-xl font-bold mt-2">{book.name}</h3>
                    <p>Author: {book.authorName}</p>
                    <p>Category: {book.category}</p>
                    <p>Quantity: {book.quantity}</p>
                    <div className="flex items-center mb-2">
                        <ReactStars count={5} value={book.rating} size={24} activeColor="#ffd700" edit={false} isHalf={true} />
                        <span className="ml-2 text-sm">{book.rating} / 5</span>
                    </div>
                    <button onClick={() => navigate(`/books/details/${book._id}`)} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                        Details
                    </button>
                </div>
            ))}
        </div>
    );
};

export default BookList;
