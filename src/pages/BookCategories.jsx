import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ['Novel', 'Drama', 'History', 'Sci-Fi'];

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
        <div className="container mx-auto">

            <div className="flex flex-col lg:w-2/4 mx-auto text-center my-14 md:my-16 px-3">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 text-brandSecondary">Explore Our Book Categories</h1>
                <p className="text-base text-neutralGrey px-10">
                    Dive into a world of knowledge and imagination. Explore our vast collection of books across various genres and find your next favorite read.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10">
                {categoryData.map(category => (
                    <div
                        key={category.name}
                        className=" flex justify-center bg-base-100 shadow-xl border rounded-xl p-10 lg:py-16 lg:px-8 cursor-pointer"
                        onClick={() => handleCategoryClick(category.name)}>
                        <div className="h-72 md:h-60 lg:h-72 mx-auto border shadow-2xl mb-5">
                            <img src={category.imageUrl} alt={category.name} className=" h-full w-48 object-cover " />
                            <h3 className="text-xl text-brandSecondary font-bold mt-4 lg:mt-6 ">{category.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookCategories;
