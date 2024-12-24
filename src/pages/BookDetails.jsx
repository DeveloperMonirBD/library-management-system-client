import { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import ReactStars from 'react-rating-stars-component';
import { useParams } from 'react-router-dom';

import toast from 'react-hot-toast';
import PageTitle from '../components/PageTitle';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../provider/AuthProvider';

const BookDetails = () => {
    const axiosSecure = useAxiosSecure();
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
                const response = await axiosSecure.get(`/books/${id}`);
                setBook(response.data);
                setLoading(false);
                checkIfAlreadyBorrowed(response.data._id);
            } catch (error) {
                console.error('Error fetching book details:', error);
                setLoading(false);
            }
        };

        const checkIfAlreadyBorrowed = async bookId => {
            try {
                const response = await axiosSecure.get(`/borrowedBooks`, {
                    params: {
                        bookId: bookId,
                        userId: user.uid
                    }
                });
                setAlreadyBorrowed(response.data.length > 0);
            } catch (error) {
                console.error('Error checking if already borrowed:', error);
            }
        };

        fetchBookDetails();
    }, [id, user.uid]);

    const handleBorrow = async () => {
        if (new Date(returnDate) < new Date()) {
            toast.error('Return date cannot be before today.');
            return;
        }

        try {
            await axiosSecure.post(`/borrow`, {
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
        <div className="container mx-auto px-4 py-8">
            {/* Setup Page-Title by react Helmet */}
            <PageTitle title="BookDetails" />

            <div className="flex flex-col md:flex-row items-center md:items-start">
                <img src={book.image} alt={book.name} className="h-64 w-64 object-cover rounded-md shadow-md" />
                <div className="md:ml-8 mt-4 md:mt-0">
                    <h1 className="text-3xl font-bold mb-4">{book.name}</h1>
                    <p className="text-lg mb-2">
                        <strong>Author:</strong> {book.authorName}
                    </p>
                    <p className="text-lg mb-2">
                        <strong>Category:</strong> {book.category}
                    </p>
                    <p className="text-lg mb-2">
                        <strong>Quantity:</strong> {book.quantity}
                    </p>
                    <p className="text-lg mb-2">
                        <strong>Rating:</strong>
                    </p>
                    <ReactStars value={book.rating} edit={false} isHalf={true} />
                    <p className="text-lg mt-4">
                        <strong>Description:</strong>
                    </p>
                    <p>{book.shortDescription}</p>
                    <button
                        onClick={() => {
                            if (book.quantity > 0) {
                                setModalIsOpen(true);
                            } else {
                                toast.error('Book is out of stock.');
                            }
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                        disabled={alreadyBorrowed}>
                        {alreadyBorrowed ? 'Already Borrowed' : 'Borrow'}
                    </button>
                </div>
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contentLabel="Borrow Book">
                <div className="mt-12 md:max-w-[500px] mx-auto md:shadow-lg md:px-10 py-20">
                    {/* Setup Page-Title by react Helmet */}
                    <PageTitle title="BorrowBook" />

                    <h2 className="text-3xl md:text-4xl mb-10 flex justify-center font-bold">Borrow Book</h2>
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
