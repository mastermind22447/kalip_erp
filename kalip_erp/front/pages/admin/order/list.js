import React from "react";

import { gql, useQuery } from "@apollo/client";
import LoadingComponent from "components/LoadingComponent";
import ErrorComponent from "components/ErrorComponent";

import OrdersTable from "components/Orders/OrdersTable";

import Admin from "layouts/Admin.js";

export default function OrderList() {
  const { data, loading, error } = useQuery(query, {});
  if (loading) return <LoadingComponent />;
  if (error)
    return <ErrorComponent message="There was an error loading data" />;

  return (
    <>
      <h1>SİPARİŞLER</h1>
      <OrdersTable orders={data.orders} types={["product"]} />
    </>
  );
}

const query = gql`
  query orders {
    orders {
      id
      code
      imageUrl
      status
      statusTitle
      orderProducts {
        id
        product {
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
`;

OrderList.layout = Admin;
