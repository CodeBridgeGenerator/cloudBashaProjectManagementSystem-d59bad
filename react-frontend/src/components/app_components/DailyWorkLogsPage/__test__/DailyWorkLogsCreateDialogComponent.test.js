import React from "react";
import { render, screen } from "@testing-library/react";

import DailyWorkLogsCreateDialogComponent from "../DailyWorkLogsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders dailyWorkLogs create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DailyWorkLogsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("dailyWorkLogs-create-dialog-component")).toBeInTheDocument();
});
