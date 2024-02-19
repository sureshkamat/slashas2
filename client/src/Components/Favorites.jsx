import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Cards } from './Cards';
export const Favorites = () => {
    const [data, setData] = useState([]);

    const handleData = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/favorites`);
            console.log(response);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching jokes:', error);
        }
    };
    useEffect(()=>{
        handleData();
    },[])
  return (
    <div className="d-flex flex-wrap justify-content-center m-3 mx-auto" style={{ width: '95%', gap: '10px' }}>
                {data.map((el, index) => (
                    <Cards key={index} content={el.content} author={el.author} fav={true} />
                ))}
            </div>
  )
}
