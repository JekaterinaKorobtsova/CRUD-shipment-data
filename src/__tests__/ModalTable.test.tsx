import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ModalTable from "../components/ModalTable";

const shipment = {
  orderNo: "re-786554-03700590-8445291",
  date: "9/11/2019",
  customer: "Gibraltar Industries, Inc.",
  trackingNo: "TP-907194-21216396-6228098",
  status: "'Shipped'",
  consignee: "Noble Midstream Partners LP",
};

describe("Modal Table", () => {
  let mockStore = configureStore([]);
  let store: any;
  let onCloseModal: any;
  let shipmentData: any;
  let isModalOpen: boolean;

  beforeEach(() => {
    store = mockStore({
      shipment: {
        list: [shipment],
      },
    });
    onCloseModal = jest.fn();
    shipmentData = shipment;
    isModalOpen = true;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should render modal with shipment details if shipment data was provided", () => {
    render(
      <Provider store={store}>
        <ModalTable
          isModalOpen={isModalOpen}
          onCloseModal={onCloseModal}
          shipmentData={shipmentData}
        />
      </Provider>
    );

    expect(screen.getByText("SHIPMENT DETAILS")).toBeInTheDocument();

    Object.entries(shipment).forEach(([key, value]) => {
      expect(screen.getByText(key)).toBeInTheDocument();
      expect(screen.getByTestId(key)).toHaveValue(value);
    });

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  test("should render a message if shipment data was not provided", () => {
    render(
      <Provider store={store}>
        <ModalTable isModalOpen={isModalOpen} onCloseModal={onCloseModal} />
      </Provider>
    );

    expect(screen.getByText("No shipment data available.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  test("should call onCloseModal when close button is clicked", () => {
    render(
      <Provider store={store}>
        <ModalTable isModalOpen={isModalOpen} onCloseModal={onCloseModal} />
      </Provider>
    );

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(onCloseModal).toHaveBeenCalledTimes(1);
  });

  test("should call onCloseModal when save button is clicked", () => {
    render(
      <Provider store={store}>
        <ModalTable isModalOpen={isModalOpen} onCloseModal={onCloseModal} />
      </Provider>
    );

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(onCloseModal).toHaveBeenCalledTimes(1);
  });
});
