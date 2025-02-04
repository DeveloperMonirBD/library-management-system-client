import Carousel from '../components/Carousel';
import ContactSection from '../components/ContactSection';
import EnhanceKnowledge from '../components/EnhanceKnowledge';
import PageTitle from '../components/PageTitle';
import UpcomingEvents from '../components/UpcomingEvents';
import BookCategories from './BookCategories';

const Home = () => {
    return (
        <div>
            {/* setup Page-Title by react Helmet */}
            <PageTitle title="Home" />

            <Carousel />
            <BookCategories />
            <UpcomingEvents />
            <EnhanceKnowledge />
            <ContactSection />
        </div>
    );
};

export default Home;
