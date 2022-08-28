import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { gql, useQuery, useMutation } from "@apollo/client";
import LoadingComponent from "components/LoadingComponent";
import ErrorComponent from "components/ErrorComponent";
import SimpleDialog from "components/Common/SimpleDialog"
import * as Yup from 'yup';
import { Formik, getIn } from 'formik';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import trLocale from 'date-fns/locale/tr'
import Button from '@mui/material/Button'

import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

import CardMedia from '@mui/material/CardMedia'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import SemiProductTable from './SemiProductTable';
import ComMaterialTable from './ComMaterialTable'
import Packing from './Packing'
import Delivery from './Delivery'
// import { useNavigate } from "react-router-dom";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const OrderForm = () => {
    // let history = useNavigate();
    const [productCode, setProductCode] = useState('?')
    const [product, setProduct] = useState(null)

    const [imgHight, setImgHeight] = useState(0)
    const [imageOpen, seImageOpen] = React.useState(false);
    
    const [newOarder] = useMutation(NEWORDER_MUTATION, {
        update(_, result) {
            console.log("added order")
            
        },
        onError(err) {
            console.log(err);
        },
    });

    const ref = useRef(null)

    const handleClickImageOpen = () => {
        seImageOpen(true);
      };
    
      const handleImageClose = (value) => {
        seImageOpen(false);
      };


    const parentId = 0
    const { data, loading, error } = useQuery(query, {
        variables: { parentId },
    });
    if (loading) return <LoadingComponent />;
    if (error)
        return <ErrorComponent message="There was an error loading data" />;

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
            text-transform: uppercase;
            font-weight: normal;
            border-bottom: 1px solid #ccc;
        }
        `;

    const products = data.products;
    const companies = data.companies;
    const colorws = data.colorWarehouses;
    const commts = data.comMaterialWarehouses;

    const initialValues = {
        company: '',
        product: '',
        order_count: '',
        order_date: new Date(),
        delivery_date: new Date(),
        selectedColors: {},
        colorCodes: {},
        colorPercents: {},
        colorSuppliers: {},
        hasSerigrafies: {},
        hasComMaterials: {},
        
        box_size: '',
        inner_box_size: '',
        special_box: false,
        inner_box_amount: '',
        has_box_bag: false,
        box_bag: '',
        seperator: false,
        barcode: '',
        top_label: '',

        delivery_address: '',
        delivery_type: '',
        delivery_conds: '',

        view: 'add',
    };

    return (
        <>
            <h1>SİPARİŞ OLUŞTURMA SAYFASI</h1>
                    
            <Grid>
                <Formik
                    initialValues={{
                        ...initialValues
                    }}
                    validationSchema={Yup.object().shape({
                        company: Yup.string().required('Company is required'),
                        product: Yup.object().required('Product is required'),
                        order_count: Yup.string().required('order_count is required'),
                        order_date: Yup.date().required('order_date is required'),
                        delivery_date: Yup.date().required('delivery_date is required'),

                    })}
                    onSubmit={(values) => {
                        console.log(JSON.stringify(values));
                        newOarder({
                            variables: {
                                orderData: JSON.stringify(values).replace(/"/g, "\\'")
                            },
                        });
                    }}>
                    {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                        isValid,
                        dirty,
                        touched,
                        values,
                        setFieldValue
                    }) => (
                        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <div style={{ width: '100%' }}>

                                <Typography variant="h5" gutterBottom component="div">
                                    YENI SİPARİŞ
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        gap: 4,
                                        p: 1,
                                        m: 1,
                                        borderRadius: 1,
                                    }}
                                >
                                    <Grid container spacing={2} ref={ref}>
                                        <Grid container item xs={11} spacing={2}>
                                            <Grid item xs={4}>
                                                <Autocomplete
                                                    id="company"
                                                    options={companies}
                                                    getOptionLabel={(company) => `${company?.name}`}
                                                    onChange={(e, value) => setFieldValue("company", value?.id || "")}
                                                    onOpen={handleBlur}
                                                    includeInputInList
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={Boolean(touched.company && errors.company)}
                                                            fullWidth
                                                            helperText={touched.company && errors.company}
                                                            label="FİRMA ADI"
                                                            name="company"
                                                            variant="outlined"
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Autocomplete
                                                    sx={{ flexGrow: 1 }}
                                                    id="product"
                                                    options={products}
                                                    getOptionLabel={(product) => `${product?.name}`}
                                                    onChange={(e, value) => {
                                                        setFieldValue("product", value)

                                                        let colorPercents = {}
                                                        let selectedColors = {}
                                                        let colorSuppliers = {}
                                                        let colorCodes = {}
                                                        let hasSerigrafies = {}
                                                        let hasComMaterials = {}
                                                        if (value.productSet.length > 0){
                                                            Object.keys(value.productSet).map(function(key, index) {
                                                                colorPercents[value.productSet[key].id] = 0
                                                                selectedColors[value.productSet[key].id] = 0
                                                                colorSuppliers[value.productSet[key].id] = {}
                                                                colorCodes[value.productSet[key].id] = ''
                                                                hasSerigrafies[value.productSet[key].id] = false
                                                            });

                                                            Object.keys(value.productcommaterialSet).map(function(key, index) {
                                                                hasComMaterials[value.productcommaterialSet[key].id] = false
                                                            });
                                                        }else{
                                                            colorPercents[value.id] = 0
                                                            selectedColors[value.id] = 0
                                                            colorSuppliers[value.id] = {}
                                                            colorCodes[value.id] = ''
                                                            hasSerigrafies[value.id] = false
                                                        }
                                                        setFieldValue("colorPercents", colorPercents)
                                                        setFieldValue("selectedColors", selectedColors)
                                                        setFieldValue("colorSuppliers", colorSuppliers)
                                                        setFieldValue("colorCodes", colorCodes)
                                                        setFieldValue("hasSerigrafies", hasSerigrafies)
                                                        setFieldValue("hasComMaterials", hasComMaterials)
                                                        setFieldValue("product", value)
                                                        setProduct(value)
                                                        setProductCode(value.code)
                                                    }}
                                                    onOpen={handleBlur}
                                                    includeInputInList
                                                    renderOption={(props, product) => (
                                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 }, '& ': { fontSize: 14 } }} {...props}>
                                                            <img
                                                                loading="lazy"
                                                                width="20"
                                                                src={`${process.env.NEXT_SERVER}${product.imageUrl}`}
                                                                srcSet={`${process.env.NEXT_SERVER}${product.imageUrl} 2x`}
                                                                alt="11"
                                                            />
                                                            {product.name}
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={Boolean(touched.product && errors.product)}
                                                            fullWidth
                                                            value={values.product}
                                                            helperText={touched.product && errors.product}
                                                            label="ÜRÜN ADI"
                                                            name="product"
                                                            variant="outlined"
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Alert variant="outlined" severity={productCode == '?' ? "error" : "success"}>
                                                    ÜRÜN KODU: <strong>{productCode}</strong>
                                                </Alert>
                                            </Grid>

                                            <Grid item xs={4}>
                                                <TextField
                                                    error={Boolean(touched.order_count && errors.order_count)}
                                                    fullWidth
                                                    required
                                                    helperText={touched.order_count && errors.order_count}
                                                    label="SİPARİŞ ADEDİ"
                                                    name="order_count"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    type="text"
                                                    value={values.order_count}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={4}>

                                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={trLocale}>
                                                    <DatePicker
                                                        id="order_date"
                                                        label='SİPARİŞ TARİHİ'
                                                        inputVariant="outlined"

                                                        value={values.order_date}
                                                        onChange={value => setFieldValue("order_date", value)}

                                                        renderInput={(params) => (
                                                            <TextField
                                                                fullWidth
                                                                error={Boolean(touched.order_date && errors.order_date)}
                                                                helperText={touched.order_date && errors.order_date}
                                                                name="order_date"
                                                                variant="outlined"
                                                                {...params}
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={trLocale}>
                                                    <DatePicker
                                                        id="delivery_date"
                                                        label='TESLİM TARİHİ'
                                                        inputVariant="outlined"

                                                        value={values.delivery_date}
                                                        onChange={value => setFieldValue("delivery_date", value)}

                                                        renderInput={(params) => (
                                                            <TextField
                                                                fullWidth
                                                                error={Boolean(touched.delivery_date && errors.delivery_date)}
                                                                helperText={touched.delivery_date && errors.delivery_date}
                                                                name="delivery_date"
                                                                variant="outlined"
                                                                {...params}
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs="1">
                                            <Grid>
                                                {product == null ? "" : (
                                                    <CardMedia component="img" loading="lazy"
                                                        sx={{height: '126px', width: 'auto'}}
                                                        src={`${process.env.NEXT_SERVER}${product.imageUrl}`}
                                                        srcSet={`${process.env.NEXT_SERVER}${product.imageUrl} 2x`}
                                                        alt={product.name}
                                                        style={{}}
                                                        onClick={handleClickImageOpen}
                                                    />)}
                                                    <SimpleDialog
                                                        open={imageOpen}
                                                        onClose={handleImageClose}
                                                        product={product}
                                                    />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </div>

                            {product && (
                                <>
                                    <Divider sx={{mt: 3, mb:3}} variant="middle" />

                                    <div style={{ width: '100%' }}>
                                        
                                        
                                        
                                            <Root sx={{ width: '100%'}}>
                                                <SemiProductTable 
                                                    product={product} 
                                                    colorws={colorws} 
                                                    values={values}
                                                    errors={errors} 
                                                    touched={touched}
                                                    handleChange={handleChange}
                                                    handleSubmit={handleSubmit}            
                                                    handleBlur = {handleBlur}
                                                    setFieldValue= {setFieldValue}
                                                    order={[]}
                                                    />
                                            </Root>
                                    </div>
                                </> 
                            )}
                            
                            {product && (
                                <>
                                    <Divider sx={{mt: 4, mb:3}} variant="middle" />

                                    <div style={{ width: '100%' }}>
                                        <Typography variant="h5" gutterBottom component="div">
                                            ÜRÜNDE KULLANILAN TİCARİ ÜRÜNLER
                                        </Typography>
                                        
                                        
                                            <Root sx={{ width: '100%'}}>
                                                <ComMaterialTable 
                                                    values={values}
                                                    errors={errors} 
                                                    touched={touched}
                                                    handleChange={handleChange}
                                                    handleSubmit={handleSubmit}            
                                                    handleBlur = {handleBlur}
                                                    setFieldValue= {setFieldValue}
                                                    order={[]}
                                                    />
                                            </Root>
                                    </div>
                                </>
                            )}

                            <Divider sx={{mt: 3, mb:3}} variant="middle" />

                            <Typography variant="h5" gutterBottom component="div">
                                PAKETLEME
                            </Typography>
                            <Root sx={{width: '100%'}}>
                                <Packing 
                                    commts={commts}
                                    values={values}
                                    errors={errors} 
                                    touched={touched}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}            
                                    handleBlur = {handleBlur}
                                    setFieldValue= {setFieldValue}/>
                            </Root>

                            <Divider sx={{mt: 3, mb:3}} variant="middle" />

                            <Typography variant="h5" gutterBottom component="div">
                                SEVK BİLGİLERİ
                            </Typography>
                            <Root sx={{width: '100%'}}>
                                <Delivery 
                                    values={values}
                                    errors={errors} 
                                    touched={touched}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}            
                                    handleBlur = {handleBlur}
                                    setFieldValue= {setFieldValue}/>
                            </Root>
                            
                            <Divider sx={{mt: 3, mb:3}} variant="middle" />

                            <Button
                                color="primary"
                                disabled={Boolean(!isValid)}
                                type="submit"
                                variant="contained">
                                Save
                            </Button>
                        </form>
                    )}
                </Formik>
            </Grid>
        </>
    );
};

OrderForm.propTypes = {
    className: PropTypes.string
};

const NEWORDER_MUTATION = gql`
mutation newOrder($orderData: String!){
    newOrder(orderData: $orderData){
      ok
    }
  }
`


const query = gql`
    query data{
      products(parentId:0){
        id
        name
        code
        image
        imageUrl
        productcommaterialSet {
            id
            comMaterialAmount
            comMaterial {
              id
              name
              code
              unit {
                id
                name
              }
            }
        }
        material {
            id
            name
            code
            unit {
            id
            name
            }
        }
        department{
            id
            title
        }
        materialAmount
        productSet {
            id
            name
            code
            imageUrl
            department{
                id
                title
            }
            
            material {
                id
                name
                code
                unit {
                id
                name
                }
            }
            materialAmount
        }
      }
      companies{
        id
        name
      }
      colors{
        id
        name
        color
      }
      colorWarehouses{
          id
        color {
          id
          name
          code
          color
        }
        supplier {
          id
          name
        }
        amount
      }
      comMaterialWarehouses {
        id
        comMaterial {
          id
          name
        }
        supplier{
          id
          name
        }
      }
      
    }`;

export default OrderForm;