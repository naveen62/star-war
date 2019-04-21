import React from 'react';
import axios from 'axios';

class Character extends React.Component {
    state = {
        homeworld:false,
        starshipe:false
    }
    componentDidMount() {
        const homeworld = this.props.homeworld;
        axios.get(homeworld).then((res) => {
            this.setState({homeworld: res.data.name});
        })
        if(this.props.starships.length > 0) {
            const ships = [];
            const httpShips = []
            this.props.starships.forEach((starshipe) => {
                httpShips.push(axios.get(starshipe));
            })
            axios.all(httpShips).then((res) => {
                res.forEach((r) => {
                    ships.push(r.data.name);
                })
                this.setState({starshipe: [...ships].join()})
            }).catch((err) => {
                console.log(err)
            })
        } else {
            this.setState({starshipe: 'No starshipe'})
        }
    }
    render() {
        return(
        <div className='character'>
            <div className="character_name">{this.props.name}</div>
            <div className="character_homeland">
            Homeworld: {this.state.homeworld ? this.state.homeworld : <span>Loading...<i class="fas fa-spinner spin"></i></span> }
            </div>
            <div className="character_starship">
            Starship: {this.state.starshipe ?
            this.state.starshipe.length < 20 ? this.state.starshipe : this.state.starshipe.substr(0,18) + '...' : 
            <span>Loading...<i class="fas fa-spinner spin"></i></span>}
            </div>
            <div className="character_films">Films: {this.props.films.length}</div>
        </div>
        )
    }
}

export default Character;