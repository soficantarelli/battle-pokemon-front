import React from 'react';
import PokemonBattle from './components/PokemonBattle';
import { Box } from '@mui/material';

function App() {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <PokemonBattle/>
    </Box>
  );
}

export default App;
