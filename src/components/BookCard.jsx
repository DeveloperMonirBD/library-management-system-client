import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        navigate(`/update-book/${book._id}`);
    };

    return (
        <div className="bg-white shadow-lg overflow-hidden p-6 rounded-xl ">
            <div className="border shadow-xl">
                <img className="w-full h-[400px] rounded-lg " src={book.image} alt={book.name} />
            </div>
            <div className="pt-4 px-1">
                <h2 className="text-xl font-bold mb-2">{book.name}</h2>
                <p className="text-gray-700 mb-2">Author: {book.authorName}</p>
                <p className="text-gray-700 mb-2">Category: {book.category}</p>
                <p className="text-gray-700 mb-2">Quantity: {book.quantity}</p>
                <div className="flex items-center mb-4">
                    <div className="flex items-center mb-2">
                        <ReactStars count={5} value={book.rating} size={24} activeColor="#ffd700" edit={false} isHalf={true} />
                        <span className="ml-2 text-sm">{book.rating} / 5</span>
                    </div>
                </div>
                <button onClick={handleUpdateClick} className="bg-brandPrimary text-white px-6 py-3 rounded hover:bg-brandSecondary">
                    Update
                </button>
            </div>
        </div>
    );
};

export default BookCard;
