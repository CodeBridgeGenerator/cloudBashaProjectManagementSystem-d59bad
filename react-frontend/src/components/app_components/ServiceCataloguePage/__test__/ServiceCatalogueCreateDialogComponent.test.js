import React from "react";
import { render, screen } from "@testing-library/react";

import ServiceCatalogueCreateDialogComponent from "../ServiceCatalogueCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders serviceCatalogue create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServiceCatalogueCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("serviceCatalogue-create-dialog-component")).toBeInTheDocument();
});
