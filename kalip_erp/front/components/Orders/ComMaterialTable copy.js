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


export default function ComMaterialTable(props) {
  const { values, handleChange, handleSubmit, back, errors, touched, handleBlur, setFieldValue, order } = props
  const colorPercentHasError = errors.colorPercent && touched.colorPercent
  
  const rowData = (values.view == 'detail') ? order.ordercommaterialSet : values.product;
  
  return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>ADI</TableCell>
              <TableCell>KODU</TableCell>
              <TableCell>ÜRÜNDE KULLANILAN ADET</TableCell>
              {(values.view != 'detail') && (
                <TableCell>VAR/YOK</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rowData.map((value) => (
              <TableRow key={value.id}>
                <TableCell scope="row">{value.comMaterial.name}</TableCell>
                <TableCell align="left">{value.comMaterial.code}</TableCell>
                <TableCell align="left">{value.comMaterialAmount} {value.comMaterial.unit.name}</TableCell>
                {(values.view != 'detail') && (
                <TableCell align="left">
                  <Checkbox 
                  id={"ch_" + value.id}
                    checked={values.hasComMaterials[value.id]}
                    // onChange={han}
                    onClick={(event, newValue, reason) => {
                      let temp = values.hasComMaterials;
                      temp[value.id] = !values.hasComMaterials[value.id];
                      setFieldValue("hasComMaterials", temp)
                    }}
                    inputProps={{ 'aria-label': 'Checkbox demo'  }} />
                </TableCell>)}
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
  );
}