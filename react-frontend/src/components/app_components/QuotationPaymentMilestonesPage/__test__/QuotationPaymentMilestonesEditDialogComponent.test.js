import React from "react";
import { render, screen } from "@testing-library/react";

import QuotationPaymentMilestonesEditDialogComponent from "../QuotationPaymentMilestonesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders quotationPaymentMilestones edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <QuotationPaymentMilestonesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("quotationPaymentMilestones-edit-dialog-component")).toBeInTheDocument();
});
