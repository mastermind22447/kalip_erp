import React, { useState } from "react";

import { gql, useQuery } from "@apollo/client";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import trLocale from 'date-fns/locale/tr';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/TimePicker';
import { styled, ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import LoadingComponent from "components/LoadingComponent";
import ErrorComponent from "components/ErrorComponent";

const NewOrder = () => {
  const [company, setCompany] = useState(null);
  const [product, setProduct] = useState(null);
  const [orderCount, setOrderCount] = useState(0);
  const [orderDate, setOrderDate] = useState(new Date())
  const [deliveryDate, setDeliveryDate] = useState(new Date())

  const validationSchema = Yup.object().shape({
    // company: Yup.string()
    //   .required('Company is required'),
    // product: Yup.string()
    //   .required('Product Name is required'),
    // orderDate: Yup.string()
    //   .required('Date of Birth is required'),
    deliveryDate: Yup.string()
      .required('Date of Birth is required')
    
  }
  );
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(
    formOptions,{
      orderDate: new Date(),
      deliveryDate: new Date(),
    });
  const { errors } = formState;

  function onSubmit(data) {
      // display form data on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
      return false;
  }

  const parentId = 0
  const { data, loading, error } = useQuery(query, {
    variables: { parentId },
  });

  if (loading) return <LoadingComponent />;
  if (error)
      return <ErrorComponent message="There was an error loading data" />;
  // const [deliveryDate, setDeliveryDate] = useState(new Date())
  // const [value, setValue] = useState(null);

  // const changeOrderDate = (date) => {
  //   console.log("--- date changed: ", date, date.toString());
  //   setOrderDate(date);
  // };

  // const changeDeliveryDate = e => {
    
  //   console.log("--- date changed: ", e, e.toString());
  //   // setDeliveryDate(val);
  // };

  // const changeDeliveryDate = (date) => {
  //   setDeliveryDate(date);
  // };

  

  
  

  const products = data.products;
  const companies = data.companies;
  
  const MyForm = styled(Box)({
    '& .MuiFormControl-root': {
      width: '100%',
    },
  });

  
  return (
    <>
    
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 border-0">
        <div className="bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">SİPARİŞ OLUŞTURMA SAYFASI</h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Settings
              
            </button>
          </div>
        </div>
      
        
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <MyForm component="form" onSubmit={handleSubmit(onSubmit)}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            YENI SİPARİŞ
            </h6>

            
            
            <div className="flex flex-wrap">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">

                  <Autocomplete
                    id="company"
                    name="company"
                    {...register('company')}
                    freeSolo
                    options={companies}
                    value={company}
                    onChange={(event, newValue) => {
                      setCompany(newValue);
                    }}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{'& ': {fontSize: 14}  }} {...props}>
                        {option.name}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        
                        
                        {...params}
                        label="FİRMA ADI"
                        
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                  
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">

                <Autocomplete
                  freeSolo
                  id="product"
                  {...register('product')}
                  name="product"
                  sx={{ fontSize: 10 }}
                  options={products}
                  value={product}
                    onChange={(event, newValue) => {
                      setProduct(newValue);
                    }}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 }, '& ': {fontSize: 14}  }} {...props}>
                      <img
                        loading="lazy"
                        width="20"
                        src={`${process.env.NEXT_SERVER}${option.imageUrl}`}
                        srcSet={`${process.env.NEXT_SERVER}${option.imageUrl} 2x`}
                        alt="11"
                      />
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      
                      {...params}
                      label="ÜRÜN ADI"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />

                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                 
                {/* <Autocomplete
                  freeSolo
                  id="product_code"
                  sx={{ fontSize: 10 }}
                  name="product_code"
                  value={product.code}
                  options={products}
                  getOptionLabel={(option) => option.code}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 }, '& ': {fontSize: 14} }} {...props}>
                      <img
                        loading="lazy"
                        width="20"
                        src={`${process.env.NEXT_SERVER}${option.imageUrl}`}
                        srcSet={`${process.env.NEXT_SERVER}${option.imageUrl} 2x`}
                        alt="11"
                      />
                      {option.code}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      
                      {...params}
                      label="ÜRÜN KODU"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                /> */}
                </div>
              </div>

              
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <LocalizationProvider sx={{width: '100%'}} dateAdapter={AdapterDateFns} locale={trLocale}>
                    <DatePicker
                      mask="__.__.____"
                      id="order_date"
                      sx={{width: '100%'}}
                      label='SİPARİŞ TARİHİ'
                      value={orderDate}
                      {...register('orderDate')}
                      onChange={(newValue) => {
                        // console.log(event, newValue)
                        setOrderDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <LocalizationProvider dateAdapter={AdapterDateFns} locale={trLocale}>
                    <DatePicker
                      mask="__.__.____"
                      id="delivery_date"
                      label='TESLİM TARİHİ'
                      name="deliveryDate"
                      value={deliveryDate}
                      {...register('deliveryDate')}
                      onChange={(newValue) => {
                        setDeliveryDate(newValue);
                      }}
                      renderInput={(params) => <TextField  {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div> 
               <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <TextField {...register('orderCount')} value={orderCount} onChange={(event, newValue) => {setOrderCount(newValue)}} label="SİPARİŞ ADEDİ" type="number" sx={{width: '100%'}}  />
                </div>
              </div> 

              
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Contact Information
            </h6>
            {/* <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    City
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="New York"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="United States"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Postal Code"
                  />
                </div>
              </div>
            </div> */}

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              About Me
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    About me
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows="4"
                    defaultValue="A beautiful UI Kit and Admin for NextJS & Tailwind CSS. It is Free
                    and Open Source."
                  ></textarea>
                </div>
              </div>
            </div>
          </MyForm>
        </div>
      </div>
    </>
  );
}

const query = gql`
    query data{
      products(parentId:0){
        id
        name
        code
        image
        imageUrl
        semiProducts{
          id
        }
      }
      companies{
        id
        name
      }
    }`;
export default NewOrder;