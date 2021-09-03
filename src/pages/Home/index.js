import React, {Fragment, lazy} from 'react';
// import SearchInput from './SearchInput';
const SearchInput = lazy(() => import('./SearchInput'));
const Home = () => {
    return (
        <Fragment>
            <h3>
                <span>༼ つ ◕_◕ ༽つ  </span>
                <span className={"text-primary"}>𝐹𝑅</span>
                <span className={"text-warning"}>𝒜𝒩</span>
                <span className={"text-danger"}>𝒞𝐸</span>
            </h3>
            <p className="alert alert-info">本服务致力于技术交流，切勿用于非法用途</p>
            <SearchInput/>
        </Fragment>
    );
};

export default Home;
