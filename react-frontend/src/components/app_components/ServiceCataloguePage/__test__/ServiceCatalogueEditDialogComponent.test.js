import React from "react";
import { render, screen } from "@testing-library/react";

import ServiceCatalogueEditDialogComponent from "../ServiceCatalogueEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders serviceCatalogue edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServiceCatalogueEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("serviceCatalogue-edit-dialog-component")).toBeInTheDocument();
});
