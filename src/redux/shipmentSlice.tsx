import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import shipmentData from "../shipmentData.json";
import { RootState } from "./store";

export type Shipment = {
  orderNo: string;
  date: string;
  status: string;
  customer: string;
  trackingNo: string;
  consignee: string;
  id: string;
};

export type ShipmentState = {
  list: Shipment[];
  selected: Shipment | null;
  pageStatus: "loading" | "completed" | "error";
  sort: {
    column: keyof Shipment | null;
    direction: "asc" | "desc";
  };
};

const API_URL = "https://my.api.mockaroo.com/shipments.json?key=5e0b62d0";
const LOCAL_DATA = shipmentData;

export const fetchShipmentData = createAsyncThunk<Shipment[], void>(
  "shipment/fetchShipmentDataStatus",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Shipment[]>(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.fulfillWithValue(LOCAL_DATA as Shipment[]);
    }
  }
);

const shipmentSlice = createSlice({
  name: "shipment",
  initialState: {
    list: [] as Shipment[],
    selected: null,
    pageStatus: "loading",
    sort: {
      column: null,
      direction: "asc",
    },
  } as ShipmentState,
  reducers: {
    setShipment(state, action: PayloadAction<Shipment[]>) {
      state.list = action.payload;
    },
    selectShipment(state, action: PayloadAction<Shipment>) {
      state.selected = action.payload;
    },
    updateShipment(state, action: PayloadAction<Shipment>) {
      const updatedShipment = action.payload;
      const selectedShipment = state.list.find((shipment) => shipment.id === updatedShipment.id);

      if (selectedShipment) {
        Object.keys(updatedShipment).forEach((key) => {
          if (selectedShipment[key as keyof Shipment] !== updatedShipment[key as keyof Shipment]) {
            selectedShipment[key as keyof Shipment] = updatedShipment[key as keyof Shipment];
          }
        });

        if (state.selected && state.selected.id === updatedShipment.id) {
          state.selected = selectedShipment;
        }
      }
    },
    deleteShipment(state, action: PayloadAction<string>) {
      state.list = state.list.filter((shipment) => shipment.orderNo !== action.payload);
    },
    setSort(state, action) {
      state.sort = {
        column: action.payload.column,
        direction: action.payload.direction,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchShipmentData.pending, (state) => {
      state.pageStatus = "loading";
      state.list = [];
    });
    builder.addCase(fetchShipmentData.fulfilled, (state, action: PayloadAction<Shipment[]>) => {
      state.pageStatus = "completed";
      state.list = action.payload;
    });
    builder.addCase(fetchShipmentData.rejected, (state) => {
      state.pageStatus = "error";
      state.list = [];
    });
  },
});

// selector
export const selectHeaders = createSelector(
  (state: RootState) => state.shipment.list,
  (list) => Object.keys(list[0] || {})
);

export const selectSortedShipmentList = createSelector(
  (state: RootState) => state.shipment.list,
  (state: RootState) => state.shipment.sort.column,
  (state: RootState) => state.shipment.sort.direction,
  (list, column, direction) => {
    const sortedList = [...list];
    if (column) {
      sortedList.sort((a, b) => {
        if (a[column] < b[column]) {
          return direction === "asc" ? -1 : 1;
        }
        if (a[column] > b[column]) {
          return direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedList;
  }
);

export const selectShipmentData = (state: RootState) => state.shipment.list;

export const { setShipment, selectShipment, updateShipment, deleteShipment, setSort } =
  shipmentSlice.actions;

export default shipmentSlice.reducer;
