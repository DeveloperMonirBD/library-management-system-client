import Carousel from '../components/Carousel';
import PageTitle from '../components/PageTitle';
import BookCategories from './BookCategories';

const Home = () => {
    return (
        <div>
            {/* setup Page-Title by react Helmet */}
            <PageTitle title="Home" />

            <Carousel />
            <BookCategories />
        </div>
    );
};

export default Home;
