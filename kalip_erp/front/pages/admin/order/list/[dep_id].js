import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import LoadingComponent from "components/LoadingComponent";
import ErrorComponent from "components/ErrorComponent";
import { useRouter } from 'next/router'

import OrdersTable from 'components/Orders/OrdersTable'

import Admin from "layouts/Admin.js";


export default function OrderList() {
  const router = useRouter()
  const { dep_id } = router.query
  const { data, loading, error } = useQuery(query, {
      variables: { depId: dep_id },
  });
  if (loading) return <LoadingComponent />;
  if (error)
    return <ErrorComponent message="There was an error loading data" />;
   console.log("data", data)


  return (
    <>
      <h1>
        {dep_id == 1 ? 'ENJEKSİYON': 'ŞİŞİRME VE PET'} SİPARİŞLER
      </h1>
      <OrdersTable orders={data.orderProducts} types={['subproduct']} />

    </>
  );
}

const query = gql`
query orders($depId: Int)
  {orderProducts(depId: $depId) {
    order{
      id
      code
      imageUrl
      status
      statusTitle
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
      product {
        id
        code
        name
      }
    }
  }
}
`

OrderList.layout = Admin;