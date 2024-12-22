import axios from 'axios';
import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';

const AllBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchAllBooks();
    }, []);

    const fetchAllBooks = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/books`);
        setBooks(data);
    };

    return (
        <div className=" container mx-auto grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            {books.map(book => (
                <BookCard key={book._id} book={book} />
            ))}
        </div>
    );
};

export default AllBooks;
