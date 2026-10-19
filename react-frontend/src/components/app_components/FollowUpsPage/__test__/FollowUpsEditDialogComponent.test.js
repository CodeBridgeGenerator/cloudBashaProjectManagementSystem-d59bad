import React from "react";
import { render, screen } from "@testing-library/react";

import FollowUpsEditDialogComponent from "../FollowUpsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders followUps edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FollowUpsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("followUps-edit-dialog-component")).toBeInTheDocument();
});
