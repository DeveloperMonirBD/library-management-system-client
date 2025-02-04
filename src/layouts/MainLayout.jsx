import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div className="font-poppins">
            <Toaster position="top-right" reverseOrder={false} />
            <header className="sticky top-0  bg-[#F1E5E5] shadow-sm z-10">
                {/* Navbar */}
                <Navbar />
            </header>

            <main className="bg-[#FFFFFF]">
                {/* Dynamic Section  */}
                <div className="min-h-[calc(100vh-232px)] px-3 pb-12">
                    <Outlet />
                </div>
            </main>

            <footer>
                {/* Footer  */}
                <Footer />
            </footer>
        </div>
    );
};

export default MainLayout;
