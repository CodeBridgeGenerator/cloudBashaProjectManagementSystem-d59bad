import React from "react";
import { render, screen } from "@testing-library/react";

import ClientsPage from "../ClientsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders clients page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ClientsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("clients-datatable")).toBeInTheDocument();
    expect(screen.getByRole("clients-add-button")).toBeInTheDocument();
});
