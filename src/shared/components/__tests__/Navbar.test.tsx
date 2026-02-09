import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";
import { Navbar } from "../Navbar";

describe("Navbar", () => {
  it("renders logo and navigation links", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  it("shows Login button when not logged in", () => {
    renderWithProviders(<Navbar />, {
      preloadedState: {
        auth: { token: null, isLoggedIn: false },
      },
    });
    expect(screen.getAllByText("Login").length).toBeGreaterThan(0);
  });

  it("shows Logout button when logged in", () => {
    renderWithProviders(<Navbar />, {
      preloadedState: {
        auth: { token: '"test-token"', isLoggedIn: true },
      },
    });
    expect(screen.getAllByText("Logout").length).toBeGreaterThan(0);
  });

  it("shows cart and wishlist icons", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getAllByLabelText("Cart").length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText("Wishlist").length).toBeGreaterThan(0);
  });
});
