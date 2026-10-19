import React from "react";
import { render, screen } from "@testing-library/react";

import RenewalsPage from "../RenewalsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders renewals page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RenewalsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("renewals-datatable")).toBeInTheDocument();
    expect(screen.getByRole("renewals-add-button")).toBeInTheDocument();
});
