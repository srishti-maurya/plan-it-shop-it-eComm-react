import { describe, it, expect, beforeEach, vi } from "vitest";
import { authReducer, setCredentials, clearCredentials } from "../authSlice";

const mockLocalStorage = {
  store: {} as Record<string, string>,
  getItem: vi.fn((key: string) => mockLocalStorage.store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => {
    mockLocalStorage.store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete mockLocalStorage.store[key];
  }),
  clear: vi.fn(() => {
    mockLocalStorage.store = {};
  }),
  get length() {
    return Object.keys(this.store).length;
  },
  key: vi.fn((_index: number) => null),
};

beforeEach(() => {
  mockLocalStorage.store = {};
  mockLocalStorage.getItem.mockClear();
  mockLocalStorage.setItem.mockClear();
  mockLocalStorage.removeItem.mockClear();
  Object.defineProperty(window, "localStorage", { value: mockLocalStorage });
});

describe("authSlice", () => {
  const initialState = { token: null, isLoggedIn: false };

  it("sets credentials", () => {
    const state = authReducer(initialState, setCredentials({ token: "abc123" }));
    expect(state.token).toBe("abc123");
    expect(state.isLoggedIn).toBe(true);
  });

  it("persists token to localStorage on setCredentials", () => {
    authReducer(initialState, setCredentials({ token: "abc123" }));
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith("token", JSON.stringify("abc123"));
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith("isLoggedIn", JSON.stringify(true));
  });

  it("clears credentials", () => {
    const loggedIn = { token: "abc123", isLoggedIn: true };
    const state = authReducer(loggedIn, clearCredentials());
    expect(state.token).toBeNull();
    expect(state.isLoggedIn).toBe(false);
  });

  it("removes from localStorage on clearCredentials", () => {
    authReducer({ token: "abc123", isLoggedIn: true }, clearCredentials());
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("token");
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("isLoggedIn");
  });
});
