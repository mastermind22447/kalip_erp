import * as React from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';


const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(14),
      border: '1px solid #dadde9',
    },
    [`& ul li`]: {
        marginLeft: '0px',
        paddingLeft: '0px',
        textTransform: 'capitalize',
        display: 'flex',
        borderBottom: '1px solid #CCC'
    },
    [`& ul`]: {
        marginLeft: '0px',
        paddingLeft: '0px',
        listStyle: 'none',
    },
    [`& ul li label`]: {
        width: '150px',
        display: 'block',
    },
    [`& ul li:last-child`]: {
        border: 'none'
    }
    
  }));

function Detail({amount, finished}){
    return (
        <Grid>
            <ul sx={{paddingLeft: '0px'}}>
                <li><label>Sipariş Adedi:</label> {amount}</li>
                <li><label>Kalan Adet:</label> {amount - finished}</li>
                <li><label>Sevk Edilen Adet:</label> {finished}</li>
            </ul>
        </Grid>
        )
}

export default function AmountTootlip({amount, finished}){
    return (
        <HtmlTooltip title={<Detail amount={amount} finished={finished} />} placement="top-start" style={{color: '#006a91'}}>
            <span>{finished} / {amount}</span>
        </HtmlTooltip>
      
    )
  }