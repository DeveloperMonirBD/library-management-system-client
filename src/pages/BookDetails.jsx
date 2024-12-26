//motion
import { motion } from 'framer-motion';

//variants
import { fadeIn } from '../variants';

import { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import ReactStars from 'react-rating-stars-component';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import toast from 'react-hot-toast';
import PageTitle from '../components/PageTitle';
import { AuthContext } from '../provider/AuthProvider';

const BookDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [returnDate, setReturnDate] = useState('');
    const [alreadyBorrowed, setAlreadyBorrowed] = useState(false);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`);
                setBook(response.data);
                setLoading(false);
                // checkIfAlreadyBorrowed(response.data._id);
            } catch (error) {
                console.error('Error fetching book details:', error);
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id, user.uid]);

    // find data from borrowedBook collection by email
    useEffect(() => {
        const getBorrowedData = async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/single/borrow/${id}`);
            console.log(res);

            if (res?.data?.userEmail === user?.email) {
                setAlreadyBorrowed(true);
            } else {
                setAlreadyBorrowed(false);
            }
        };
        getBorrowedData();
    }, [id]);

    console.log(alreadyBorrowed);
    const handleBorrow = async () => {
        if (new Date(returnDate) < new Date()) {
            toast.error('Return date cannot be before today.');
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/borrow`, {
                bookId: book._id,
                userId: user.uid,
                returnDate,
                userName: user.displayName,
                userEmail: user.email,
                image: book.image,
                name: book.name,
                quantity: book.quantity,
                authorName: book.authorName,
                category: book.category,
                shortDescription: book.shortDescription,
                rating: book.rating,
                bookContent: book.bookContent
            });
            setBook({ ...book, quantity: book.quantity - 1 });
            setModalIsOpen(false);
            setAlreadyBorrowed(true);
            toast.success('Book borrowed successfully!');
        } catch (error) {
            console.error('Error borrowing book:', error);
            toast.error('Error borrowing book.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!book) {
        return <div>Book not found</div>;
    }

    return (
        <div className="container mx-auto my-20">
            {/* Setup Page-Title by react Helmet */}
            <PageTitle title="BookDetails" />

            <motion.div
                variants={fadeIn('up', 0.2)}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.7 }}
                className="flex flex-col lg:w-2/4 mx-auto text-center my-14 md:my-16 px-3">
                <h1 className="text-3xl font-bold mb-3 text-brandPrimary">Discover Your Next Read</h1>
                <p className="text-base text-neutralGrey px-10">Find ratings, author details, genre, and a comprehensive description to decide your next book.</p>
            </motion.div>

            <motion.div variants={fadeIn('left', 0.3)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }} className=" items-center md:items-start max-w-5xl mx-auto">
                <div className="card md:card-side bg-base-100 shadow-xl space-x-6 md:space-x-10">
                    <figure>
                        <div className="h-72 md:h-[500px] md:w-[400px] border">
                            <img src={book.image} alt={book.name} className="h-full w-56 md:w-full object-cover" />
                        </div>
                    </figure>

                    <div className="text-base pr-3">
                        <h2 className="font-bold mt-6 md:mt-10 mb-4 text-lg text-brandSecondary md:text-3xl">{book.name}!</h2>
                        <div className="space-y-2 text-lg">
                            <p>
                                <strong>Author: </strong>
                                {book.authorName}
                            </p>
                            <p>
                                <strong>Category:</strong> {book.category}
                            </p>
                            <p>
                                <strong>Quantity:</strong> {book.quantity}
                            </p>
                        </div>
                        <div className="flex items-center mb-4 mt-4">
                            <ReactStars count={5} value={book.rating} activeColor="#ffd700" edit={false} isHalf={true} />
                            <span className="ml-2 text-sm">{book.rating} / 5</span>
                        </div>
                        <p className="text-lg mt-4">
                            <strong>Description:</strong>
                        </p>
                        <p className="mt-1 mb-4 mr-8">{book.shortDescription}</p>

                        <div className="card-actions justify-start lg:mr-8 mb-8">
                            <button
                                onClick={() => {
                                    if (book.quantity > 0) {
                                        setModalIsOpen(true);
                                    } else {
                                        toast.error('Book is out of stock.');
                                    }
                                }}
                                className="btn bg-brandSecondary text-brandLight hover:text-brandPrimary md:w-48 py-3"
                                disabled={alreadyBorrowed}>
                                {alreadyBorrowed ? 'Already Borrowed' : 'Borrow'}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contentLabel="Borrow Book">
                <div className="mt-12 md:max-w-[600px] mx-auto md:shadow-lg md:px-10 py-20">
                    {/* Setup Page-Title by react Helmet */}
                    <PageTitle title="BorrowBook" />

                    <h2 className="text-3xl mb-10 flex justify-center font-bold text-brandPrimary">Borrow Book</h2>
                    <form
                        className="form-control"
                        onSubmit={e => {
                            e.preventDefault();
                            handleBorrow();
                        }}>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={user.displayName}
                                readOnly
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                            />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input
                                type="email"
                                value={user.email}
                                readOnly
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                            />
                        </label>
                        <br />
                        <label>
                            Return Date:
                            <input
                                type="date"
                                value={returnDate}
                                onChange={e => setReturnDate(e.target.value)}
                                required
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                            />
                        </label>
                        <br />
                        <button type="submit" className="bg-brandPrimary hover:bg-brandSecondary transition text-white px-4 py-2 rounded mt-4">
                            Submit
                        </button>
                    </form>
                    <button onClick={() => setModalIsOpen(false)} className="bg-rose-500 hover:bg-rose-600 transition text-white px-4 py-2 rounded mt-4 w-full font-bold">
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default BookDetails;
