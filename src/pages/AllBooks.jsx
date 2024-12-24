import { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import PageTitle from '../components/PageTitle';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AllBooks = () => {
    const axiosSecure = useAxiosSecure();
    const [books, setBooks] = useState([]);
    const [showAvailable, setShowAvailable] = useState(false);
    const [view, setView] = useState('card');
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllBooks();
    }, []);

    const fetchAllBooks = async () => {
        try {
            const { data } = await axiosSecure.get(`/books`);
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

            {/* Setup Page-Title by react Helmet */}
            <PageTitle title="AllBooks" />

            <h1 className="text-2xl font-bold mb-6">All Books</h1>
            <div className="flex justify-between">
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
                                        <ReactStars count={5} value={book.rating} size={24} activeColor="#ffd700" edit={false} isHalf={true} />
                                        {/* <span className="ml-2 text-sm">{book.rating} / 5</span> */}
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
