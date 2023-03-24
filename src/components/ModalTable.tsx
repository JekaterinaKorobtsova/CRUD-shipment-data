import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { Modal, Button, Box, Typography, Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectHeaders, Shipment, updateShipment } from "../redux/shipmentSlice";
import { paperStyle, titleStyle, gridStyle, labelStyle, inputStyle, buttonStyle } from "./styles";

interface ModalTableProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  shipmentData?: Shipment | null;
}

const theme = createTheme();

const ModalTable: React.FC<ModalTableProps> = ({ isModalOpen, onCloseModal, shipmentData }) => {
  const dispatch = useDispatch();
  const [changeShipment, setChangeShipment] = useState<Shipment>({} as Shipment);

  const handleSave = () => {
    dispatch(updateShipment(changeShipment));
    onCloseModal();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setChangeShipment((prevShipmentData: Shipment) => ({
      ...prevShipmentData,
      [name]: value,
    }));
  };

  const headers = useSelector(selectHeaders);

  const shipmentDetails = [
    { name: "orderNo", label: headers[0] },
    { name: "date", label: headers[1] },
    { name: "customer", label: headers[2] },
    { name: "trackingNo", label: headers[3] },
    { name: "status", label: headers[4] },
    { name: "consignee", label: headers[5] },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={isModalOpen}
        onClose={onCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={paperStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={titleStyle}>
            SHIPMENT DETAILS
          </Typography>
          {shipmentData ? (
            <Grid sx={gridStyle}>
              {shipmentDetails.map((details) => (
                <Grid key={details.name} item xs={6}>
                  <label style={labelStyle}>{details.label}</label>
                  <input
                    type="text"
                    name={details.name}
                    data-testid={details.name}
                    defaultValue={shipmentData[details.name as keyof Shipment]}
                    style={inputStyle}
                    onChange={handleChange}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">No shipment data available.</Typography>
          )}
          <Stack
            spacing={2}
            direction="row"
            sx={buttonStyle}
            style={{
              position: "absolute",
              bottom: theme.spacing(2),
              right: theme.spacing(2),
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="contained" onClick={handleSave} sx={{ marginRight: theme.spacing(1) }}>
              Save
            </Button>
            <Button variant="contained" onClick={onCloseModal}>
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ModalTable;
