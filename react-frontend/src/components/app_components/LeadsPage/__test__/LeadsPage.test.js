import React from "react";
import { render, screen } from "@testing-library/react";

import LeadsPage from "../LeadsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders leads page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LeadsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("leads-datatable")).toBeInTheDocument();
    expect(screen.getByRole("leads-add-button")).toBeInTheDocument();
});
