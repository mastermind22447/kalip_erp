import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { gql, useQuery, useMutation } from "@apollo/client";
import LoadingComponent from "components/LoadingComponent";
import ErrorComponent from "components/ErrorComponent";
import Moment from "react-moment";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Badge from "@mui/material/Badge";
import Link from "next/link";
import OrdersTable from "components/Orders/OrdersTable";

import { useRouter } from "next/router";

import Admin from "layouts/Admin.js";
import { TabList } from "@mui/lab";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f6fbf5",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "#f6fbf5",
  },
}));

function CompanyTable({ orders }) {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table
        sx={{ minWidth: 650 }}
        className="list-table"
        aria-label="caption table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>SİPARİŞ NO</StyledTableCell>
            <StyledTableCell>Sipariş Tarihi</StyledTableCell>
            <StyledTableCell>TERMİN</StyledTableCell>
            <StyledTableCell>Ürün Adı</StyledTableCell>
            <StyledTableCell>Ürün Kodu</StyledTableCell>
            <StyledTableCell>Sipariş Adedi</StyledTableCell>
            <StyledTableCell>SEVK EDİLEN ADET</StyledTableCell>
            <StyledTableCell>KALAN ADET</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order.code}</TableCell>
              <TableCell>Sipariş Tarihi</TableCell>
              <TableCell>TERMİN</TableCell>
              <TableCell>Ürün Adı</TableCell>
              <TableCell>Ürün Kodu</TableCell>
              <TableCell>Sipariş Adedi</TableCell>
              <TableCell>SEVK EDİLEN ADET</TableCell>
              <TableCell>KALAN ADET</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function CompanyDetail() {
  const router = useRouter();
  const { companyId } = router.query;

  const [value, setValue] = React.useState("1");

  const { data, loading, error } = useQuery(query, {
    variables: { companyId },
  });
  if (loading) return <LoadingComponent />;
  if (error)
    return <ErrorComponent message="There was an error loading data" />;

  const company = data.company;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <h1 className="page-title">FİRMA DETAY</h1>
      {/* <Paper> */}
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <TableContainer>
          <Table className="table-vertical">
            <TableBody>
              <TableRow>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ width: "10%" }}
                >
                  FİRMA ADI:
                </StyledTableCell>
                <TableCell>{company.name}</TableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ width: "10%" }}
                >
                  VERGİ DAİRESİ &NO:{" "}
                </StyledTableCell>
                <TableCell>{company.taxAdmin}</TableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ width: "10%" }}
                >
                  FATURA ADRESİ:
                </StyledTableCell>
                <TableCell>{company.billingAddress}</TableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ width: "10%" }}
                >
                  ÜRÜN TESLİM ADRESİ:
                </StyledTableCell>
                <TableCell>{company.shippingAddress}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ borderBottom: 1, marginTop: "30px" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList value={value} onChange={handleChange}>
                <Tab
                  label={
                    <Badge badgeContent={4} color="primary">
                      AÇIK SİPARİŞLER&nbsp;&nbsp;
                    </Badge>
                  }
                  value="1"
                />
                <Tab
                  label={
                    <Badge badgeContent={0} color="primary">
                      KAPANAN SİPARİŞLER&nbsp;&nbsp;
                    </Badge>
                  }
                  value="2"
                />
                <Tab
                  label={
                    <Badge badgeContent={1} color="primary">
                      GELEN İADELER&nbsp;&nbsp;
                    </Badge>
                  }
                  value="3"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <OrdersTable
                orders={company.orderSet}
                types={["product", "company"]}
              />
            </TabPanel>
            <TabPanel value="2">KAPANAN SİPARİŞLER</TabPanel>
            <TabPanel value="3">GELEN İADELER</TabPanel>
          </TabContext>
        </Box>
      </Box>
      {/* </Paper> */}
    </>
  );
}

const query = gql`
  query company($companyId: Int!) {
    company(companyId: $companyId) {
      id
      name
      billingAddress
      description
      taxAdmin
      shippingAddress
      orderSet {
        id
        code
        orderAt
        finishedAt
        product {
          name
          code
        }
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
        orderAmount
        orderAt
        finishedAt
      }
    }
  }
`;

CompanyDetail.layout = Admin;
