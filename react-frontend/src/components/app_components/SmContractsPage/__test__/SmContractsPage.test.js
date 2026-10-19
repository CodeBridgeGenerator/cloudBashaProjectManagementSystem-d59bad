import React from "react";
import { render, screen } from "@testing-library/react";

import SmContractsPage from "../SmContractsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders smContracts page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SmContractsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("smContracts-datatable")).toBeInTheDocument();
    expect(screen.getByRole("smContracts-add-button")).toBeInTheDocument();
});
