import React from "react";
import { render, screen } from "@testing-library/react";

import OpportunitiesEditDialogComponent from "../OpportunitiesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders opportunities edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <OpportunitiesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("opportunities-edit-dialog-component")).toBeInTheDocument();
});
