import React from "react";
import Header from "../header/header";
import Card from "../bookCard/card";
import "./mainBody.css"
import { useState } from "react";
import _ from "lodash"


const MainBody = () => {
    
    const [bookData, setBookData] = useState([]);
    console.log("Books : " + JSON.stringify(bookData))
    const [ishovered, setishovered] = useState(false);
    

    async function render(e) {

        e.preventDefault();

        // console.log(e.target.value);
        const search = e.target.value;

        await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`).then((data) =>{
            return data.json();
        }).then(book => {
            let Book = {
                title: book.items[0].volumeInfo.title,
                authors: book.items[0].volumeInfo.authors,
                pageCount: book.items[0].volumeInfo.pageCount,
                image: book.items[0].volumeInfo.imageLinks.smallThumbnail,
                rating: book.items[0].volumeInfo.averageRating,
                infoLink: book.items[0].volumeInfo.infoLink
            }
            setBookData([Book])
        })
    }

    return (
        <>
            <Header />
            <div className="body-main-container" >
                <div className="search-container">
                    <input type="text" onChange={(e) => render(e)} />
                    <button>Search</button>
                </div>
                <div className="render-container">
                    { 
                    // ishovered ? 
                    bookData.map((book, i) => {
                        return (
                            // <Card 
                            //     key={i}
                            //     title={book.title} 
                            //     authors={book.authors}
                            //     pageCount={book.pageCount}
                            //     image={book.image}
                            //     rating={book.rating}
                            //     infoLink={book.infoLink} 
                            //      />
                            <div 
                                key={i}
                                className="book-card"
                                onMouseEnter={() => setishovered(true)}
                                onMouseLeave={() => setishovered(false)}
                                onClick={() => window.open(book.infoLink, "_blank")}
                                >
                                    {/* <img src={book.image} alt="Cover Image" /> */}
                                    {ishovered ? (
                                        <div className="book-info">
                                            <div className="title">Title: {book.title}</div>
                                            <div className="authors">Authors: {book.authors.join(", ")}</div>
                                            <div className="rating">Rating: {book.rating}</div>
                                            <div className="pages">Pages: {book.pages}</div>
                                        </div>
                                    ) : <img style={{backgraoundImage: "url({book.image})"}} src={book.image} alt="Cover Image" />}
                            </div>
                        )
                    }) 
                }
                </div>
            </div>
        </>
    )
}

export default MainBody;


{/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&display=swap" rel="stylesheet"></link> */}