import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteShipment,
  fetchShipmentData,
  selectShipment,
  selectHeaders,
  selectSortedShipmentList,
  setSort,
} from "../redux/shipmentSlice";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  ThemeProvider,
  Typography,
  Box,
} from "@mui/material";
import { StyledTableCell, themeIconDelete, themeIconDetails } from "./styles";
import GridViewIcon from "@mui/icons-material/GridView";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { closeModal, openModal } from "../redux/modalSlice";
import ModalTable from "./ModalTable";
import SkeletonTable from "./Skeleton";
import { RootState } from "../redux/store";

const TableComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { list, pageStatus, selected, sort } = useSelector((state: RootState) => state.shipment);
  const { isOpen } = useSelector((state: RootState) => state.modal);
  const headers = useSelector(selectHeaders);
  const sortedList = useSelector(selectSortedShipmentList);

  useEffect(() => {
    dispatch(fetchShipmentData() as any);
  }, [dispatch]);

  const onRemove = (orderNo: string) => {
    if (window.confirm("Are You sure want to delete? This action cannot be undone.")) {
      dispatch(deleteShipment(orderNo));
    }
  };

  const openFromTable = (orderNo: string) => {
    const order = list.filter((obj) => orderNo === obj.orderNo);
    dispatch(selectShipment(order[0]));
    dispatch(openModal(true));
  };

  const onCloseModal = () => {
    dispatch(closeModal(true));
  };

  const handleSort = (column: string) => {
    const direction = sort.column === column ? (sort.direction === "asc" ? "desc" : "asc") : "asc";
    dispatch(setSort({ column, direction }));
  };

  return (
    <div className="table-container">
      {pageStatus === "error" ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Typography variant="h2" align="center">
            Oooh noooo! 😔
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mt: 2 }}>
            Something went wrong!
          </Typography>
        </Box>
      ) : (
        <div className="table">
          {pageStatus === "loading" ? (
            <SkeletonTable />
          ) : (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: "800px", overflowX: "auto" }}>
                <Table aria-label="customized table" stickyHeader>
                  <TableHead>
                    <TableRow data-testid="header-row">
                      {headers.map((header) => (
                        <StyledTableCell key={header}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <div
                              onClick={() => handleSort(header)}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {header.toUpperCase()}
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginLeft: 1,
                                }}
                              >
                                <NorthIcon
                                  fontSize="small"
                                  style={{
                                    color:
                                      sort.column === header && sort.direction === "asc"
                                        ? "#616161"
                                        : "#e0e0e0",
                                  }}
                                />
                                <SouthIcon
                                  fontSize="small"
                                  style={{
                                    color:
                                      sort.column === header && sort.direction === "desc"
                                        ? "#616161"
                                        : "#e0e0e0",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </StyledTableCell>
                      ))}
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody data-testid="table-body">
                    {sortedList.map((shipment) => (
                      <TableRow
                        data-testid="table-row"
                        hover
                        key={shipment.orderNo}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell key={`${shipment.orderNo}-orderNo`}>
                          {shipment.orderNo}
                        </StyledTableCell>
                        <StyledTableCell key={`${shipment.orderNo}-date`}>
                          {shipment.date}
                        </StyledTableCell>
                        <StyledTableCell key={`${shipment.orderNo}-customer`}>
                          {shipment.customer}
                        </StyledTableCell>
                        <StyledTableCell key={`${shipment.orderNo}-trackingNo`}>
                          {shipment.trackingNo}
                        </StyledTableCell>
                        <StyledTableCell key={`${shipment.orderNo}-status`}>
                          {shipment.status}
                        </StyledTableCell>
                        <StyledTableCell key={`${shipment.orderNo}-consignee`}>
                          {shipment.consignee}
                        </StyledTableCell>
                        <StyledTableCell>
                          <ThemeProvider theme={themeIconDetails}>
                            <GridViewIcon
                              data-testid="details-icon"
                              onClick={() => openFromTable(shipment.orderNo)}
                            />
                          </ThemeProvider>

                          <ThemeProvider theme={themeIconDelete}>
                            <CancelPresentationIcon onClick={() => onRemove(shipment.orderNo)} />
                          </ThemeProvider>
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </div>
      )}

      <ModalTable
        data-testid="modal"
        shipmentData={selected}
        isModalOpen={isOpen}
        onCloseModal={onCloseModal}
      />
    </div>
  );
};

export default TableComponent;
