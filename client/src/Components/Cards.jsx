import axios from 'axios';
import React from 'react';

export const Cards = ({ content, author, fav = false }) => {
    const handleAdd = () => {
        axios.post(`http://localhost:8081/favorites`, { content, author })
            .then((res) => {
                console.log("Added");
                window.alert("Added to Favorites");
            })
            .catch((err) => {
                console.log(err);
            })
    }
    
    return (
        <div className="card" style={{ width: '45%' }}>
            <h1>{content}</h1>
            <h5>Author: {author}</h5>
            <div className="card-body">
                {!fav && (
                    <a href="#" className="btn btn-primary" onClick={handleAdd}>Favorite</a>
                )}
            </div>
        </div>
    );
};
