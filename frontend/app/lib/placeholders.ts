export interface SelectOption {
  value: string;
  label: string;
}

export const all_grade_levels: SelectOption[] = [
  { value: "grade1", label: "Grade 1" },
  { value: "grade2", label: "Grade 2" },
  { value: "grade3", label: "Grade 3" },
  { value: "grade4", label: "Grade 4" },
  { value: "grade5", label: "Grade 5" },
  { value: "grade6", label: "Grade 6" },
  { value: "grade7", label: "Grade 7" },
  { value: "grade8", label: "Grade 8" },
  { value: "grade9", label: "Grade 9" },
  { value: "grade10", label: "Grade 10" },
  { value: "grade11", label: "Grade 11" },
  { value: "grade12", label: "Grade 12" },
];

export const all_sections: SelectOption[] = [
  { value: "Section A", label: "Section A" },
  { value: "Section B", label: "Section B" },
  { value: "Section C", label: "Section C" },
  { value: "Section D", label: "Section D" },
];

export const gradeLevels: Record<string, SelectOption[]> = {
  elementary: [
    { value: "grade1", label: "Grade 1" },
    { value: "grade2", label: "Grade 2" },
    { value: "grade3", label: "Grade 3" },
    { value: "grade4", label: "Grade 4" },
    { value: "grade5", label: "Grade 5" },
    { value: "grade6", label: "Grade 6" },
  ],
  highschool: [
    { value: "grade7", label: "Grade 7" },
    { value: "grade8", label: "Grade 8" },
    { value: "grade9", label: "Grade 9" },
    { value: "grade10", label: "Grade 10" },
  ],
  seniorHighschool: [
    { value: "grade11", label: "Grade 11" },
    { value: "grade12", label: "Grade 12" },
  ],
};
