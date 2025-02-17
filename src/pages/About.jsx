//motion
import { motion } from 'framer-motion';
//variants
import { fadeIn } from '../variants';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

const About = () => {
    return (
        <>
            <PageTitle title="About Us" />
            <motion.div
                variants={fadeIn('up', 0.2)}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.7 }}
                className="bg-[#F1E5E5] min-h-screen py-6 flex justify-center items-center">
                <div className="container mx-auto px-6 lg:px-12 max-h-[700px] overflow-y-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">About Me</h1>
                        <p className="text-base">Discover more about my journey, skills, and projects.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-8 transform transition duration-500 hover:scale-105">
                        <div className="mb-6">
                            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">Who I Am</h2>
                            <p className="text-gray-600 text-base">
                                Hi, I'm Md. Monirul Islam, a passionate Web developer with a love for creating innovative solutions. With a strong background in web development and a keen eye for
                                detail, I strive to build user-friendly applications that solve real-world problems.
                            </p>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">My Skills</h2>
                            <p className="text-gray-600 text-base">
                                I have a diverse set of skills, ranging from front-end development using React, Tailwind CSS and JavaScript, to back-end development with Node.js, Express, and
                                MongoDB. I am also proficient in using Firebase for authentication and database management.
                            </p>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">Other Projects</h2>
                            <p className="text-gray-600 text-base mb-4">Here are some of the projects I have worked on:</p>
                            <ul className="list-disc list-inside text-gray-600 text-base mb-6">
                                <li className="mb-2">
                                    <strong> <Link className='text-blue-400' to="https://tourism-management-syste-24ab2.web.app/">Project 1</Link>:</strong> The Tourist Guide site is an online platform designed to be a comprehensive resource for travelers. It provides detailed information on popular destinations in Bangladesh, helping users plan their trips effectively.
                                </li>
                                <li className="mb-2">
                                    <strong> <Link className='text-blue-400' to="https://visa-navigator-bb0c9.web.app/">Project 2:</Link></strong> An Visa Navigator Portal is a user-friendly platform designed to simplify the process of checking visa requirements, applying for visas, and tracking visa applications. The portal offers a seamless user experience with a dynamic interface, robust authentication, and responsive design, making it easy for users to navigate through visa information and manage their applications.
                                </li>
                                <li className="mb-2">
                                    <strong> <Link className='text-blue-400' to="https://lingo-bingo-a69cd.web.app/">Project 3:</Link></strong> Vocabulary Pronunciation is a web application designed to enhance language learning by providing users with the ability to hear the pronunciation of vocabulary words. Users can click on vocabulary cards to listen to the pronunciation and view additional information about each word. This project utilizes the Web Speech API for text-to-speech functionality.
                                </li>
                               
                            </ul>
                            <p className="text-gray-600 text-base">
                                Feel free to explore my
                                <Link to="https://github.com/DeveloperMonirBD" className="text-blue-500">
                                    <span> GitHub </span>
                                </Link>
                                profile for more projects and contributions.
                            </p>
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <h2 className="text-3xl font-semibold mb-4">Connect with Me</h2>
                        <div className="flex justify-center space-x-6 text-3xl md:text-4xl">
                            <Link href="https://github.com/DeveloperMonirBD" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                                <FaGithub />
                            </Link>
                            <Link to="https://www.linkedin.com/in/monirdeveloper/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                                <FaLinkedin />
                            </Link>
                            <Link to="https://x.com/Monir_Developer" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                                <FaTwitter />
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default About;
