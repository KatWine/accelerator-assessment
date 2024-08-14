import Anime from "./Anime";
import { useState, useEffect } from "react";


const API = process.env.REACT_APP_BASE_URL;

function Animes() {
  
  const [animes,setAnimes]=useState([]);
  const [error, setError]= useState(null);
  console.log(animes)
  useEffect(() => {
    fetch(`${API}/animes`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(res => {
        if (!Array.isArray(res)) {
          throw new TypeError("Response is not an array");
        }
        setAnimes(res);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch Anime data");
      });
  }, []);

  return (
    <section className="index" id="anime-list">
      {error && <p>{error}</p>}
      {animes.length === 0 && !error && <p>No animes found</p>}
      
      {animes.map((anime) => {
        const {name, description} = anime
       return  <Anime key={anime.id} name={name} description={description}  id={anime.id} />
      })}
    </section>
  )
};

export default Animes;

  
 
