//motion
import { motion } from 'framer-motion';

//variants
import { fadeIn } from '../variants';

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

            <motion.div
                variants={fadeIn('up', 0.2)}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.7 }}
                className="flex flex-col lg:w-2/4 mx-auto text-center my-14 md:my-16 px-3">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 text-brandSecondary">Explore Our Collection</h1>
                <p className="text-base text-neutralGrey px-10">Browse our curated book list, sorted by genre. Find your next great read today.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-6 lg:gap-10">
                {books.map(book => (
                    <motion.div
                        variants={fadeIn('left', 0.3)}
                        initial="hidden"
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.7 }}
                        key={book._id}
                        className="card card-side bg-base-100 shadow-xl space-x-6 md:space-x-10">
                        <figure>
                            <div className="h-72 md:h-80 border">
                                <img src={book.image} alt={book.name} className="h-full w-72 md:w-48" />
                            </div>
                        </figure>
                        <div className="text-base pr-3">
                            <h2 className="font-bold mt-6 md:mt-8 mb-2 md:mb-4 text-lg md:text-xl">{book.name}!</h2>
                            <div className="md:space-y-2">
                                <p>Author: {book.authorName}</p>
                                <p>Category: {book.category}</p>
                                <p>Quantity: {book.quantity}</p>
                            </div>
                            <div className="flex items-center mb-4 md:mb-6 mt-1 md:mt-3">
                                <ReactStars count={5} value={book.rating} activeColor="#ffd700" edit={false} isHalf={true} />
                                <span className="ml-2 text-sm">{book.rating} / 5</span>
                            </div>
                            <div className="card-actions justify-start lg:mr-8">
                                <button onClick={() => navigate(`/books/details/${book._id}`)} className="btn bg-brandSecondary text-brandLight hover:text-brandPrimary md:w-48 py-3">
                                    Details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BookList;

//   <div  className=" flex justify-center bg-[#F1E5E5] border rounded shadow-md p-6 lg:py-16 lg:px-8 cursor-pointer">
//                         <div className="h-72 md:h-40 lg:h-72 mx-auto border shadow-2xl mb-5">
//                             <img src={book.image} alt={book.name} className=" h-full w-full object-cover" />

//                             <h3 className="text-xl text-brandSecondary font-bold mt-4 lg:mt-6 ">{book.name}</h3>

//                             <p>Author: {book.authorName}</p>

//                             <p>Category: {book.category}</p>
//                             <p>Quantity: {book.quantity}</p>

//                             <div className="flex items-center mb-2">
//                                 <ReactStars count={5} value={book.rating} size={24} activeColor="#ffd700" edit={false} isHalf={true} />
//                                 <span className="ml-2 text-sm">{book.rating} / 5</span>
//                             </div>

//                             <button onClick={() => navigate(`/books/details/${book._id}`)} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
//                                 Details
//                             </button>
//                         </div>
//                     </div>
