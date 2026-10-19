import React from "react";
import { render, screen } from "@testing-library/react";

import SmContractsEditDialogComponent from "../SmContractsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders smContracts edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SmContractsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("smContracts-edit-dialog-component")).toBeInTheDocument();
});
