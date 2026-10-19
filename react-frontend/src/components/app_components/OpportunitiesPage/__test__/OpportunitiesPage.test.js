import React from "react";
import { render, screen } from "@testing-library/react";

import OpportunitiesPage from "../OpportunitiesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders opportunities page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <OpportunitiesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("opportunities-datatable")).toBeInTheDocument();
    expect(screen.getByRole("opportunities-add-button")).toBeInTheDocument();
});
