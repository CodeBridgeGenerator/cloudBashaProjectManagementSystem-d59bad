import React from "react";
import { render, screen } from "@testing-library/react";

import SubscriptionsCreateDialogComponent from "../SubscriptionsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders subscriptions create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SubscriptionsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("subscriptions-create-dialog-component")).toBeInTheDocument();
});
