import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
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

import Admin from "layouts/Admin.js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-child(4n), &:nth-child(4n - 1)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:nth-child(4n-2), &:nth-child(4n-3)": {
    backgroundColor: theme.palette.common.white,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Row(props) {
  const { order } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order.code}
        </TableCell>
        <TableCell>{order.statusTitle}</TableCell>
        <TableCell>
          <Moment format="YYYY/MM/DD">{order.orderAt}</Moment>
        </TableCell>
        <TableCell>
          <Moment format="YYYY/MM/DD">{order.finishedAt}</Moment>
        </TableCell>
        <TableCell>
          <Tooltip title={order.company.name} placement="top-start">
            <span>{order.company.name.substring(0, 10)}...</span>
          </Tooltip>
        </TableCell>
        <TableCell>{order.product.name}</TableCell>
        <TableCell align="right">{order.product.code}</TableCell>
        <TableCell>0 / {order.orderAmount}</TableCell>
      </StyledTableRow>
      <StyledTableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 1,
                boxShadow:
                  "0 0px 0px 0 rgb(0 0 0 / 7%), 0 4px 7px 0 rgb(0 0 0 / 16%)",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h6" gutterBottom component="div">
                ARA ÜRÜNLER
              </Typography>
              <Table
                size="small"
                aria-label="purchases"
                style={{ width: "90%" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>KODU </TableCell>
                    <TableCell>ADI</TableCell>
                    <TableCell>RENK</TableCell>
                    <TableCell align="right">HAM MADDESİ</TableCell>
                    <TableCell align="right">BÖLÜMÜ</TableCell>
                    <TableCell align="right">SERİGRAFİ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderProducts.map((productRow) => (
                    <TableRow key={productRow.product.code}>
                      <TableCell component="th" scope="row">
                        {productRow.product.code}
                      </TableCell>
                      <TableCell>{productRow.product.name}</TableCell>
                      <TableCell>
                        <ColorLensIcon htmlColor={productRow.color.color} />
                        {productRow.color.name} ({productRow.colorPercent}%)
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip
                          title={productRow.product.material.name}
                          placement="top-start"
                        >
                          <span>
                            {productRow.product.material.code} (
                            {productRow.product.materialAmount}{" "}
                            {productRow.product.material.unit.name})
                          </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        {productRow.product.department.title}
                      </TableCell>
                      <TableCell align="right">
                        {productRow.hasSilk ? <CheckIcon /> : <CloseIcon />}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function OrderList() {
  const { data, loading, error } = useQuery(query, {});
  if (loading) return <LoadingComponent />;
  if (error)
    return <ErrorComponent message="There was an error loading data" />;

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 border-0">
            <div className="bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  SİPARİŞLER
                </h6>
              </div>
            </div>
            <div className="flex-auto bg-white px-4 lg:px-10 py-10 pt-0">
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>DETAY</StyledTableCell>
                      <StyledTableCell>SİP. NO</StyledTableCell>
                      <StyledTableCell>DURUM</StyledTableCell>
                      <StyledTableCell>SİPARİŞ TARİHİ</StyledTableCell>
                      <StyledTableCell>TERMİN</StyledTableCell>
                      <StyledTableCell>FİRMA</StyledTableCell>
                      <StyledTableCell>ÜRÜN ADI</StyledTableCell>
                      <StyledTableCell align="right">ÜRÜN KODU</StyledTableCell>
                      <StyledTableCell>SİPARİŞ ADEDİ</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
                                {data.orders.map((order) => (
                                    <Row key={order.id} order={order} />
                                ))}
                                </TableBody> */}
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
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
