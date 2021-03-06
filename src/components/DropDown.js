import React, { useState } from 'react'
import starwars from '../assets/1280px-Star_Wars_Logo.svg.png';
import './DropDown.css'

const DropDown = props => {

    /*
        On selection of input box, create a drop down
        list of all Star Wars characters for the user to choose from

        When user selects a particular Star Wars character, send character
        name back up to App.js to then trigger the GET request for character's details
        and list of character's movies

    */

    // Value to store selection from user input
    const [value, setValue] = useState('');

    const setCharacterValue = event => {
        if (event.key === 'Enter') {
            props.selectCharacter(value)
            setValue('')
        }
    }

    return (
        <div className="drop-down-grid">
            <img className="star-wars-img" src={starwars}/>
            <input 
                value={value} 
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => props.selectCharacter(e)}
            />
            <label>Select a Character:</label>
            <select 
                className="drop-down-items"
                disabled={props.loading} 
                value={props.characters}
                onChange={(e) => {
                    props.selectCharacter(e.currentTarget.value)
                }}
            >
            {props.characters.map(character => (
                <option
                    key={character.index}
                    value={character.index}
                >
                {character.name}
                </option>
            ))}
            </select>
        </div>
    )
}

export default DropDown;