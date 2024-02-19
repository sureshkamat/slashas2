import React, { useState } from 'react';
import axios from 'axios';
import { Cards } from './Cards';

export const Home = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [noResults, setNoResults] = useState(false);

    const handleData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.quotable.io/search/quotes?query=${search}`);
            console.log(response);
            setData(response.data.results);
            setNoResults(response.data.results.length === 0);
        } catch (error) {
            console.error('Error fetching quotes:', error);
        }
    };

    return (
        <div>
            <form className="d-flex w-50 mt-3 mx-auto" onSubmit={handleData}>
                <input className="form-control form-control-lg me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
                <button className="btn btn-outline-success btn-lg" type="submit">Search</button>
            </form>

            {noResults && 
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <p style={{ color: 'red', fontSize: '24px' }}>No Data found</p>
                </div>
            }

            <div className="d-flex flex-wrap justify-content-center m-3 mx-auto" style={{ width: '95%', gap: '10px' }}>
                {data.map((el, index) => (
                    <Cards key={index} content={el.content} author={el.author}  />
                ))}
            </div>
        </div>
    );
};
