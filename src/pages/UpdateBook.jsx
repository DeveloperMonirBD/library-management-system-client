import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        image: '',
        name: '',
        authorName: '',
        category: '',
        quantity: 0,
        rating: 0,
        shortDescription: ''
    });

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };
        fetchBookDetails();
    }, [id]);

    const handleChange = e => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/books/${id}`, book);
            toast.success('Updated successfully');
            navigate('/allBooks');
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16">
            {/* Setup Page-Title by react Helmet */}
            <PageTitle title="UpdateBook" />

            <h1 className="text-3xl font-bold text-brandPrimary text-center mb-12">Update Book</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input type="text" name="image" value={book.image} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" value={book.name} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Author Name</label>
                    <input type="text" name="authorName" value={book.authorName} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select name="category" value={book.category} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                        <option value="Novel">Novel</option>
                        <option value="Thriller">Thriller</option>
                        <option value="History">History</option>
                        <option value="Drama">Drama</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input type="number" name="quantity" value={book.quantity} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <input type="number" name="rating" value={book.rating} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Short Description</label>
                    <textarea name="shortDescription" value={book.shortDescription} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <button type="submit" className="bg-brandPrimary text-white px-6 py-2 rounded hover:bg-brandSecondary mt-3">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBook;
