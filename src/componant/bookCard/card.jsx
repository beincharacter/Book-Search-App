import React from "react";
import { useState } from "react";
import "./card.css"


const Card = (props) =>{

    
    const [ishovered, setishovered] = useState(false);

    const hoveredStyle = {
        transform: "scale(1.1",
        zIndex: 1,
        boxShadow: "0 4px 8px 0"
    }
    return (
        <>
            <div className="book-card" style={ishovered ? hoveredStyle : {}} onMouseEnter={() => setishovered(true)} onMouseLeave={() => setishovered(false)}>
                <img src={props.image} alt="Book Cover" />
                <div className="book-info">
                    <h3>{props.title}</h3>
                    <p>{props.authors.join(", ")}</p>
                    <p>{props.pageCount} pages</p>
                    <p>Rating: {props.rating}</p>
                    <a href={props.infoLink} >Info</a>
                    
                </div>
            </div> 
        </>
    )
}

export default Card;