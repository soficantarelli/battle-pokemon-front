import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import PokemonList from './PokemonList';
import PokemonWinner from './PokemonWinner';
import { Typography } from '@mui/material';
import PokemonFinish from './PokemonFinish';

const PokemonBattle = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [selectedOpponent, setSelectedOpponent] = useState(null);
    const [winner, setWinner] = useState('');


  const resetGame = () => {
    setSelectedPokemon(null);
    setSelectedOpponent(null);
    setWinner('');
  };

    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/battle-pokemon/pokemon')
            .then(response => {
                setPokemonList(response.data);
            })
            .catch(error => {
                console.error('Error fetching the pokemon list:', error);
            });
    }, []);

    const handleWinnerUpdate = (newWinner) => {
        setWinner(newWinner);
      };

    return (
        <Container maxWidth="lg" sx={{ 
            margin: { xs: '3% 7%', sm: '3% 12%' } 
          }} >
            <Typography variant="h4" component="h1" gutterBottom>
                Battle of Pokemon
            </Typography>
            <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
                Select your pokemon
            </Typography>
            <PokemonList pokemonList={pokemonList} setSelectedPokemon={setSelectedPokemon} setOpponent={setSelectedOpponent} resetGame={resetGame} selectedPokemon={selectedPokemon}/>
            {selectedPokemon && selectedOpponent && (
            <PokemonWinner pokemon={selectedPokemon} opponent={selectedOpponent} winner={winner} updateWinner={handleWinnerUpdate}/>
            )}
            {selectedPokemon && !selectedOpponent && (
            <PokemonFinish/>
            )}
        </Container>
    );
};



export default PokemonBattle;