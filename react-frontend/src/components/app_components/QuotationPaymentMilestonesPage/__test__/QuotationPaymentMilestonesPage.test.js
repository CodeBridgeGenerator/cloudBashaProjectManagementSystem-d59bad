import React from "react";
import { render, screen } from "@testing-library/react";

import QuotationPaymentMilestonesPage from "../QuotationPaymentMilestonesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders quotationPaymentMilestones page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <QuotationPaymentMilestonesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("quotationPaymentMilestones-datatable")).toBeInTheDocument();
    expect(screen.getByRole("quotationPaymentMilestones-add-button")).toBeInTheDocument();
});
