import React from "react";
import { render, screen } from "@testing-library/react";

import SmItemsPage from "../SmItemsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders smItems page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SmItemsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("smItems-datatable")).toBeInTheDocument();
    expect(screen.getByRole("smItems-add-button")).toBeInTheDocument();
});
