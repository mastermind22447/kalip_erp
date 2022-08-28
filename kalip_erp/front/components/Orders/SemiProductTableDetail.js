import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SelectColor from './SelectColor'
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import SimpleDialog from "components/Common/SimpleDialog"
import CardMedia from '@mui/material/CardMedia'

const Root = styled('div')`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #ddd;
  }
`;

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} placement="top" arrow />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {

    color: 'rgba(255, 255, 255, 0.87)',
    maxWidth: 'none',
    fontSize: 12,
    border: '1px solid #dadde9',
  },
}));


export default function SemiProduct(props) {
  const { order, colorws, values, handleChange, handleSubmit, back, errors, touched, handleBlur, setFieldValue } = props
  const colorPercentHasError = errors.colorPercent && touched.colorPercent
  const [imageOpen, seImageOpen] = React.useState(false);
  const [clickedProduct, setClickedProduct] = React.useState(0);

  const handleClickImageOpen = (product) => () => {
    setClickedProduct(product)
    seImageOpen(true);
  };

  const handleImageClose = (value) => {
    
    seImageOpen(false);
  };

  const onchangeInput = (val, index) => {
    let temp = values.colorPercents;
    temp[index] = val.target.value;
    setFieldValue("colorPercents", temp)
  };

  
  const handleChangeCheckBox = (event) => {
    console.log("ssssss")
    // setChecked([event.target.checked, checked[1]]);
  };

  const handleChecked = (event, subId) => {
    console.log("checked")
    let temp = values.hasSerigrafies;
    console.log(subId)
    console.log(event.target.checked)
    // temp[subId] = newValue;
    // setFieldValue("hasSerigrafies", temp)
  }

  

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="custom table">
        <TableHead>
          <TableRow>
            <TableCell>ARA ÜRÜN ADI</TableCell>
            <TableCell align="right">ARA ÜRÜN KODU</TableCell>
            <TableCell align="right">HAM MADDESİ</TableCell>
            <TableCell align="right">GRAMAJI</TableCell>
            <TableCell align="right">RENK ADI</TableCell>
            <TableCell align="right">RENK KODU</TableCell>
            <TableCell align="right">RENK ORANI</TableCell>
            <TableCell align="right">RENK TEDARİKCİSİ</TableCell>
            <TableCell align="right">ÜRETİM BÖLÜMÜ</TableCell>
            <TableCell align="right">SERİGRAFİ YAPILACAK PARÇA</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.orderProducts.map((subProduct) => (
            <TableRow key={subProduct.id}>
              <TableCell scope="row">{subProduct.product.name}</TableCell>
              <TableCell align="right">{subProduct.product.code}</TableCell>
              <TableCell align="right">
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit">{subProduct.product.material.name}</Typography>
                    </React.Fragment>
                  }
                >
                  <span>{subProduct.product.material.code}</span>
                </HtmlTooltip>
              </TableCell>
              <TableCell align="right">{subProduct.product.materialAmount} {subProduct.product.material.unit.name}</TableCell>
              <TableCell align="right">
                {subProduct.color.name}
              </TableCell>
              <TableCell align="right">{subProduct.color.code}</TableCell>
              <TableCell align="right">{subProduct.colorPercent}%</TableCell>
              <TableCell align="right">{subProduct.colorSupplier.name}</TableCell>
              <TableCell align="right">
              
                {subProduct.product.department.title}
                </TableCell>
              <TableCell align="right">
                {(subProduct.hasSilk) ? 'VAR' : 'YOK'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <SimpleDialog
      open={imageOpen}
      onClose={handleImageClose}
      product={clickedProduct}
  />
    </>
  );
}