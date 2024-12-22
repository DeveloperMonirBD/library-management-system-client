import axios from 'axios';
import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { useNavigate } from 'react-router-dom';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [showAvailable, setShowAvailable] = useState(false);
    const [view, setView] = useState('card'); // Default view is Card View
    const navigate = useNavigate();

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

    const handleViewChange = e => {
        setView(e.target.value);
    };

    const toggleShowAvailable = () => {
        setShowAvailable(prev => !prev);
    };

    const handleUpdateClick = id => {
        navigate(`/update-book/${id}`);
    };

    const filteredBooks = showAvailable ? books.filter(book => book.quantity > 0) : books;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">All Books</h1>
            <div className='flex justify-between'>
                <button onClick={toggleShowAvailable} className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    {showAvailable ? 'Show All Books' : 'Show Available Books'}
                </button>
                <div className="mb-4">
                    <label className="mr-2">View:</label>
                    <select value={view} onChange={handleViewChange} className="p-2 border border-gray-300 rounded-md">
                        <option value="card">Card View</option>
                        <option value="table">Table View</option>
                    </select>
                </div>
            </div>

            {view === 'card' ? (
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredBooks.map(book => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2">Image</th>
                                <th className="py-2">Name</th>
                                <th className="py-2">Author</th>
                                <th className="py-2 px-2">Category</th>
                                <th className="py-2">Quantity</th>
                                <th className="py-2">Rating</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map(book => (
                                <tr key={book._id}>
                                    <td className="py-2">
                                        <img src={book.image} alt={book.name} className="h-16 w-16 object-cover" />
                                    </td>
                                    <td className="py-2">{book.name}</td>
                                    <td className="py-2">{book.authorName}</td>
                                    <td className="py-2">{book.category}</td>
                                    <td className="py-2">{book.quantity}</td>
                                    <td className="py-2">
                                        {'⭐'.repeat(book.rating)}
                                        {'☆'.repeat(5 - book.rating)}
                                    </td>
                                    <td className="py-2">
                                        <button onClick={() => handleUpdateClick(book._id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllBooks;
