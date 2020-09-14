import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import ListItem from './components/ListItem';
import PageButton from './components/PageButton';
import DetailsDialogue from './components/DetailsDialogue';

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

function App() {
  const [pokemonResults, setPokemonResults] = useState([]);
  const [previousUrl, setPreviousUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [showPokemonProfile, setShowPokemonProfile] = useState(false);

  useEffect(() => {
    var interval = {
      limit: 5,
      offset: 0
    }
    P.getPokemonsList(interval)
      .then(response => {
        setPokemonResults(response.results);
        setPreviousUrl(response.previous);
        setNextUrl(response.next);
      })
      .catch(error => {
        console.log(error);
      });
  }, [])

  const pagePagination = (url) => {
    if (!url) return;
    P.resource(url)
    .then(response => {
      setPokemonResults(response.results);
      setPreviousUrl(response.previous);
      setNextUrl(response.next);
    })
    .catch(error => {
      console.log(error);
    });
  }


  const getPokemonbyName = (name) => {
    P.getPokemonByName(name)
    .then(response => {
      setPokemonInfo(response);
      setShowPokemonProfile(true);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const closeDialogue = () => {
    setShowPokemonProfile(false);
  }

  const renderListOrDialogue = () => {
    if (showPokemonProfile) {
      return <DetailsDialogue data={pokemonInfo} showPokemonProfile={showPokemonProfile} closeDialogue={closeDialogue}/>;
    } else {
      return (
        <div>
          {pokemonResults.map(pokemonData => 
          <ListItem key={pokemonData.name} data={pokemonData} getPokemonbyName={getPokemonbyName} />)}
          <Box display='flex'>
            <Box flexGrow={1}>
              <PageButton callback={pagePagination} url={previousUrl} name={'Prev'} />
            </Box>
            <Box>
              <PageButton callback={pagePagination} url={nextUrl} name={'Next'} />
            </Box>
          </Box>
        </div>
      );
    }
  }
  
  return (
    <Container maxWidth="sm">
      <Box display='flex' justifyContent='center' mb={4} mt={4}>
        <Typography variant='h4'>Pokemon Index</Typography>
      </Box>
      {renderListOrDialogue()}
    </Container>
  );
}

export default App;
