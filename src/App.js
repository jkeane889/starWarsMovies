import React, { useState, useEffect } from 'react';
import DropDown from './components/DropDown.js'
import MovieTable from './components/MovieTable.js'
import DetailsList from './components/DetailsList.js'
import Pagination from './components/Pagination.js'
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
  const [selectedCharacter, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);
  const [charDetails, setCharDetails] = useState([]);
  const [currentPoster, setCurrentPoster] = useState(1);
  const [postersPerPage] = useState(1);

  const indexOfLastQuote = currentPoster * postersPerPage;
  const indexOfFirstQuote = indexOfLastQuote - postersPerPage;
  const currentFilm = films.slice(indexOfFirstQuote, indexOfLastQuote);

  // Change page
  const paginate = (pageNumber) => setCurrentPoster(pageNumber);

  // React Hook boolean to determine if character names have loaded
  const [loading, setLoading] = React.useState(true);

  // select current character
  const selectCharacter = (charName) => setCharacter(charName);

  // Async helper function to GET species data
  const getSpeciesData = async(speciesReq) => {
    return await axios.get(speciesReq);
  }

  // Async helper function to GET HomeWorld
  const getHomeWorld = async(planetReq) => {
    return await axios.get(planetReq);
  }

  // Async helper function to GET movies of character
  const getMovieDetails = async(movieRequest) => {
    return await axios.get(movieRequest);
  }

  // useEffect Hook to fetch details of character
  useEffect(() => {
    if (selectedCharacter) {
      let charAPIRequest = 'https://swapi.co/api/people/' + selectedCharacter
      const getCharacterDetails = async() => {
        return await axios.get(charAPIRequest);
      }
  
      try {
        getCharacterDetails()
          .then(res => {
            let charDetails = [];
            let films = [];

            // get details from object and push into temporary character details array
            let name = res.data.name
            let height = res.data.height
            let mass = res.data.mass
            let hairColor = res.data.hair_color
            let skinColor = res.data.skin_color
            let eyeColor = res.data.eye_color
            let birthDay = res.data.birth_year
            let gender = res.data.gender
            charDetails.push(name, height, mass, hairColor, skinColor, eyeColor, birthDay, gender);

            let homeWorld = getHomeWorld(res.data.homeworld);
            let species = getSpeciesData(res.data.species[0])
            let filmRequests = [];
            
            if (res.data.films) {
              for (let i = 0; i < res.data.films.length; i++) {
                filmRequests.push(getMovieDetails(res.data.films[i]))
              }
            }

            if (filmRequests.length) {
              // get names of each movie
              axios.all(filmRequests)
              .then(resArr => {
                console.log("These are the films from API: ", resArr)
                resArr.forEach(movie => {
                  films.push(movie.data.title)
                })
                // Once all movie titles have been captured, push character details and movies into Hook state
                setCharDetails(charDetails);
                setFilms(films);
              })
              .catch(err => {
                console.log(err)
                console.log("Error fetching movies from API")
              })
            }
          })
          .catch(err => {
            console.log(err)
            console.log("Error retrieving details")
          })
      } catch (error) {
        console.log(error)
        console.log("Error retrieving details from the API")
      }
    }
  }, [selectedCharacter])

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
          let names = results.map((item, index) => {
            return { name: item.name, index: index + 1}
          })
          setCharacters(names);
          setLoading(false);
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
        <DropDown 
          loading={loading} 
          selectCharacter={selectCharacter} 
          characters={characters}  
        />
      </div>
      <div className="movie-table">
        <MovieTable film={currentFilm} />
      </div>
      <div className="pagination">
        <Pagination 
          postersPerPage={postersPerPage}
          totalFilms={films.length}
          paginate={paginate} 
        />
      </div>
      <div className="details-list">
        <DetailsList charDetails={charDetails} />
      </div>
    </div>
  );
}

export default App;
