//motion
import { motion } from 'framer-motion';

//variants
import { fadeIn } from '../variants';

import CountUp from 'react-countup';

const CountUpComponent = () => {
    return (
        <div className="container mx-auto bg-gray-100 py-12 mt-20 rounded-tr-none rounded-tl-[100px] rounded-br-[100px] rounded-bl-none shadow-md">
            <div className="px-8 pb-4 text-center">
                <motion.h2 variants={fadeIn('up', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }} className="text-4xl font-bold mb-14 text-brandPrimary">
                    Our Books Collection
                </motion.h2>

                <motion.div
                    variants={fadeIn('right', 0.4)}
                    initial="hidden"
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.7 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white shadow-lg p-10 rounded-lg">
                        <h3 className="text-3xl font-semibold mb-3 text-gray-800">Novel</h3>
                        <p className="text-3xl font-bold text-blue-500">
                            <CountUp end={55} duration={3} />
                        </p>
                    </div>
                    <div className="bg-white shadow-lg p-10 rounded-lg">
                        <h3 className="text-3xl font-semibold mb-3 text-gray-800">Drama</h3>
                        <p className="text-3xl font-bold text-green-500">
                            <CountUp end={40} duration={3} />
                        </p>
                    </div>
                    <div className="bg-white shadow-lg p-10 rounded-lg">
                        <h3 className="text-3xl font-semibold mb-3 text-gray-800">History</h3>
                        <p className="text-3xl font-bold text-red-500">
                            <CountUp end={150} duration={3} />
                        </p>
                    </div>
                    <div className="bg-white shadow-lg p-10 rounded-lg">
                        <h3 className="text-3xl font-semibold mb-3 text-gray-800">Sci-Fi</h3>
                        <p className="text-3xl font-bold text-purple-500">
                            <CountUp end={50} duration={3} />
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CountUpComponent;
