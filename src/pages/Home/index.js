import React, {Fragment, lazy} from 'react';
import Footer from '../../components/Footer';
// import SearchInput from './SearchInput';
const SearchInput = lazy(() => import('./SearchInput'));
const Home = () => {
    return (
        <Fragment>
            <h3>科学 🏄 回法国</h3>
            <p className="alert alert-info">富强、民主、文明、和谐、自由、平等、公正、法治、爱国、敬业、诚信、友善</p>
            <SearchInput/>
            <Footer/>
        </Fragment>
    );
};

export default Home;
