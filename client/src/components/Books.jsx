import React from 'react';
//this is a class component
import parse from 'html-react-parser';

class Books extends React.Component{
    constructor(){
        super()
        this.state ={
            data: [],  
            bookInput: ''
        }
    }
    //this is a function that gets the data of the ebooks api that will be displayed when the user searches a book
    newSearch(){
        fetch('/books')
            .then(res => res.json())
            .then(data => this.setState({data}))
    }
    //this is a async/await function that fetches the information from the api 
    bookSearch = async () => {
        let search = this.state.bookInput.split(' ').join('+')
        const getBook = await fetch(`/book?search=${search}&type=${this.state.type}`)
        let res = await getBook.json()
        this.setState({
            data: res
        })
    }
    //this is the function used to get and add the information of any ebook to the favorites json file
    favoriteBook= (i) => {
        let favPic = {
            id: i.trackId,
            artist: i.artistName,
            artwork: i.artworkUrl100,
            track: i.trackName,
            description: i.description
        }
        //this is the fetch method to get and post the information of the books to favoritesBooks json file 
        fetch('/favoritesBooks', {
            method: 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(favPic)
        })
        alert('Added your book to favorites')
    }
    //this is the render and return function that displays the information
    render(){
        return (
            <div>
        {/*this is the heading for the ebooks*/}
                <h1>E-Books</h1>
            {/*the is the input field which is used to type in the song of the user's choosing*/}
                <input type="text" onChange={(e) => this.setState({bookInput: e.target.value})}input/>
            {/*this is the button used to search whatever ebook the user typed in on the input field*/}
                <button onClick={() => this.bookSearch()}>Search</button>
                <fieldset>
            {/*this is the filedset used for all the information of the ebooks to be to be displayed in the page*/}
                    {this.state.data.map(sort_data => <article key={sort_data.trackId}>{sort_data.artistName}&nbsp;
                    {sort_data.trackName}
                    {parse(`<p>${sort_data.description}</p>`)}
                    <img src={sort_data.artworkUrl100} alt='bookPic'/>
                    <button onClick={() => {this.favoriteBook(sort_data)}}>Favorite</button>
                    </article>)}
                </fieldset>
            </div>
        )
    }
}

export default Books