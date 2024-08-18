import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';

const PokemonFinish = () => {  
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
          {'Already fight with everyone!'}
        </Typography>
      </Paper>
    </Grid>
    </Grid>

  );
};

export default PokemonFinish;
