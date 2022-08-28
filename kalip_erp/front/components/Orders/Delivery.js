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
import { DateTime } from '@mui/x-date-pickers/DateTimePicker';
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


export default function Packing(props){
    const { values, handleChange, handleSubmit, back, errors, touched, handleBlur, setFieldValue } = props
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Table sx={{ width: '100%' }} aria-label="custom table" className="vert">
                        <TableRow hover>
                            <TableCell sx={{width: '25%'}}>SEVK ADRESİ:</TableCell>
                            <td align="right">
                                <TextField
                                    error={Boolean(touched.delivery_address && errors.delivery_address)}
                                    fullWidth
                                    required
                                    helperText={touched.delivery_address && errors.delivery_address}
                                    name="delivery_address"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    value={values.delivery_address}
                                    variant="outlined"
                                    size='small'
                                    className={values.view == 'detail' ? "as_label" : ""}
                                    disabled={values.view == 'detail'}
                                />
                            </td>
                        </TableRow>

                        <TableRow hover>
                            <td>SEV ŞEKLİ:</td>
                            <td align="right">
                                <TextField
                                    error={Boolean(touched.delivery_type && errors.delivery_type)}
                                    fullWidth
                                    required
                                    helperText={touched.delivery_type && errors.delivery_type}
                                    name="delivery_type"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    value={values.delivery_type}
                                    variant="outlined"
                                    size='small'
                                    className={values.view == 'detail' ? "as_label" : ""}
                                    disabled={values.view == 'detail'}
                                />
                            </td>
                        </TableRow>

                        <TableRow hover>
                            <td>FİRMANIN KABUL ŞARTLARI:</td>
                            <td align="right">
                                <TextField
                                    error={Boolean(touched.delivery_conds && errors.delivery_conds)}
                                    fullWidth
                                    required
                                    helperText={touched.delivery_conds && errors.delivery_conds}
                                    name="delivery_conds"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    value={values.delivery_conds}
                                    variant="outlined"
                                    size='small'
                                    className={values.view == 'detail' ? "as_label" : ""}
                                    disabled={values.view == 'detail'}
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