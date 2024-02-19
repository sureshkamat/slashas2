import React from 'react';
import axios from 'axios'; // Import Axios here

export const Cards = ({ content, author, fav = false }) => {
    const handleAdd = () => {
        axios.post(`http://localhost:8080/quotes`, { content, author })
            .then((res) => {
                if (res.data.status) {
                    console.log("Added");
                    window.alert("Added to Favorites");
                } else {
                    console.error("Error adding to favorites:", res.data.error);
                    window.alert("Error adding to favorites. Please try again later.");
                }
            })
            .catch((err) => {
                console.error("Error adding to favorites:", err);
                window.alert("Error adding to favorites. Please try again later.");
            });
    };
    
    return (
        <div className="card" style={{ width: '45%' }}>
            <h1>{content}</h1>
            <h5>Author: {author}</h5>
            <div className="card-body">
                {!fav && (
                    <button className="btn btn-primary" onClick={handleAdd}>Favorite</button>
                )}
            </div>
        </div>
    );
};
