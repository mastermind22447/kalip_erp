import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import LoadingComponent from "components/LoadingComponent";
import ErrorComponent from "components/ErrorComponent";
import { useRouter } from 'next/router'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import OrdersTable from 'components/Orders/OrdersTable'

import Admin from "layouts/Admin.js";


export default function OrderList() {
  const router = useRouter()
  const { depId } = router.query
  const { data, loading, error } = useQuery(query, {
      variables: { depId: depId },
  });
  if (loading) return <LoadingComponent />;
  if (error)
    return <ErrorComponent message="There was an error loading data" />;
   console.log("data", data)


  return (
    <>
        <h1>
            {depId == 1 ? 'ENJEKSİYON': 'ŞİŞİRME VE PET'} SİPARİŞLER
        </h1>

        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ARA ÜRÜN KODU</TableCell>
                    <TableCell>ARA ÜRÜN ADI</TableCell>
                    <TableCell>RENK ADI</TableCell>
                    <TableCell>RENK KODU</TableCell>
                    <TableCell>SİPARİŞ ADET</TableCell>
                    <TableCell>STOK MİKTARI</TableCell>
                    <TableCell>ÜRETİLECEK ADET</TableCell>
                    <TableCell>Sip. NO</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {data.orderProducts.map((row, index) => (
                <>
                  {row.product.orderproductsSet.map((order, key) => (
                      <TableRow key={index}>
                          {key == 0 && (
                            <>
                              <TableCell rowSpan={row.product.orderproductsSet.length}>{row.product.code}</TableCell>
                              <TableCell rowSpan={row.product.orderproductsSet.length}>{row.product.name}</TableCell>
                            </>
                            )}
                            <TableCell>1</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>4</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>6</TableCell>
                          
                      </TableRow>
                ))}
                </>
              ))}
               
            </TableBody>
        </Table>
    </>
  );
}

const query = gql`
query orders($depId: Int)
  {orderProducts(depId: $depId) {
    id
    product{
      id
      name
      code
      parent{
        id
        name
      }
      orderproductsSet{
        id
        order{
          id
          orderAmount
          
        }
        color {
          id
          name
          color
          code
        }
      }
    }
  }
}
`

OrderList.layout = Admin;