/**
 *  Test Scenario
 * 
 * ~ Header component
    * - should display user dropdown and logout button when the user is authenticated
    * - should display login button when the user is not authenticated
    * - should not display navigation links on login or register page
*/

import { cleanup, render, screen } from "@testing-library/react"
import { useSelector } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { afterEach, describe, expect, it, vi } from "vitest"
import Header from "./Header"

vi.mock("react-redux", () => ({
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
}))

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom")
    return {
        ...actual,
        useLocation: vi.fn(),
    }
})

import { useLocation } from "react-router-dom"

describe("Header Component", () => {
    afterEach(() => {
        cleanup()
    })

    it("should display user dropdown and logout button when the user is authenticated", () => {
        useSelector.mockReturnValue({
          id: "user-1",
          name: "User Test",
          avatar: "https://example.com/avatar.jpg"
        })
        useLocation.mockReturnValue({ pathname: "/" })
      
        render(
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        )
      
        expect(screen.getByText("Dicoding Forum App")).toBeTruthy()
        expect(screen.getByText("Leaderboard")).toBeTruthy()
        expect(screen.getByRole("button", { name: /user avatar/i })).toBeTruthy()
        expect(screen.getByText("Logout")).toBeTruthy()
      })
      
    it("should display login button when the user is not authenticated", () => {
        useSelector.mockReturnValue(null)
        useLocation.mockReturnValue({ pathname: "/" })
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )

        expect(screen.getByText("Dicoding Forum App")).toBeTruthy()
        expect(screen.getByText("Leaderboard")).toBeTruthy()
        expect(screen.getByText("Login")).toBeTruthy()
    })

    it("should not display navigation links on login or register page", () => {
        useSelector.mockReturnValue(null)
        useLocation.mockReturnValue({ pathname: "/login" })

        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )

        expect(screen.getByText("Dicoding Forum App")).toBeTruthy()
        expect(screen.queryByText("Leaderboard")).toBeNull()
        expect(screen.queryByText("Login")).toBeNull()
    })
})
