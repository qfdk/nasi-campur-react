import React, {Suspense} from 'react';
import Spinner from '../../widget/Spinner';
import SearchInput from './SearchInput';

const Home = () => {
    return (
        <div className="container">
            <h3>科学 🏄 回法国</h3>
            <p className="alert alert-info">富强、民主、文明、和谐、自由、平等、公正、法治、爱国、敬业、诚信、友善</p>
            <Suspense fallback={<Spinner/>}>
                <SearchInput/>
            </Suspense>
        </div>
    );
};

export default Home;
