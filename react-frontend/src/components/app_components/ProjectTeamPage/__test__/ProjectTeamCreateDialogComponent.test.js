import React from "react";
import { render, screen } from "@testing-library/react";

import ProjectTeamCreateDialogComponent from "../ProjectTeamCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders projectTeam create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProjectTeamCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("projectTeam-create-dialog-component")).toBeInTheDocument();
});
