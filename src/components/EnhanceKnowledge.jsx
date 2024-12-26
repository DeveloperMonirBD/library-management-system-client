//motion
import { motion } from 'framer-motion';
//variants
import { fadeIn } from '../variants';
import { Link } from 'react-router-dom';

const EnhanceKnowledge = () => {
    return (
        <motion.div
            variants={fadeIn('left', 0.6)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.4 }}
            className="container mx-auto md:mt-20 py-10 my-10 md:py-16 px-10 lg:px-20 bg-brandLight hover:bg-[#F1E5E5] transition rounded-tl-none rounded-tr-[100px] rounded-bl-[100px] rounded-br-none shadow-md">
            <h2 className="text-2xl text-brandPrimary font-bold mb-4">Dive into our extensive collection. Find every book available, organized for easy browsing.</h2>
            <p className="mb-8 text-gray-600 md:w-2/3">
                Uncover all the details you need about this book. From ratings to the author's bio and a comprehensive description, learn everything before making it your next read.
            </p>
            <Link to="/allBooks" className="btn bg-brandPrimary text-white py-2 px-4 rounded hover:bg-brandSecondary transition">
                More Details
            </Link>
        </motion.div>
    );
};

export default EnhanceKnowledge;
