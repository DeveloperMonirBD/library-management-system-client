import axios from 'axios';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { AuthContext } from '../provider/AuthProvider';

const AddBook = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [book, setBook] = useState({
        email: user.email,
        image: '',
        name: '',
        authorName: '',
        category: '',
        quantity: 0,
        rating: 0,
        shortDescription: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setBook({
            ...book,
            [name]: name === 'quantity' || name === 'rating' ? Number(value) : value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (book.rating < 0 || book.rating > 5) {
            toast.error('Rating must be between 0 and 5.');
            return;
        }
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/books`, book);
            toast.success('Book added successfully!');
            navigate('/allBooks');
        } catch (error) {
            console.error('Error adding book:', error);
            toast.error('Failed to add book.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <PageTitle title="AddBook" />
            <h1 className="text-2xl font-bold mb-6">Add Book</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input type="text" name="image" value={book.image} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" value={book.name} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Author Name</label>
                    <input type="text" name="authorName" value={book.authorName} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select name="category" value={book.category} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required>
                        <option value="">Select a category</option>
                        <option value="Novel">Novel</option>
                        <option value="Thriller">Thriller</option>
                        <option value="History">History</option>
                        <option value="Drama">Drama</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input type="number" name="quantity" value={book.quantity} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <input
                        type="number"
                        name="rating"
                        step="0.1"
                        min="0"
                        max="5"
                        value={book.rating}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Short Description</label>
                    <textarea name="shortDescription" value={book.shortDescription} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                    <button type="submit" className="bg-brandPrimary text-white px-4 py-2 rounded hover:bg-brandSecondary">
                        Add Book
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBook;
