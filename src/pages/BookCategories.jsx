import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ['Novel', 'Thriller', 'History', 'Sci-Fi'];

const BookCategories = () => {
    const [categoryData, setCategoryData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/books`);
                const books = response.data;
                const categoryImages = categories.map(category => {
                    const book = books.find(book => book.category === category);
                    return {
                        name: category,
                        imageUrl: book ? book.image : 'path/to/default-image.jpg'
                    };
                });
                setCategoryData(categoryImages);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryClick = category => {
        navigate(`/books/${category}`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryData.map(category => (
                <div key={category.name} className="border rounded shadow-md p-4 cursor-pointer" onClick={() => handleCategoryClick(category.name)}>
                    <img src={category.imageUrl} alt={category.name} className="h-48 w-full object-cover" />
                    <h3 className="text-xl font-bold mt-2">{category.name}</h3>
                </div>
            ))}
        </div>
    );
};

export default BookCategories;
