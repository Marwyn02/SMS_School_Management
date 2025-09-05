import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import AdmissionForm from "../../components/form/admission/AdmissionStudentForm";
import "@testing-library/jest-dom";
import { useAdmissionStore } from "app/stores/user/admissionStore";

describe("AdmissionForm", () => {
  function setup() {
    render(
      <MemoryRouter>
        <AdmissionForm />
      </MemoryRouter>
    );
  }

  it("renders all required fields", () => {
    setup();
    expect(screen.getByLabelText(/First name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Middle name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nationality/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Religion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Permanent address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Current address/i)).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    setup();
    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: "Juan" },
    });
    fireEvent.change(screen.getByLabelText(/Last name/i), {
      target: { value: "Dela Cruz" },
    });
    fireEvent.change(screen.getByLabelText(/Middle name/i), {
      target: { value: "Santos" },
    });
    // Simulate other required fields...
    fireEvent.change(screen.getByLabelText(/Nationality/i), {
      target: { value: "Filipino" },
    });
    fireEvent.change(screen.getByLabelText(/Religion/i), {
      target: { value: "Catholic" },
    });
    fireEvent.change(screen.getByLabelText(/Phone number/i), {
      target: { value: "09123456789" },
    });
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "juan@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/Permanent address/i), {
      target: { value: "Manila" },
    });
    fireEvent.change(screen.getByLabelText(/Current address/i), {
      target: { value: "Manila" },
    });
  });
});
