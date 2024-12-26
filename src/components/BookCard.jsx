//motion
import { motion } from 'framer-motion';

//variants
import { fadeIn } from '../variants';

import ReactStars from 'react-rating-stars-component';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        navigate(`/update-book/${book._id}`);
    };

    return (
        <motion.div
            variants={fadeIn('right', 0.4)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.5 }}
            key={book._id}
            className="card card-side bg-base-100 shadow-xl space-x-6 md:space-x-10">
            <figure>
                <div className="h-72 md:h-80 border">
                    <img src={book.image} alt={book.name} className="h-full w-72 md:w-48" />
                </div>
            </figure>
            <div className="text-base pr-3">
                <h2 className="font-bold mt-6 md:mt-8 mb-2 text-lg md:text-xl">{book.name}!</h2>
                <div className="md:space-y-2 md:mt-6">
                    <p>Author: {book.authorName}</p>
                    <p>Category: {book.category}</p>
                    <p>Quantity: {book.quantity}</p>
                </div>
                <div className="flex items-center mb-4 md:mb-6 mt-1 md:mt-2">
                    <ReactStars count={5} value={book.rating} activeColor="#ffd700" edit={false} isHalf={true} />
                    <span className="ml-2 text-sm">{book.rating} / 5</span>
                </div>
                <div className="card-actions justify-start lg:mr-8">
                    <button onClick={() => handleUpdateClick(book._id)} className="bg-brandSecondary text-white px-4 py-2 rounded hover:bg-brandPrimary">
                        Update
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default BookCard;
