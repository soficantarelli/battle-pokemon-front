import React, { useState } from'react';
import { Card, CardContent, CardMedia, Grid } from'@mui/material';
import axios from 'axios';

function PokemonCard({ pokemon, onClick, selected }) {
    return (
    <Card onClick={onClick} sx={{
        border: selected ? '3px solid #759fff' : '1pxsolid #ddd',
        backgroundColor: selected ? '#F0F8FF' : 'white',
        borderRadius: '8px',
        boxShadow: '02px8pxrgba(0, 0, 0, 0.1)',
        padding: '16px',
        width: '150px',
        transition: 'transform0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        height: '120px', 
    }}
    >
    <CardMedia
        component="img"
        sx={{
        width: '95px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        }}
        image={pokemon.imageUrl}
        alt={pokemon.name}
        />
    <CardContent
    sx={{
     display: 'flex',
     flexDirection: 'column',
     flexGrow: 1,
     padding: '0'}}    
    ><p>{pokemon.name}</p></CardContent>
    </Card>
    );
}

function PokemonList({ pokemonList, setSelectedPokemon, setOpponent, resetGame, selectedPokemon }) {
    const handlePokemonClick = async (pokemon) => {
        resetGame();
        setSelectedPokemon(pokemon);
        await fetchRandomOpponent(pokemon.id);
    };


    const fetchRandomOpponent = async (challengerId) => {
        try {
        const response = await axios.get(`http://localhost:4000/api/v1/battle-pokemon/pokemon/random-opponent/${challengerId}`);
        setOpponent(response.data);
        } catch (error) {
        console.error('Error fetching opponent:', error);
        }
    };

    return (
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} >
        {pokemonList.map(pokemon => (
            <Grid item key={pokemon.name} xs={12} sm={6} md={4} lg={2}>
                <PokemonCard 
                    pokemon={pokemon} 
                    onClick={() => handlePokemonClick(pokemon)}
                    selected={selectedPokemon === pokemon}
                />
            </Grid>
        ))}
    </Grid>
    );
  }
  
export default PokemonList;