import axios from 'axios';
import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [showAvailable, setShowAvailable] = useState(false);

    useEffect(() => {
        fetchAllBooks();
    }, []);

    const fetchAllBooks = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/books`);
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const toggleShowAvailable = () => {
        setShowAvailable(prev => !prev);
    };

    const filteredBooks = showAvailable ? books.filter(book => book.quantity > 0) : books;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">All Books</h1>
            <button onClick={toggleShowAvailable} className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                {showAvailable ? 'Show All Books' : 'Show Available Books'}
            </button>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredBooks.length > 0 ? filteredBooks.map(book => <BookCard key={book._id} book={book} />) : <p className="text-gray-700">No books available.</p>}
            </div>
        </div>
    );
};

export default AllBooks;
