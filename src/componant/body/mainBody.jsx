import React from "react";
import Header from "../header/header";
import "./mainBody.css"
import { useState } from "react";
import './style.scss';



const MainBody = () => {

    const [bookData, setBookData] = useState([]);
    console.log("Books : " + JSON.stringify(bookData), bookData.length)
    const [ishovered, setishovered] = useState(false);


    async function render(e) {

        e.preventDefault();

        const search = e.target.value;

        await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`).then((data) => {
            return data.json();
        }).then(books => {
            console.log('book in res ', books)
            const bookData = books.items.map((item) => {
                return {
                    title: item.volumeInfo.title,
                    authors: item.volumeInfo.authors,
                    pageCount: item.volumeInfo.pageCount,
                    image: item.volumeInfo.imageLinks.smallThumbnail,
                    rating: item.volumeInfo.averageRating,
                    infoLink: item.volumeInfo.infoLink,
                };
            });
            setBookData(bookData);
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
                        bookData.map((book, i) => {
                            return (
                                <>
                                    <div className="book-card"
                                        key={i}
                                        onClick={() => window.open(book.infoLink, "_blank")}
                                    >
                                        <span className="book"
                                            style={{ backgroundImage: `url(${book.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPositionX: 'center',
                                         }} >
                                            <span className="book-info">
                                                <div className="title">Title: {book.title}</div>
                                                <div className="authors">Authors: {book.authors}</div>
                                                <div className="rating">Rating: {book.rating}</div>
                                                <div className="pages">Pages: {book.pageCount}</div>
                                            </span>
                                        </span>
                                    </div>
                                </>
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