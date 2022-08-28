import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles';
import Link from 'next/link'
import Moment from 'react-moment';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import CompanyLink from 'components/Common/ComapnyLink';
import AmountTooltip from 'components/Common/AmountTooltip'

const typesColors = {
  product: '#000000',
  subproduct: '#0ea5e9',
  
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // [`&.${tableCellClasses.head}`]: {
  //   backgroundColor: theme.palette.common.black,
  //   color: theme.palette.common.white,
  // },
  // [`&.${tableCellClasses.body}`]: {
  //   fontSize: 14,
  // },
}));

const StyledTableRow = styled(TableRow)(({ theme, types }) => ({
  
  '&.product:nth-child(4n), &.product:nth-child(4n - 1)' : {
    backgroundColor: theme.palette.action.hover,
  },
  '&.product:nth-child(4n-2), &.product:nth-child(4n-3)': {
    backgroundColor: theme.palette.common.white,
  },
  '&.subproduct:nth-child(even)' : {
    backgroundColor: theme.palette.action.hover,
  },
  '&.subproduct:nth-child(odd)': {
    backgroundColor: theme.palette.common.white,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  [`& th`]: {
    color: theme.palette.common.white,
},
}));

function SubRow({order, open}){
  return (
  <StyledTableRow className=''>
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1, boxShadow: '0 0px 0px 0 rgb(0 0 0 / 7%), 0 4px 7px 0 rgb(0 0 0 / 16%)', padding: '10px', borderRadius: '5px' }}>
          <Typography variant="h6" gutterBottom component="div">
            ARA ÜRÜNLER
          </Typography>
          <Table size="small" aria-label="purchases" style={{width: '90%'}}>
            <TableHead>
              <TableRow>
                <TableCell>KODU	</TableCell>
                <TableCell>ADI</TableCell>
                <TableCell>RENK</TableCell>
                <TableCell align="right">HAM MADDESİ</TableCell>
                <TableCell align="right">BÖLÜMÜ</TableCell>
                <TableCell align="right">SERİGRAFİ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.orderProducts.map((productRow) => (
                <TableRow key={productRow.product.code}>
                  <TableCell component="th" scope="row">
                    {productRow.product.code}
                  </TableCell>
                  <TableCell>{productRow.product.name}</TableCell>
                  <TableCell><ColorLensIcon htmlColor={productRow.color.color} />{productRow.color.name} ({productRow.colorPercent}%)</TableCell>
                  <TableCell align="right">
                    <Tooltip title={productRow.product.material.name} placement="top-start">
                      <span>
                        {productRow.product.material.code} ({productRow.product.materialAmount} {productRow.product.material.unit.name})
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">{productRow.product.department.title}</TableCell>
                  <TableCell align="right">{productRow.hasSilk ? <CheckIcon /> : <CloseIcon />}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  </StyledTableRow>)
}



function Row({order, types}) {
  if(types.indexOf('subproduct') != -1){
    order = order.order
  }
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }} className={types.join(" ")}>
      {types.indexOf("product") != -1 &&
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      }
        <TableCell scope="row">
          <Link href={`/admin/order/detail/${order.id}`} component="a">{order.code}</Link>
        </TableCell>
        {types.indexOf("company") == -1 && <TableCell>{order.statusTitle}</TableCell>}
        {types.indexOf("subproduct") != -1 && <TableCell>Sıra No</TableCell>}
        {types.indexOf("subproduct") != -1 && <TableCell>ACİL</TableCell>}
        <TableCell><Moment format="YYYY/MM/DD">{order.orderAt}</Moment></TableCell>
        <TableCell><Moment format="YYYY/MM/DD">{order.finishedAt}</Moment></TableCell>
        {(order.company && types.indexOf("company") == -1 ) && (
            <TableCell>
              <CompanyLink order={order} />
            </TableCell>
        )}
        <TableCell>{order.product.name}</TableCell>
        <TableCell align="right">{order.product.code}</TableCell>

        <TableCell>
            <AmountTooltip amount={order.orderAmount} finished='10' />
        </TableCell>

        {types.indexOf("subproduct") != -1 && <TableCell>SİPARİŞ İPTAL</TableCell>}
      </StyledTableRow>
      {types.indexOf("product") != -1 &&
        <>
        <SubRow order={order} open={open} />
        
        </>
        }
    </React.Fragment>
  );
}

export default function OrderList({orders, types}) {
  
  return (
    <Grid>
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table"  className={types.join(" ")}>
                <TableHead>
                  <StyledTableRow 
                    types={types} 
                    sx={{
                      backgroundColor: '#000000 !important',
                        ...(types.indexOf("product") != -1 && {
                          backgroundColor: '#334155 !important',
                        }),
                        ...(types.indexOf("subproduct") != -1 && {
                          backgroundColor: '#0ea5e9 !important',
                        }),
                      }}>
                  {types.indexOf("product") != -1 && <StyledTableCell>DETAY</StyledTableCell>}
                      <StyledTableCell>SİP. NO</StyledTableCell>
                  {types.indexOf("company") == -1 && <StyledTableCell>DURUM</StyledTableCell>}
                  {types.indexOf("subproduct") != -1 && <StyledTableCell>Sıra No</StyledTableCell>}
                  {types.indexOf("subproduct") != -1 && <StyledTableCell>ACİL</StyledTableCell>}
                  
                      <StyledTableCell>SİPARİŞ TARİHİ</StyledTableCell>
                      <StyledTableCell>TERMİN</StyledTableCell>
                  {types.indexOf("company") == -1  && <StyledTableCell>FİRMA</StyledTableCell>}
                      <StyledTableCell>ÜRÜN ADI</StyledTableCell>
                      <StyledTableCell align="right">ÜRÜN KODU</StyledTableCell>
                      <StyledTableCell>SİPARİŞ ADEDİ</StyledTableCell>       
                  {types.indexOf("subproduct") != -1 && <StyledTableCell>SİPARİŞ İPTAL</StyledTableCell>}                             
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                      <Row key={order.id} order={order} types={types} />
                  ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Grid>
  );
}

