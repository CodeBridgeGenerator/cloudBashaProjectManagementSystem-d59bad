import React from "react";
import { render, screen } from "@testing-library/react";

import FollowUpsCreateDialogComponent from "../FollowUpsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders followUps create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FollowUpsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("followUps-create-dialog-component")).toBeInTheDocument();
});
