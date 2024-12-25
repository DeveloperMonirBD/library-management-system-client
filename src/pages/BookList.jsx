import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

const BookList = () => {
    const { category } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/categoryBook?category=${category}`);
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
        <div className="container mx-auto my-20">
            {/* Setup Page-Title by react Helmet */}
            <PageTitle title="BookList" />
            <div className="flex flex-col lg:w-2/4 mx-auto text-center my-16 px-3">
                <h1 className="text-4xl font-bold mb-3 text-brandSecondary">Explore Our Book Categories</h1>
                <p className="text-base text-neutralGrey">
                    Dive into a world of knowledge and imagination. Explore our vast collection of books across various genres and find your next favorite read.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-6 lg:gap-10">
                {books.map(book => (
                    <div key={book._id} className="card card-side bg-base-100 shadow-xl space-x-6 md:space-x-10">
                        <figure>
                            <div className="h-72 border">
                                <img src={book.image} alt={book.name} className="h-full w-72 md:w-48" />
                            </div>
                        </figure>
                        <div className="text-base pr-3">
                            <h2 className="font-bold mt-6 mb-2 text-lg md:text-xl">{book.name}!</h2>
                            <p>Author: {book.authorName}</p>
                            <p>Category: {book.category}</p>
                            <p>Quantity: {book.quantity}</p>
                            <div className="flex items-center mb-4 mt-1">
                                <ReactStars count={5} value={book.rating} activeColor="#ffd700" edit={false} isHalf={true} />
                                <span className="ml-2 text-sm">{book.rating} / 5</span>
                            </div>
                            <div className="card-actions justify-start lg:mr-8">
                                <button onClick={() => navigate(`/books/details/${book._id}`)} className="btn bg-brandSecondary text-brandLight hover:text-brandPrimary md:w-48 py-3">
                                    Watch
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;
