import React from "react";
import { render, screen } from "@testing-library/react";

import DailyWorkLogsPage from "../DailyWorkLogsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders dailyWorkLogs page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DailyWorkLogsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("dailyWorkLogs-datatable")).toBeInTheDocument();
    expect(screen.getByRole("dailyWorkLogs-add-button")).toBeInTheDocument();
});
