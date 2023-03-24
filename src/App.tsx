import TableComponent from "./components/Table";
import { Typography, Box } from "@mui/material";

const App = () => {
  return (
      <Box p={1}>
        <Typography variant="h4" gutterBottom m={2}>
          Shipment Table
        </Typography>
        <TableComponent />
      </Box>
    );
};

export default App;
