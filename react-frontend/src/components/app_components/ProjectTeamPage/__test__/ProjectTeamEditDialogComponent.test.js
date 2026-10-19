import React from "react";
import { render, screen } from "@testing-library/react";

import ProjectTeamEditDialogComponent from "../ProjectTeamEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders projectTeam edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProjectTeamEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("projectTeam-edit-dialog-component")).toBeInTheDocument();
});
