import React from "react";
import { render, screen } from "@testing-library/react";

import QuotationPaymentMilestonesCreateDialogComponent from "../QuotationPaymentMilestonesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders quotationPaymentMilestones create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <QuotationPaymentMilestonesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("quotationPaymentMilestones-create-dialog-component")).toBeInTheDocument();
});
