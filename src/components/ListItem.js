import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import capFirstLetter from '../Utils/capFirstLetter';
import padZeroes from '../Utils/padZeroes';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  numberID: {
    color: '#D0D0D0'
  },
  name: {
    fontWeight: 700
  }
}));

const ItemContainer= withStyles(theme => ({
  root: {
    border: '1px solid #E8E8E8',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#F8F8F8'
    },
  }
}))(Box);

function ListItem({ data, getPokemonbyName }) {
  const classes = useStyles();
  const { name, url } = data;
  return (
    <ItemContainer key={name} display='flex' border={1} mb={2} padding={3} borderRadius={8} onClick={() => getPokemonbyName(name)}>
      <Box flexGrow={1}>
        <Typography className={classes.name}>{capFirstLetter(name)}</Typography>
      </Box>
      <Typography className={classes.numberID}>{padZeroes(url)}</Typography>
    </ItemContainer>
  );
}

export default ListItem;