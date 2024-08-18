import React, { useState } from 'react';
import { Paper, Typography, LinearProgress, Button, Grid, CardMedia } from '@mui/material';
import axios from 'axios';

const PokemonCard = ({ name, image, stats }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: '16px',
        borderRadius: '8px',
        minWidth: '250px',
      }}
    >
      <CardMedia
            component="img"
            height="170"
            image={image}
            alt={name}
            sx={{ objectFit: 'contain' }}
          />
          <Typography
          variant="h5"
          gutterBottom
          sx={{
            textAlign: 'left',
            borderBottom: '0.3px solid #000',
            paddingBottom: '4px',
          }}
        >
        {name}
      </Typography>
      {Object.keys(stats).map((key) => (
        <div key={key} style={{ marginBottom: '8px' }}>
          <Typography variant="body2" sx={{ textAlign: 'left' }}>{key}</Typography>
          <LinearProgress
            variant="determinate"
            value={stats[key]}
            sx={{
              height: '8px',
              borderRadius: '4px',
              backgroundColor: '#E0E0E0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#26f920',
              },
            }}
          />
        </div>
      ))}
      
    </Paper>
  );
};

const PokemonWinner = ({ pokemon, opponent, winner, updateWinner }) => {  
  const handleStartBattle = async (pokemon, opponent) => {
    const body = {
      challenger_id: pokemon, 
      opponent_id: opponent
    }
    await fetchWinner(body);
  };

  const fetchWinner = async (body) => {
    try {
    const response = await axios.post(`http://localhost:4000/api/v1/battle-pokemon/battles/`, body);
    updateWinner(`${response.data} wins!`);
    } catch (error) {
    console.error('Error fetching opponent:', error);
    }
  };

  return (
<Grid container>
    <Grid item xs={10} sm={10} md={10} lg={10} sx={{ marginBottom: '30px', marginTop: '30px' }}>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: '#E0F7FA',
          padding: { xs: '8px', sm: '16px' },
          borderRadius: '4px',
          borderColor: '#000000',
          border: '1px solid #000000'
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: '#000000', fontFamily: 'Roboto', ml: 2 }}
        >
          {winner || 'Start the battle to see who wins!'}
        </Typography>
      </Paper>
    </Grid>

    <Grid container spacing={2} alignItems="center">
      <Grid item xs={10} sm={4}>
        <PokemonCard
          name={pokemon.name}
          image={pokemon.imageUrl}
          stats={{ HP: pokemon.hp, Attack: pokemon.attack, Defense: pokemon.defense, Speed: pokemon.speed }}
        />
      </Grid>
      
      <Grid item xs={10} sm={2} container justifyContent="center" alignItems="center">
        <Button
          variant="contained"
          onClick={() => handleStartBattle(pokemon.id, opponent.id)}
          sx={{
            backgroundColor: '#186d05',
            color: '#FFFFFF',
            padding: '8px 16px',
            fontSize: '16px',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#388E3C',
            },
          }}
        >
          Start Battle
        </Button>
      </Grid>

      <Grid item xs={10} sm={4}>
        <PokemonCard
          name={opponent.name}
          image={opponent.imageUrl}
          stats={{ HP: opponent.hp, Attack: opponent.attack, Defense: opponent.defense, Speed: opponent.speed }}
        />
      </Grid>
    </Grid>
  </Grid>

  );
};

export default PokemonWinner;
