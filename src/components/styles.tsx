import { styled } from "@mui/material/styles";
import { tableCellClasses, createTheme, TableCell } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e8f4fd",
    color: "#616161",
    fontWeight: "bold",
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    color: "#616161",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export const themeIconDelete = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#ef5350",
          margin: 10,
        },
      },
    },
  },
});

export const themeIconDetails = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#64b5f6",
          margin: 10,
        },
      },
    },
  },
});

// modal styles
export const theme = createTheme();

export const paperStyle = {
  position: "absolute",
  width: "80%",
  height: "60%",
  backgroundColor: theme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
};
export const titleStyle = {
  margin: theme.spacing(2),
  fontSize: 14,
  fontWeight: "bold",
  color: "#9e9e9e",
  alignSelf: "flex-start",
};

export const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "repeat(3, 1fr)",
  gap: theme.spacing(4),
  width: "90%",
  margin: "auto",
  justifyContent: "center",
};

export const labelStyle = {
  fontWeight: "bold",
  paddingRight: theme.spacing(1),
  color: "#757575",
};

export const inputStyle = {
  width: "100%",
  height: "40px",
  padding: "5px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginTop: theme.spacing(1),
  color: "#9e9e9e",
  backgroundColor: "#eceff1",
  fontSize: 15,
};

export const buttonStyle = {
  width: "8%",
  height: 30,
  alignSelf: "flex-end",
};
