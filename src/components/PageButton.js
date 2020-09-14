import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const DefaultButton = withStyles(theme => ({
  root: {
    borderRadius: 30,
    backgroundColor: '#FFC15B',
    width: 100,
    '&:hover' : {
      backgroundColor: '#ffa105'
    }
  }
}))(Button);

function PageButton({url, name, callback}) {
  return <DefaultButton onClick={(() => callback(url))}>{name}</DefaultButton>;
}

export default PageButton;