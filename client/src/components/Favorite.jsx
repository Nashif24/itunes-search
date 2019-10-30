import React from 'react';
import parse from 'html-react-parser';

//this is a class component
class Favorite extends React.Component {
    constructor(){
        super()
        this.state = {
            songFav: [],
            booksLike: []
        }
    }
//this is a function used to fetch the information of the favorites music json file.
    componentDidMount(){
        fetch('/favoritesMusic')
            .then(res => res.json())
            .then(music => this.setState({songFav: music}))

            fetch('/favoritesBooks')
            .then(res => res.json())
            .then(books => this.setState({booksLike: books}))
    }
//this is another function used to remove any favorite song the user wants
    songRemove = (i) => {
        let songDeleteFromFav = {
            deleted: i.id
        }
        //this fetches the updated data of the user removed favorites
        fetch('/favoritesMusic', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(songDeleteFromFav)
        })
        document.location.reload()//this reloads the page when the user removes a favorite
    }
//this is the function used to remove any favorite book the user wants
    bookRemove = (i) => {
        let bookRemovedFromFav = {
            deleted: i.id
        }
        //this fetches the updated data from the user's removed favorites
        fetch('/favoritesBooks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookRemovedFromFav)
        })
        document.location.reload()
    }
    render(){
        return(
            <div>
                <fieldset>
            {/*this fieldset is the information of any song the user chooses to favorite*/}
                    {this.state.songFav.map(favM => <article key={favM.trackId}> <p>{favM.artist}</p> <p>{favM.trackId}</p>
                        <img src={favM.artwork} alt='artwork'/><br/>
                        <audio controls><source src={favM.sample}/></audio>
                        <p>{favM.track}</p>
                    {/*this is the button that causes the remove to happen upon clicking on it*/}
                        <button onClick={() => {this.songRemove(favM)}}>Remove</button>

                    </article>)}
                </fieldset>
                <fieldset>
            {/*this fieldset is used to display the information of any book the user chooses to favorite*/}
                    {this.state.booksLike.map(favB => <article key={favB.artwork}><p>{favB.artist}</p>
                        <img src={favB.artwork} alt='artwork'/><br/>
                        {parse(`<p>${favB.description}</p>`)}
                        <p>{favB.track}</p>
                        <button onClick={() => {this.bookRemove(favB)}}>Remove</button>

                    </article>)}
                </fieldset>
            </div>
        )
    }
}

export default Favorite