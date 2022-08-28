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
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DoDisturbOffIcon from '@mui/icons-material/DoDisturbOff';

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

function Row(props) {
  const { product, colorws, values, handleChange, handleSubmit, back, errors, touched, handleBlur, setFieldValue, rowData } = props
  
  const subProduct = (values.view == 'detail') ? rowData.product : rowData;
  const colorPercentHasError = errors.colorPercent && touched.colorPercent

  const [imageOpen, seImageOpen] = React.useState(false);
  const [clickedProduct, setClickedProduct] = React.useState(0);

  const handleClickImageOpen = (product) => () => {
    setClickedProduct(product)
    seImageOpen(true);
  };

  const onchangeInput = (val, index) => {
    let temp = values.colorPercents;
    temp[index] = val.target.value;
    setFieldValue("colorPercents", temp)
  };

  const handleImageClose = (value) => {
    seImageOpen(false);
  };

  return (
    <>
    <React.Fragment>
      <TableRow key={subProduct.id}>
            <TableCell scope="row">{subProduct.name}</TableCell>
            <TableCell align="right">{subProduct.code}</TableCell>
            <TableCell align="right">
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">{subProduct.material.name}</Typography>
                  </React.Fragment>
                }
              >
                <span>{subProduct.material.code}</span>
              </HtmlTooltip>
            </TableCell>
            <TableCell align="right">{subProduct.materialAmount} {subProduct.material.unit.name}</TableCell>
            <TableCell align="right">
              {values.view != 'detail' ? (
              <SelectColor
                subProduct={subProduct}
                colorws={colorws}
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />) : (<>{rowData.color.name}</>) }
            </TableCell>
            <TableCell align="right">
            {values.view != 'detail' ? (<>{values.colorCodes[subProduct.id]}</>) : (<>{rowData.color.code}</>) }</TableCell>
            <TableCell align="right">
            {values.view != 'detail' ? (
              <TextField
                sx={{width: 100}}
                size="small"
                type="number"
                error={colorPercentHasError}
                helperText={colorPercentHasError ? errors.colorPercent : null}
                onBlur={handleBlur}
                variant="outlined"
                // values={values.colorPercent}
                // defaultValue={values.colorPercent}
                onChange={(val) => { onchangeInput(val, subProduct.id) }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />) : (<>{rowData.colorPercent}%</>) }
            </TableCell>
            <TableCell align="right">
            {values.view != 'detail' ? 
              (<>{values.colorSuppliers[subProduct.id] && values.colorSuppliers[subProduct.id].name}</>) : (<>{rowData.colorSupplier.name}</>)}
              </TableCell>
            <TableCell align="right">
            
              {subProduct.department.title}
              </TableCell>
            <TableCell align="right" sx={{position: 'relative'}}>
            {values.view != 'detail' ? (<>
              <Checkbox 
              id={"ch_" + subProduct.id}
                checked={values.hasSerigrafies[subProduct.id]}
                // onChange={han}
                onClick={(event, newValue, reason) => {
                  let temp = values.hasSerigrafies;
                  temp[subProduct.id] = !values.hasSerigrafies[subProduct.id];
                  
                  setFieldValue("hasSerigrafies", temp)
                }}
                inputProps={{ 'aria-label': 'Checkbox demo'  }} />
                {subProduct.imageUrl == null ? "" : (
                <CardMedia component="img" loading="lazy"
                    sx={{height: 200, width: 'auto'}}
                    src={`${process.env.NEXT_SERVER}${subProduct.imageUrl}`}
                    srcSet={`${process.env.NEXT_SERVER}${subProduct.imageUrl} 2x`}
                    alt={subProduct.name}
                    style={{height: '50px', width: 'auto', position: 'absolute', top:2, right: 0}}
                    onClick={handleClickImageOpen(subProduct)}
                />)}
                </>) : (<>{rowData.hasSilk ? <CheckBoxIcon sx={{color: '#28a745'}} /> : <DoDisturbOffIcon sx={{color: '#dc3545'}} />}</>)}
            </TableCell>
          </TableRow>
    </React.Fragment>
        <SimpleDialog
        open={imageOpen}
        onClose={handleImageClose}
        product={clickedProduct}
    /></>
  )
}



export default function SemiProductTable(props) {
  const { product, colorws, values, handleChange, handleSubmit, back, errors, touched, handleBlur, setFieldValue, order } = props
  const [subProducts, setSubProducts] = React.useState(0)
  
  let data = (product == null) ? order.orderProducts : product.productSet

  const handleImageClose = (value) => {
    
    seImageOpen(false);
  };

  const handleChangeCheckBox = (event) => {
    console.log("ssssss")
    // setChecked([event.target.checked, checked[1]]);
  };

  const handleChecked = (event, subId) => {
    let temp = values.hasSerigrafies;
    // temp[subId] = newValue;
    // setFieldValue("hasSerigrafies", temp)
  }

  
  return (
    <>
    <Typography variant="h5" gutterBottom component="div">
      {data.length > 0 ? 'REÇETELİ ÜRÜN' : 'REÇETESİZ ÜRÜN'}
    </Typography>
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
          {data.length > 0 ? (
            data.map((subProduct) => (
              <Row 
                  key={subProduct.id} 
                  products={product}
                  colorws={colorws}
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  rowData={subProduct}
                  />
            ))
          ) : (<Row 
                key={product.id} 
                products={product}
                colorws={colorws}
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                rowData={product}
            />) }
        </TableBody>
      </Table>
    </TableContainer>
    
    </>
  );
}