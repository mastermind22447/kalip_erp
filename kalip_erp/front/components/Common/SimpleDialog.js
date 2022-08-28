import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

import CardMedia from '@mui/material/CardMedia'

const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function SimpleDialog(props) {
  const { onClose, open, product } = props;

  const handleClose = (value) => {
    onClose(value);
  };
  

  return (
    <Dialog onClose={handleClose} open={open}>
      {product && (
        <>
        <DialogTitle>{product.name}</DialogTitle>
        <CardMedia component="img" loading="lazy"
            sx={{height: 'auto', maxWidth: '700px', maxHeight: '600px'}}
            src={`${process.env.NEXT_SERVER}${product.imageUrl}`}
            srcSet={`${process.env.NEXT_SERVER}${product.imageUrl} 2x`}
            alt={product.name}
            style={{}}
        />
      </>
      )}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  
};