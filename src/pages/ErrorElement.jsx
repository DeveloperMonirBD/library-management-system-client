
import errorImg from '../../src/assets/error.webp';
import PageTitle from '../components/PageTitle';

const ErrorElement = () => {
    return (
        <div className="flex flex-col justify-center items-center text-center gap-8 mt-32">

            {/* Setup Page-Title by react Helmet */}
            <PageTitle title="Error" />

            <div>
                <img src={errorImg} alt="" />
            </div>
            <h2 className="text-xl md:text-2xl lg:text-4xl font-extrabold">No Information Available</h2>
        </div>
    );
};

export default ErrorElement;
