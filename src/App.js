import React, { useState, useEffect } from 'react';
import DropDown from './components/DropDown.js'
import MovieTable from './components/MovieTable.js'
import DetailsList from './components/DetailsList.js'
import './App.css';
import axios from 'axios';

/*
  Components:
    1. Star Wars Drop down menu for selecting characters from movies
    2. List component underneath drop down menu for character details
    3. Table component to display movies of character

*/

/*
  Functionality:
    1. Initial GET request - get all character names to display as options for drop down selection

      - Create "componentDidMount" functionality with React Hooks to load all names of characters
        and then pass down character names to DropDown component

      - Create hook to hold selectedCharacter and pass this down to DropDown component as well
         ---> will then create another useEffect hook to trigger the 2nd GET function below

    2. On selection of character, GET request for details of character and movies they have been in

*/

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setCharacter] = useState('');
  const [films, setFilms] = useState([]);
  const [charDetails, setCharDetails] = useState([]);

  const selectCharacter = (charName) => {
    setCharacter(charName)
  }

  // Empty array being passed to useEffect works similar to componentDidMount and will only fire once
  useEffect(() => {
    const getCharacters = async() => {
      return await axios.get('https://swapi.co/api/people');
    }

    try {
      getCharacters()
        .then(res => {
          // console.log("This is the data: ", res.data.results)
          let results = res.data.results;
          // console.log("these are the results", results)
          let names = results.map(item => {
            return item.name
          })
          setCharacters(names);
        })
        .catch(err => console.log(err)
        )
    } catch (error) {
      console.log(error)
      console.log("Error retrieving characters from API")
    }
  }, [])

  return (
    <div className="App">
      <div className="drop-down">
        <DropDown selectCharacter={selectCharacter} characters={characters}/>
      </div>
      <div className="movie-table">
        <MovieTable />
      </div>
      <div className="details-list">
        <DetailsList />
      </div>
    </div>
  );
}

export default App;
