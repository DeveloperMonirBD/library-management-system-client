import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../provider/AuthProvider';

const BorrowedBooks = () => {
    const { user } = useContext(AuthContext);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/borrow/${user.email}`);
                setBorrowedBooks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching borrowed books:', error);
                setLoading(false);
            }
        };

        fetchBorrowedBooks();
    }, [user.email]);

    const handleReturn = async bookId => {
        console.log(`Returning book with ID: ${bookId} for user: ${user.uid}`);

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/return`, {
                data: {
                    bookId,
                    userId: user.uid
                }
            });
            setBorrowedBooks(borrowedBooks.filter(book => book.bookId !== bookId));
            toast.success('Book returned successfully!');
        } catch (error) {
            console.error('Error returning book:', error);
            toast.error('Error returning book.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">My Borrowed Books</h1>
            {borrowedBooks.length === 0 ? (
                <p>No borrowed books</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {borrowedBooks.map(book => (
                        <div key={book.bookId} className="border rounded shadow-md p-4">
                            <img src={book.image} alt={book.name} className="h-48 w-full object-cover" />
                            <h3 className="text-xl font-bold mt-2">{book.name}</h3>
                            <p>Category: {book.category}</p>
                            <p>Borrowed Date: {new Date(book.borrowedDate).toLocaleDateString()}</p>
                            <p>Return Date: {new Date(book.returnDate).toLocaleDateString()}</p>
                            <button onClick={() => handleReturn(book.bookId)} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
                                Return
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BorrowedBooks;
