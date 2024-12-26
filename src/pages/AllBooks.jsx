//motion
import { motion } from 'framer-motion';

//variants
import { fadeIn } from '../variants';

import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import PageTitle from '../components/PageTitle';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [showAvailable, setShowAvailable] = useState(false);
    const [view, setView] = useState('card');
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
        <div className="container mx-auto pt-16 ">
            {/* Setup Page-Title by react Helmet */}
            <PageTitle title="AllBooks" />

            <motion.div variants={fadeIn('up', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }} className="flex flex-col lg:w-2/4 mx-auto text-center md:mb-16 px-3">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 text-brandSecondary">Explore Our All Books</h1>
                <p className="text-base text-neutralGrey px-10">Explore our extensive collection, organized for easy navigation and browsing.</p>
            </motion.div>

            <motion.div variants={fadeIn('left', 0.3)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }} className="flex justify-between">
                <button onClick={toggleShowAvailable} className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    {showAvailable ? 'Show All Books' : 'Show Available Books'}
                </button>

                {/* View */}
                <div className="mb-4">
                    <label className="mr-3 font-bold text-brandPrimary">View:</label>
                    <select value={view} onChange={handleViewChange} className="p-2 border border-brandPrimary rounded-md">
                        <option value="card">Card View</option>
                        <option value="table">Table View</option>
                    </select>
                </div>
            </motion.div>

            {/* table or card  */}
            {view === 'card' ? (
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-6 lg:gap-10 mt-10">
                    {filteredBooks.map(book => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            ) : (
                <motion.div variants={fadeIn('right', 0.4)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.5 }} className="overflow-x-auto">
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
                                    <td className="py-2 pl-4">
                                        <img src={book.image} alt={book.name} className="h-16 w-16 object-cover pr-2" />
                                    </td>
                                    <td className="py-2">{book.name}</td>
                                    <td className="py-2">{book.authorName}</td>
                                    <td className="py-2">{book.category}</td>
                                    <td className="py-2">{book.quantity}</td>
                                    <td className="py-2">
                                        <ReactStars count={5} value={book.rating} activeColor="#ffd700" edit={false} isHalf={true} />
                                        {/* <span className="ml-2 text-sm">{book.rating} / 5</span> */}
                                    </td>
                                    <td className="py-2">
                                        <button onClick={() => handleUpdateClick(book._id)} className="bg-brandSecondary text-white px-4 py-2 rounded hover:bg-brandPrimary">
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            )}
        </div>
    );
};

export default AllBooks;
