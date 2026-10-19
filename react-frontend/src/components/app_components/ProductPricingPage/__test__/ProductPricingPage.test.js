import React from "react";
import { render, screen } from "@testing-library/react";

import ProductPricingPage from "../ProductPricingPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders productPricing page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProductPricingPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("productPricing-datatable")).toBeInTheDocument();
    expect(screen.getByRole("productPricing-add-button")).toBeInTheDocument();
});
