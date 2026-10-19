import React from "react";
import { render, screen } from "@testing-library/react";

import ServiceCataloguePage from "../ServiceCataloguePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders serviceCatalogue page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServiceCataloguePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("serviceCatalogue-datatable")).toBeInTheDocument();
    expect(screen.getByRole("serviceCatalogue-add-button")).toBeInTheDocument();
});
