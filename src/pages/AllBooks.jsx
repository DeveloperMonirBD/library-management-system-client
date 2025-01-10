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
                <h1 className="text-3xl font-bold mb-3 text-brandPrimary">Explore Our All Books</h1>
                <p className="text-base text-neutralGrey px-10">Explore our extensive collection, organized for easy navigation and browsing.</p>
            </motion.div>

            <motion.div variants={fadeIn('left', 0.3)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }} className="flex justify-between mt-6">
                <button onClick={toggleShowAvailable} className="mb-4 bg-brandPrimary hover:bg-brandSecondary text-white px-4 py-2 rounded">
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
                <motion.div variants={fadeIn('top', 0.4)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.5 }} className="mx-auto">
                        <div className="overflow-x-auto w-full">
                            
                        <table className="table">
                            {/* head */}
                            <thead className='text-base text-neutral font-bold'>
                                <tr>
                                    <th>Sl. No</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Rating</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks.map((book, index) => (
                                    <tr key={book._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img src={book.image} alt={book.name} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{book.name}</div>
                                                    <div className="text-sm opacity-50">{book.authorName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{book.category}</td>
                                        <td>{book.quantity}</td>

                                        <td>
                                            <ReactStars count={5} value={book.rating} activeColor="#ffd700" edit={false} isHalf={true} />
                                            {/* <span className="ml-2 text-sm">{book.rating} / 5</span> */}
                                        </td>
                                        <th>
                                            <button onClick={() => handleUpdateClick(book._id)} className="bg-brandSecondary text-white px-4 py-2 rounded hover:bg-brandPrimary">
                                                Update
                                            </button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default AllBooks;
