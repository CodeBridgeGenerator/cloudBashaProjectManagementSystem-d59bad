import React from "react";
import { render, screen } from "@testing-library/react";

import ProjectTeamPage from "../ProjectTeamPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders projectTeam page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProjectTeamPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("projectTeam-datatable")).toBeInTheDocument();
    expect(screen.getByRole("projectTeam-add-button")).toBeInTheDocument();
});
