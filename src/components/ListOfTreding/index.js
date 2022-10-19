import React, { useState, useEffect } from "react";
import getTreding from "services/getTreding";
import Gif from "../Gif";
import './ListOfTreding.css'

function ListOfTreding() {
 const [gifs, setGifs] = useState([]);

	useEffect(() => {
		getTreding().then((gifs) => setGifs(gifs));
	}, []);
 
	return (
    <div className="ListOfGifs">
      <getTreding />
      {gifs.map(({ id, title, url }) => (
        <Gif key={id} title={title} url={url} id={id} />
      ))}
    </div>
  );
}

export default ListOfTreding;
