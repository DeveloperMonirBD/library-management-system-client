//motion
import { motion } from 'framer-motion';
//variants
import { fadeIn } from '../variants';

import Lottie from 'lottie-react';
import contactLottieData from '../assets/Images/Animation - 1736485610507.json';

const ContactSection = () => {
    return (
        <div id="contact" className="contact py-16 border-t bg-white">
            <motion.div variants={fadeIn('up', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }} className="container mx-auto md:px-6">
                <div className="flex flex-wrap">
                    <div className="flex justify-center w-full lg:w-1/2 mb-6 lg:mb-0">
                        <Lottie className='w-full md:w-2/3' animationData={contactLottieData} />
                    </div>

                    <div className="w-full lg:w-1/2 border px-2 md:px-10 py-12 rounded-2xl mt-6 lg:mt-0 shadow-sm bg-base-100">
                        <h2 className="text-4xl font-extrabold text-brandPrimary text-center mb-8">Contact Us</h2>

                        <form action="https://api.web3forms.com/submit" method="POST">
                            <input type="hidden" name="access_key" value="affcf978-2dba-4c37-90b4-c96a6fc47a92" />
                            <div className="space-y-6"></div>

                            <div className="w-full mb-6">
                                <div className="form-control w-full">
                                    <input type="text" name="name" className="input input-bordered w-full bg-gray-100 text-gray-700" id="name" placeholder="Your Name" required />
                                </div>
                            </div>
                            <div className="w-full mb-6">
                                <div className="form-control w-full">
                                    <input type="email" className="input input-bordered w-full bg-gray-100 text-gray-700" name="email" id="email" placeholder="Your Email" required />
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="form-control w-full">
                                    <input type="text" className="input input-bordered w-full bg-gray-100 text-gray-700" name="subject" id="subject" placeholder="Subject" required />
                                </div>
                            </div>
                            <div className="mb-6">
                                <div className="form-control w-full">
                                    <textarea className="textarea textarea-bordered w-full bg-gray-100 text-gray-700 " name="message" rows="4" placeholder="Message" required></textarea>
                                </div>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary bg-brandPrimary text-white px-6 py-3 rounded w-full md:w-48" type="submit">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactSection;
