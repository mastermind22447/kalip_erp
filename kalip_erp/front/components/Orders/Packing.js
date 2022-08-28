import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { gql, useQuery } from "@apollo/client";
import LoadingComponent from "components/LoadingComponent";
import ErrorComponent from "components/ErrorComponent";
import * as Yup from 'yup';
import { Formik, getIn } from 'formik';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import trLocale from 'date-fns/locale/tr'
import Button from '@mui/material/Button'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/TimePicker';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import SemiProductTable from './SemiProductTable';
import ComMaterialTable from './ComMaterialTable'
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from "styled-components";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DoDisturbOffIcon from '@mui/icons-material/DoDisturbOff';

export default function Packing(props){
    const { commts, values, handleChange, handleSubmit, back, errors, touched, handleBlur, setFieldValue, order } = props
    const type = (order != null) ? 'detail' : 'input';
    if (type == 'detail'){
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Table sx={{ wisth: '100%' }} aria-label="custom table">
                        <TableRow hover>
                            <td>Koli Ölçüsü:</td>
                            <td align="right">
                                <TextField
                                    error={Boolean(touched.box_size && errors.box_size)}
                                    fullWidth
                                    required
                                    helperText={touched.box_size && errors.box_size}
                                    name="box_size"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    value={values.box_size}
                                    variant="outlined"
                                    size='small'
                                    className={type == 'detail' ? "as_label" : ""}
                                    disabled={type == 'detail'}
                                />
                                
                            </td>
                        </TableRow>
                        <TableRow hover>
                            <td>İç Koli Ölçüsü:</td>
                            <td align="right">
                                <TextField
                                    error={Boolean(touched.inner_box_size && errors.inner_box_size)}
                                    fullWidth
                                    required
                                    helperText={touched.inner_box_size && errors.inner_box_size}
                                    name="inner_box_size"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    value={values.inner_box_size}
                                    variant="outlined"
                                    size='small'
                                    className={type == 'detail' ? "as_label" : ""}
                                    disabled={type == 'detail'}
                                />
                            </td>
                        </TableRow>

                        <TableRow hover>
                            <td>Özel Koli:</td>
                            <td align="right">
                            {type == 'detail' ? order.seperator ? <CheckBoxIcon sx={{color: '#28a745'}} /> : <DoDisturbOffIcon sx={{color: '#dc3545'}} /> : 
                                <Checkbox
                                    fullWidth
                                    checked={values.special_box}
                                    name="special_box"
                                    onClick={() => {
                                        setFieldValue("special_box", !values.special_box)
                                    }}
                                    className={type == 'detail' ? "as_label" : ""}
                                    disabled={type == 'detail'}
                                />
                            }
                            </td>
                        </TableRow>

                        <TableRow hover>
                            <td>Koli İçi Adet:</td>
                            <td align="right">
                                <TextField
                                    error={Boolean(touched.inner_box_amount && errors.inner_box_amount)}
                                    fullWidth
                                    required
                                    helperText={touched.inner_box_amount && errors.inner_box_amount}
                                    name="inner_box_amount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    value={values.inner_box_amount}
                                    variant="outlined"
                                    size='small'
                                    className={type == 'detail' ? "as_label" : ""}
                                    disabled={type == 'detail'}
                                />
                            </td>
                        </TableRow>

                        <TableRow hover>
                            <td>Koli İçi Poşet:</td>
                            <td align="right">
                            {type == 'detail' ? order.seperator ? <CheckBoxIcon sx={{color: '#28a745'}} /> : <DoDisturbOffIcon sx={{color: '#dc3545'}} /> : 
                                <Checkbox
                                    fullWidth
                                    checked={values.has_box_bag}
                                    name="has_box_bag"
                                    onClick={() => {
                                        setFieldValue("has_box_bag", !values.has_box_bag)
                                    }}
                                    className={type == 'detail' ? "as_label" : ""}
                                    disabled={type == 'detail'}
                                />
                                }
                            </td>
                        </TableRow>
                    
                        <TableRow hover>
                            <td>Ürün Poşeti:</td>
                            <td align="right">
                                {type != 'detail' ? (
                                <Autocomplete
                                    id="box_bag"
                                    options={commts}
                                    getOptionLabel={(option) => option.comMaterial.name}
                                    onChange={(e, value) => setFieldValue("box_bag", value?.id || "")}
                                    onOpen={handleBlur}
                                    includeInputInList
                                    size='small'
                                    
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={Boolean(touched.box_bag && errors.box_bag)}
                                            fullWidth
                                            helperText={touched.box_bag && errors.box_bag}
                                            name="box_bag"
                                            variant="outlined"
                                        />
                                    )}
                                />
                                ) : order.bag.name }
                            </td>
                        </TableRow>
                    </Table>
                </Grid>

                <Grid item xs={6}>
                    <Table sx={{ wisth: '100%' }} aria-label="custom table">
                        <TableRow hover>
                            <td>Seperatör:</td>
                            <td align="right">
                                {type == 'detail' ? order.seperator ? <CheckBoxIcon sx={{color: '#28a745'}} /> : <DoDisturbOffIcon sx={{color: '#dc3545'}} /> : 
                                <Checkbox
                                    fullWidth
                                    checked={values.seperator}
                                    name="seperator"
                                    onClick={() => {
                                        setFieldValue("seperator", !values.seperator)
                                    }}
                                    className={type == 'detail' ? "as_label" : ""}
                                    disabled={type == 'detail'}
                                />}
                           
                            </td>
                        </TableRow>
                        <TableRow hover>
                            <td>Barkod:</td>
                            <td align="right">
                                <TextField
                                    error={Boolean(touched.barcode && errors.barcode)}
                                    fullWidth
                                    required
                                    helperText={touched.barcode && errors.barcode}
                                    name="barcode"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    value={values.barcode}
                                    variant="outlined"
                                    size='small'
                                    className={type == 'detail' ? "as_label" : ""}
                                    disabled={type == 'detail'}
                                />
                            </td>
                        </TableRow>

                        <TableRow hover>
                            <td>Koli Üst Etiketi:</td>
                            <td align="right">
                                <TextField
                                    error={Boolean(touched.top_label && errors.top_label)}
                                    fullWidth
                                    required
                                    helperText={touched.top_label && errors.top_label}
                                    name="top_label"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    value={values.top_label}
                                    variant="outlined"
                                    size='small'
                                    className={type == 'detail' ? "as_label" : ""}
                                    disabled={type == 'detail'}
                                />
                            </td>
                        </TableRow>
                    </Table>
                </Grid>
            </Grid>
            
        </Container>
    )
}

const Container = styled.div`
    div.as_label{
        border: 0px;
    }

    div.as_label input{
        --tw-shadow: none;
        box-shadow: none;
    }

    div.as_label fieldset{
        border: none;
    }

`