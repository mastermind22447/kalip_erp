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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/TimePicker';
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

import Moment from 'react-moment';
// import { useNavigate } from "react-router-dom";


const OrderForm = (props) => {
    const {orderId} = props
    // let history = useNavigate();
    const [productCode, setProductCode] = useState('?')
    const [product, setProduct] = useState(null)

    const [imageOpen, seImageOpen] = React.useState(false);

    const ref = useRef(null)

    const handleClickImageOpen = () => {
        seImageOpen(true);
      };
    
      const handleImageClose = (value) => {
        seImageOpen(false);
      };

    const { data, loading, error } = useQuery(query, {
        variables: { orderId },
    });
    if (loading) return <LoadingComponent />;
    if (error)
        return <ErrorComponent message="There was an error loading data" />;
    

    const order = data.order

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
        
        box_size: order.boxSize,
        inner_box_size: order.innerBoxSize,
        special_box: order.specialBox,
        inner_box_amount: order.boxPieces,
        has_box_bag: order.hasBag,
        box_bag: order.bag,
        seperator: order.seperator,
        barcode: order.barkod,
        top_label: order.eticket,

        delivery_address: order.deliveryAddress,
        delivery_type: order.deliveryMode,
        delivery_conds: order.conditions,

        view: 'detail'
    };

    return (
        <>
            <h1>SİPARİŞ DETAY SAYFASI</h1>
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
                                    SİPARİŞ CODU:  {order.code}
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
                                                {order.company.name}
                                            </Grid>
                                            <Grid item xs={4}>
                                                {order.product.name}
                                            </Grid>
                                            <Grid item xs={4}>
                                                {order.product.code}
                                            </Grid>

                                            <Grid item xs={4}>
                                                {order.orderAmount}
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Moment format="YYYY/MM/DD">{order.orderAt}</Moment>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Moment format="YYYY/MM/DD">{order.finishedAt}</Moment>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs="1">
                                            <Grid>
                                                {order.product.image == null ? "" : (
                                                    <CardMedia component="img" loading="lazy"
                                                        sx={{height: '126px', width: 'auto'}}
                                                        src={`${process.env.NEXT_SERVER}${order.product.imageUrl}`}
                                                        srcSet={`${process.env.NEXT_SERVER}${order.product.imageUrl} 2x`}
                                                        alt={order.product.name}
                                                        style={{}}
                                                        onClick={handleClickImageOpen}
                                                    />)}
                                                    <SimpleDialog
                                                        open={imageOpen}
                                                        onClose={handleImageClose}
                                                        product={order.product}
                                                    />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </div>

                            {order.product && (
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
                                                    order={order} 
                                                    />
                                            </Root>
                                    </div>
                                </> 
                            )}
                            
                            {order.product && (
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
                                                    order={order} 
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
                                    setFieldValue= {setFieldValue}
                                    order={order} />
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
query orderDetail($orderId: Int!)
  {order(id: $orderId) {
    id
    code
    imageUrl
    status
    statusTitle
    ordercommaterialSet{
        id
        comMaterial{
          id
          code
          name
          unit{name}
        }
      }
    orderProducts {
      id
      product{
        id
        name
        code
        department {
          id
          title
        }
        materialAmount
        material {
          id
          name
          code
          unit {
            id
            name
          }
        }
      }
      color {
        id
        name
        color
        code
      }
      colorSupplier {
        id
        name
      }
      
      colorPercent
      hasSilk
    }
    company {
      id
      name
    }
    orderAmount
    orderAt
    finishedAt
    
    boxSize
    innerBoxSize
    specialBox
    boxPieces
    hasBag
    bag{
      id
      name
    }
    seperator
    barkod
    eticket
    deliveryMode
    deliveryAddress
    conditions

    product {
      id
      code
      name
      image
      imageUrl
    }
	}
}
`

export default OrderForm;