import Carousel from '../components/Carousel';
import ContactSection from '../components/ContactSection';
import CountUpComponent from '../components/CountUpComponents';
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
            <CountUpComponent />
            <UpcomingEvents />
            <EnhanceKnowledge />
            <ContactSection />
        </div>
    );
};

export default Home;
