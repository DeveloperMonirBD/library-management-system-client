import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PageTitle from '../components/PageTitle';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../provider/AuthProvider';

const BorrowedBooks = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            try {
                const response = await axiosSecure.get(`/borrow/${user.email}`);
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
            await axiosSecure.delete(`/return`, {
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
        <div className="container mx-auto md:py-10">
            {/* Setup Page-Title by react Helmet */}
            <PageTitle title="BorrowedBooks" />

            <div className="flex flex-col lg:w-2/4 mx-auto text-center my-14 md:my-16 px-3">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 text-brandSecondary">My Borrowed Books</h1>
                <p className="text-base text-neutralGrey px-10">Select and borrow books. Check availability, choose a return date, and enjoy reading.</p>
            </div>

            {borrowedBooks.length === 0 ? (
                <p>No borrowed books</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-6 lg:gap-10">
                    {borrowedBooks.map(book => (
                        <div key={book._id} className="card card-side bg-base-100 shadow-xl space-x-6 md:space-x-10">
                            <figure>
                                <div className="h-72 md:h-80 border">
                                    <img src={book.image} alt={book.name} className="h-full w-72 md:w-48" />
                                </div>
                            </figure>
                            <div className="text-base pr-3 pt-6 md:pt-8">
                                <h3 className="text-xl font-bold mt-2 mb-3 md:mb-4">{book.name}</h3>
                                <div className="space-y-2 md:space-y-3">
                                    <p>Category: {book.category}</p>
                                    <p>Borrowed Date: {new Date(book.borrowedDate).toLocaleDateString()}</p>
                                    <p>Return Date: {new Date(book.returnDate).toLocaleDateString()}</p>
                                </div>
                                <div className="card-actions justify-start lg:mr-8">
                                    <button onClick={() => handleReturn(book.bookId)} className="bg-red-500 text-white px-4 py-2 rounded mt-4 md:mt-6">
                                        Return
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                //     {borrowedBooks.map(book => (
                //         <div key={book.bookId} className="border rounded shadow-md p-4">
                //             <img src={book.image} alt={book.name} className="h-48 w-full object-cover" />
                // <h3 className="text-xl font-bold mt-2">{book.name}</h3>
                // <p>Category: {book.category}</p>
                // <p>Borrowed Date: {new Date(book.borrowedDate).toLocaleDateString()}</p>
                //     <p>Return Date: {new Date(book.returnDate).toLocaleDateString()}</p>

                // <button onClick={() => handleReturn(book.bookId)} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
                //     Return
                // </button>
                //         </div>
                //     ))}
                // </div>
            )}
        </div>
    );
};

export default BorrowedBooks;
