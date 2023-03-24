import {
  render,
  RenderResult,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { Provider } from "react-redux";
import TableComponent from "../components/Table";
import { setShipment, Shipment } from "../redux/shipmentSlice";
import { store } from "../redux/store";

const shipments: Shipment[] = [
  {
    orderNo: "re-786554-03700590-8445291",
    date: "9/11/2019",
    customer: "Gibraltar Industries, Inc.",
    trackingNo: "TP-907194-21216396-6228098",
    status: "'Shipped'",
    consignee: "Noble Midstream Partners LP",
    id: "1",
  },
];

const elementTimeout = 5_000;
const testTimeout = 10_000;

const renderComponent = (Component: React.FC<any>): RenderResult => {
  return render(
    <Provider store={store}>
      <Component />
    </Provider>
  );
};

// Table shows skeleton while data is loading
const waitForPageToLoad = async () => {
  await waitForElementToBeRemoved(() => screen.queryByTestId("skeleton-element"), {
    timeout: elementTimeout,
  });
};

const assertRowValue = async (rowIndex: number, expectedValue: string) => {
  // NB: adding +1 here to start from 1st Shipment row, otherwise 0 will point to header
  const row = screen.getAllByRole("row")[rowIndex + 1];
  const value = await within(row).findByText(expectedValue, {}, { timeout: elementTimeout });
  expect(value).toBeInTheDocument();
};

describe("Shipments table", () => {
  beforeEach(() => {
    store.dispatch(setShipment(shipments));
  });

  test("renders successfully when component initialized", () => {
    renderComponent(TableComponent);

    const tableElement = screen.getByRole("table");

    expect(tableElement).toBeInTheDocument();
  });

  test.each([["ORDERNO"], ["DATE"], ["CUSTOMER"], ["TRACKINGNO"], ["STATUS"], ["CONSIGNEE"]])(
    "should render %s header from payload",
    async (headerText) => {
      renderComponent(TableComponent);
      await waitForPageToLoad();

      const header = await screen.findByText(headerText, {}, { timeout: elementTimeout });

      expect(header).toBeInTheDocument();
    },
    testTimeout
  );

  test.each<keyof Shipment>(["orderNo", "date", "customer", "trackingNo", "status", "consignee"])(
    "should render %s entry value from payload",
    async (key) => {
      renderComponent(TableComponent);
      await waitForPageToLoad();

      const expectedValue = shipments[0][key];

      await assertRowValue(0, expectedValue);
    },
    testTimeout
  );
});
