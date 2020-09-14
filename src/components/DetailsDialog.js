import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import capFirstLetter from '../Utils/capFirstLetter';
import { makeStyles } from '@material-ui/core/styles';
import PageButton from './PageButton';

const useStyles = makeStyles(theme => ({
  dailogueContainer: {
    border: '1px solid #E8E8E8'
  },
  numberID: {
    color: '#D0D0D0',
  },
  name: {
    fontWeight: 800,
    fontSize: 20
  },
  profileImg: {
    width: 68,
    marginTop: -20,
    marginLeft: -12
  },
  stat: {
    color: '#808080',
    fontWeight: 700,
    marginBottom: theme.spacing(2)
  }
}));

function DetailsDialog({ data, showPokemonProfile, closeDialog }) {
  const classes = useStyles();
  const { name, stats, base_experience, weight, types, id } = data;
  if (!showPokemonProfile) return null;

  let typesText = [];
  types.forEach(item => typesText.push(capFirstLetter(item.type.name)));
  
  const profileStats = [
    `HP: ${base_experience}`,
    `Attack: ${stats[1].base_stat}`,
    `Defense: ${stats[2].base_stat}`,
    `Speed: ${stats[2].base_stat}`,
    `Type: ${typesText.join(', ')}`,
    `Weight: ${weight} kg`,
  ];

  return (
    <Box className={classes.dailogueContainer} border={1} mb={2} padding={4} borderRadius={16}>
      <Box display='flex' mb={4}>
        <Box display='flex' flexGrow={1}>
          <img className={classes.profileImg} src={data.sprites.front_default} alt='pokemon profile' />
          <Typography className={classes.name}>{capFirstLetter(name)}</Typography>
        </Box>
        <Typography className={classes.numberID}>
          {id.toString().padStart(3, '0')}
        </Typography>
      </Box>
      {profileStats.map(stat => <Typography key={stat.name} className={classes.stat}>{stat}</Typography>)}
      <Box display='flex' justifyContent='flex-end' mt={15}>
          <PageButton name={'Close'} callback={closeDialog} />
        </Box>
    </Box>
  );
}

export default DetailsDialog;