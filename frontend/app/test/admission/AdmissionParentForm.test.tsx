import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom";
import AdmissionParentForm from "app/components/form/admission/AdmissionParentForm";

describe("AdmissionParentForm", () => {
  function setup() {
    render(
      <MemoryRouter>
        <AdmissionParentForm />
      </MemoryRouter>
    );
  }

  it("renders all required fields", () => {
    setup();
    expect(
      screen.getByLabelText(/Full Name of Father & Mother \/ Guardian/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Occupation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Address$/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Relationship to student/i)
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    setup();
    const saveButton = screen.getByRole("button", {
      name: /Save and Continue/i,
    });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Parents or Guardian name is required./i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Their occupation is required/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Their contact number is required/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Their email address is required/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Their home address is required/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/This is required/i)).toBeInTheDocument();
    });
  });

  it("submits the form with valid data", async () => {
    setup();
    fireEvent.change(
      screen.getByLabelText(/Full Name of Father & Mother \/ Guardian/i),
      { target: { value: "Pedro Dela Cruz" } }
    );
    fireEvent.change(screen.getByLabelText(/Occupation/i), {
      target: { value: "Engineer" },
    });
    fireEvent.change(screen.getByLabelText(/Contact Number/i), {
      target: { value: "09123456789" },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "pedro@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Address$/i), {
      target: { value: "Manila" },
    });
    fireEvent.change(screen.getByLabelText(/Relationship to student/i), {
      target: { value: "Father" },
    });

    const saveButton = screen.getByRole("button", {
      name: /Save and Continue/i,
    });
    fireEvent.click(saveButton);

    await waitFor(() => {
      // No validation errors should be present
      expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
    });
  });
});
