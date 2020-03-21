import React from 'react'
import empirestrikes from '../assets/empirestrikesback.jpg';
import clonewars from '../assets/clonewars.jpeg'
import forceawakens from '../assets/forceawakens.jpg';
// import lastjedi from '../assets/lastjedi.jpg';
import newhope from '../assets/newhope.jpg';
import phantom from '../assets/phantommenace.jpg';
import returnjedi from '../assets/returnofthejedi.jpg';
import revengeofthesith from '../assets/revengeofthesith.jpg';
// import rise from '../assets/riseofskywalker.jpg';
// import rogueone from '../assets/rogueone.jpg';
// import solo from '../assets/solo.jpg';

/*
    To practice pagination, only show single movie picture and then have options
    to walk through other movie images
*/

const MovieTable = props => {
    console.log("This is the film: ", props.film[0])
    let poster = null;

    switch (props.film[0]) {
        case "The Empire Strikes Back":
            poster = empirestrikes
            break;
        case "Attack of the Clones":
            poster = clonewars
            break;
        case "The Phantom Menace":
            poster = phantom
            break;
        case "Revenge of the Sith":
            poster = revengeofthesith
            break;
        case "Return of the Jedi":
            poster = returnjedi
            break;
        case "A New Hope":
            poster = newhope
            break;
        case "The Force Awakens":
            poster = forceawakens
            break;
        default:
            poster = newhope
    }

    return (
        <div>
            <img className="poster" src={poster}/>
        </div>
    )
}

export default MovieTable;