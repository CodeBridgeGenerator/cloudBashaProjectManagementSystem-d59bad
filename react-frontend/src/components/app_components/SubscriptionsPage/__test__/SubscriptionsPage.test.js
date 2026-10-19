import React from "react";
import { render, screen } from "@testing-library/react";

import SubscriptionsPage from "../SubscriptionsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders subscriptions page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SubscriptionsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("subscriptions-datatable")).toBeInTheDocument();
    expect(screen.getByRole("subscriptions-add-button")).toBeInTheDocument();
});
