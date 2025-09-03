import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdmissionGradeLevelForm from "app/components/form/admission/AdmissionGradeLevelForm";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom";

describe("AdmissionGradeLevelForm", () => {
  function setup() {
    render(
      <MemoryRouter>
        <AdmissionGradeLevelForm />
      </MemoryRouter>
    );
  }

  it("renders all required fields", () => {
    setup();
    expect(screen.getByLabelText(/Previous School/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Grade Level/i)).toBeInTheDocument();
  });

  it("shows academic strand dropdown only when Senior Highschool is selected", async () => {
    setup();
    const gradeLevelButton = screen.getByRole("combobox", {
      name: "Grade Level",
    });
    fireEvent.click(gradeLevelButton);
    fireEvent.click(screen.getByText(/Senior Highschool/i));

    await waitFor(() => {
      expect(screen.getByLabelText(/Academic Strand/i)).toBeInTheDocument();
    });
  });

  it("does not show academic strand dropdown for other grade levels", async () => {
    setup();
    const gradeLevelButton = screen.getByRole("combobox", {
      name: "Grade Level",
    });
    fireEvent.click(gradeLevelButton);
    fireEvent.click(screen.getByText(/Elementary/i));

    await waitFor(() => {
      expect(
        screen.queryByLabelText(/Academic Strand/i)
      ).not.toBeInTheDocument();
    });
  });

  it("shows validation error if academic strand is not selected for Senior Highschool", async () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Previous School/i), {
      target: { value: "Sample School" },
    });
    fireEvent.click(screen.getByText(/Grade 10/i));
    const gradeLevelButton = screen.getByRole("combobox", {
      name: "Grade Level",
    });
    fireEvent.click(gradeLevelButton);
    fireEvent.click(screen.getByText(/Senior Highschool/i));

    const submitButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Academic strand is required for Senior Highschool/i)
      ).toBeInTheDocument();
    });
  });

  it("submits the form with valid data for Senior Highschool", async () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Previous School/i), {
      target: { value: "Sample School" },
    });
    fireEvent.click(screen.getByText(/Grade 10/i));
    const gradeLevelButton = screen.getByRole("combobox", {
      name: "Grade Level",
    });
    fireEvent.click(gradeLevelButton);
    fireEvent.click(screen.getByText(/Senior Highschool/i));

    await waitFor(() => {
      expect(screen.getByLabelText(/Academic Strand/i)).toBeInTheDocument();
    });

    const strandButton = screen.getByRole("combobox", {
      name: /Academic Strand/i,
    });
    fireEvent.click(strandButton);
    fireEvent.click(screen.getByText(/STEM/i));

    const submitButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText(/Academic strand is required for Senior Highschool/i)
      ).not.toBeInTheDocument();
    });
  });

  it("submits the form with valid data for non-SHS grade level", async () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Previous School/i), {
      target: { value: "Sample School" },
    });
    // fireEvent.click(screen.getByText(/Grade 5/i));
    const gradeLevelButton = screen.getByRole("combobox", {
      name: /Grade Level/i,
    });
    fireEvent.click(gradeLevelButton);
    fireEvent.click(screen.getByText(/Elementary/i));

    const submitButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText(/Academic strand is required for Senior Highschool/i)
      ).not.toBeInTheDocument();
    });
  });
});
