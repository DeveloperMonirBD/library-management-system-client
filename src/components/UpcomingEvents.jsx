//motion
import { motion } from 'framer-motion';

//variants
import { fadeIn } from '../variants';

const UpcomingEvents = () => {
    return (
        <section className=" mt-20 px-3">
            <div className="container mx-auto">
                <motion.div variants={fadeIn('up', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }}>
                    <h2 className="text-4xl font-extrabold text-brandPrimary mb-8 text-center">Upcoming Events</h2>
                    <p className="mb-8 max-w-3xl mx-auto leading-relaxed text-center">
                        Be part of our book club meeting. Discuss the book of the month with fellow readers, share your insights, and delve into meaningful conversations about literature.
                    </p>
                </motion.div>

                <motion.div variants={fadeIn('left', 0.3)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }} className="grid grid-cols-1 md:grid-cols-2  gap-8 mt-14">
                    {/* card-1  */}
                    <div className="flex flex-col justify-start bg-white rounded-lg shadow-lg px-4 md:px-8 py-6 md:py-8 transform transition-all duration-300 hover:scale-105 hover:bg-green-100">
                        {/* Event 1 */}
                        <h3 className="text-2xl font-bold mb-2">Book Signing with Author Name</h3>
                        <p className="text-gray-700 mb-4">Join us for an exclusive book signing event with renowned Author Name. Get your favorite books signed and interact with the author.</p>
                        <p className="text-gray-600">
                            <strong>Date:</strong> January 25, 2025
                        </p>
                        <p className="text-gray-600">
                            <strong>Time:</strong> 2:00 PM - 4:00 PM
                        </p>
                        <p className="text-gray-600">
                            <strong>Location:</strong> Library Main Hall
                        </p>
                    </div>

                    {/* card-2  */}
                    <div className="bg-white rounded-lg shadow-lg px-4 md:px-8 py-6 md:py-8 transform transition-all duration-300 hover:scale-105 hover:bg-blue-100">
                        <h3 className="text-2xl font-bold mb-2 text-brandSecondary">Children's Storytelling Session</h3>
                        <p className="text-gray-700 mb-4">Bring your kids for a fun storytelling session featuring classic tales and new stories, presented by our talented storytellers.</p>
                        <p className="text-gray-600">
                            <strong>Date:</strong> Febuary 10, 2025
                        </p>
                        <p className="text-gray-600">
                            <strong>Time:</strong> 11:00 AM - 12:30 PM
                        </p>
                        <p className="text-gray-600">
                            <strong>Location:</strong> Children's Section
                        </p>
                    </div>
                </motion.div>
                <motion.p
                    variants={fadeIn('right', 0.4)}
                    initial="hidden"
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.5 }}
                    className="mt-10 text-base font-semiboldmax-w-2xl mx-auto leading-relaxed text-center">
                    Join us for an evening of poetry reading. Listen to local poets share their work, and if you're feeling inspired, you can even share your own poems.! 🚀🌟
                </motion.p>
            </div>
        </section>
    );
};

export default UpcomingEvents;
