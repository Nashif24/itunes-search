import React from 'react';
//this is the class component
class Music extends React.Component{
    constructor(){
        super()
        this.state ={
            data: [],
            musicInput: ''
        }
    }
    //this the function used to fetch the information
    newSearch(){
        fetch('/music')
            .then(res => res.json())
            .then(data => this.setState({data}))
    }
    //this is an async/await function used fetch the information and search any song the user chooses
    musicSearch = async () => {
        let search = this.state.musicInput.split(' ').join('+')
        const getMusic = await fetch(`/music?search=${search}&type=${this.state.type}`)
        let res = await getMusic.json()
        this.setState({
            data: res
        })
    }
//this is the function used to get the information to be displayed on the favorites page
    favoriteMusic= (i) => {
        let favPic = {
            id: i.trackId,
            artist: i.artistName,
            artwork: i.artworkUrl100,
            track: i.trackName,
            sample: i.previewUrl
        }
        //this fetches the information that the user favorited to be displayed on the favorites page 
        fetch('/favoritesMusic', {
            method: 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(favPic)
        })
        alert('Added Your Song To Favorites')//this is an alert to show the user that a song was added to favorites
    }
    render(){
        return (
            <div>
        {/*this is the heading for the itunes */}
                <h1>Itunes</h1>
            {/*this is the input field for the user to search any song the user wants*/}
                <input type="text" onChange={(e) => this.setState({musicInput: e.target.value})}/>
            {/*this is the search button used to search the song of the user's choosing*/}
                <button onClick={() => this.musicSearch()}>Search</button>

                <fieldset>
            {/*this is the fieldset used to display the data on the page*/}
                    {this.state.data.map(sort_data => <article key={sort_data.trackId}>{sort_data.artistName}<br/>
                    {sort_data.trackName}<br/><img src={sort_data.artworkUrl100} alt={sort_data.trackId}/>
                    {console.log(sort_data)}<br/><audio controls><source src={sort_data.previewUrl}type='audio/mpeg'></source></audio>
                    <button onClick={() =>this.favoriteMusic(sort_data)}>Favorite</button>
                    </article>)}
                </fieldset>
            </div>
        )
    }
}

export default Music