import { Helmet } from 'react-helmet';

const PageTitle = ({ title }) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title} Page || LibrarySystem Website</title>
        </Helmet>
    );
};

export default PageTitle;
