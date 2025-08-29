export type TStudent = {
  id: string;
  name: string;
  status: "active" | "dropout" | "pending" | "graduated" | "inactive";
  email: string;
  year: string;
};

export type TTeachers = {
  id: string;
  name: string;
  status: "active" | "inactive";
  subject: string;
  email: string;
};

export type TClasses = {
  id: string;
  className: string;
  teacher: string;
  subject: string;
  studentsEnrolled: number;
  schedule: string;
};

export type TAdmission = {
  applicationId: string;
  name: string;
  gradeLevel: string;
  dateApplied: string;
  status:
    | "active"
    | "inactive"
    | "Pending"
    | "Approved"
    | "Rejected"
    | "Waitlisted";

  email: string;
};

export async function getData(): Promise<TStudent[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Redin Bala",
      status: "pending",
      email: "m@example.com",
      year: "4th year",
    },
    {
      id: "a12bc34d",
      name: "Jhun Marwyn",
      status: "active",
      email: "jhunmarwyn@example.com",
      year: "3rd year",
    },
    {
      id: "b45de67f",
      name: "Clara Santos",
      status: "graduated",
      email: "clara.santos@example.com",
      year: "4th year",
    },
    {
      id: "c56ef78g",
      name: "Miguel Reyes",
      status: "pending",
      email: "miguel.reyes@example.com",
      year: "2nd year",
    },
    {
      id: "d67fg89h",
      name: "Alyssa Cruz",
      status: "active",
      email: "alyssa.cruz@example.com",
      year: "1st year",
    },
    {
      id: "e78gh90i",
      name: "John Paul Dela Cruz",
      status: "inactive",
      email: "johnpaul@example.com",
      year: "3rd year",
    },
    {
      id: "f89hi01j",
      name: "Mara Villanueva",
      status: "pending",
      email: "mara.villanueva@example.com",
      year: "4th year",
    },
    {
      id: "g90ij12k",
      name: "Carlo Bautista",
      status: "active",
      email: "carlo.bautista@example.com",
      year: "2nd year",
    },
    {
      id: "h01jk23l",
      name: "Sofia Mendoza",
      status: "graduated",
      email: "sofia.mendoza@example.com",
      year: "4th year",
    },
    {
      id: "i12kl34m",
      name: "Patrick Ong",
      status: "pending",
      email: "patrick.ong@example.com",
      year: "1st year",
    },
    {
      id: "j23lm45n",
      name: "Andrea Lim",
      status: "active",
      email: "andrea.lim@example.com",
      year: "2nd year",
    },
    {
      id: "k34mn56o",
      name: "Francis Go",
      status: "inactive",
      email: "francis.go@example.com",
      year: "3rd year",
    },
    {
      id: "l45no67p",
      name: "Rachel Tan",
      status: "active",
      email: "rachel.tan@example.com",
      year: "1st year",
    },
    {
      id: "m56op78q",
      name: "Daniel Lee",
      status: "pending",
      email: "daniel.lee@example.com",
      year: "4th year",
    },
    {
      id: "n67pq89r",
      name: "Bianca Flores",
      status: "active",
      email: "bianca.flores@example.com",
      year: "2nd year",
    },
    {
      id: "o78qr90s",
      name: "Matthew Chua",
      status: "graduated",
      email: "matthew.chua@example.com",
      year: "4th year",
    },
    {
      id: "p89rs01t",
      name: "Katrina Sy",
      status: "pending",
      email: "katrina.sy@example.com",
      year: "3rd year",
    },
    {
      id: "q90st12u",
      name: "Vincent Ramos",
      status: "inactive",
      email: "vincent.ramos@example.com",
      year: "2nd year",
    },
    {
      id: "r01tu23v",
      name: "Angela Garcia",
      status: "active",
      email: "angela.garcia@example.com",
      year: "1st year",
    },
    {
      id: "s12uv34w",
      name: "Joseph Aquino",
      status: "pending",
      email: "joseph.aquino@example.com",
      year: "4th year",
    },
    {
      id: "t23vw45x",
      name: "Melissa Tan",
      status: "graduated",
      email: "melissa.tan@example.com",
      year: "4th year",
    },
    {
      id: "728ed52h",
      name: "Redin Bala",
      status: "active",
      email: "l@example.com",
      year: "4th year",
    },
    {
      id: "728ed52i",
      name: "Redin Bala",
      status: "active",
      email: "a@emaple.com",
      year: "4th year",
    },
    // ...
  ];
}

export async function getTeachers(): Promise<TTeachers[]> {
  return [
    {
      id: "t01",
      name: "Maria Santos",
      subject: "Mathematics",
      email: "maria.santos@example.com",
      status: "active",
    },
    {
      id: "t02",
      name: "Jose Ramirez",
      subject: "English",
      email: "jose.ramirez@example.com",
      status: "active",
    },
    {
      id: "t03",
      name: "Carmela Dela Cruz",
      subject: "Science",
      email: "carmela.delacruz@example.com",
      status: "inactive",
    },
    {
      id: "t04",
      name: "Ramon Villanueva",
      subject: "History",
      email: "ramon.villanueva@example.com",
      status: "active",
    },
    {
      id: "t05",
      name: "Angela Bautista",
      subject: "Computer Science",
      email: "angela.bautista@example.com",
      status: "active",
    },
    {
      id: "t06",
      name: "Francisco Tan",
      subject: "Physical Education",
      email: "francisco.tan@example.com",
      status: "active",
    },
    {
      id: "t07",
      name: "Melissa Ong",
      subject: "Filipino",
      email: "melissa.ong@example.com",
      status: "active",
    },
    {
      id: "t08",
      name: "Roberto Chua",
      subject: "Economics",
      email: "roberto.chua@example.com",
      status: "inactive",
    },
    {
      id: "t09",
      name: "Janine Flores",
      subject: "Biology",
      email: "janine.flores@example.com",
      status: "active",
    },
    {
      id: "t10",
      name: "Patrick Sy",
      subject: "Chemistry",
      email: "patrick.sy@example.com",
      status: "active",
    },
    {
      id: "t11",
      name: "Veronica Aquino",
      subject: "Arts",
      email: "veronica.aquino@example.com",
      status: "active",
    },
    {
      id: "t12",
      name: "Anthony Reyes",
      subject: "Physics",
      email: "anthony.reyes@example.com",
      status: "active",
    },
    {
      id: "t13",
      name: "Cynthia Lee",
      subject: "Music",
      email: "cynthia.lee@example.com",
      status: "active",
    },
    {
      id: "t14",
      name: "Mark Cruz",
      subject: "Geography",
      email: "mark.cruz@example.com",
      status: "active",
    },
    {
      id: "t15",
      name: "Sophia Mendoza",
      subject: "Literature",
      email: "sophia.mendoza@example.com",
      status: "active",
    },
  ];
}

export async function getClasses(): Promise<TClasses[]> {
  return [
    {
      id: "c01",
      className: "Grade 10 - Section A",
      subject: "Mathematics",
      teacher: "Maria Santos",
      studentsEnrolled: 35,
      schedule: "MWF 10:00–11:30 AM",
    },
    {
      id: "c02",
      className: "Grade 10 - Section B",
      subject: "Science",
      teacher: "Carmela Dela Cruz",
      studentsEnrolled: 32,
      schedule: "TTh 9:00–10:30 AM",
    },
    {
      id: "c03",
      className: "Grade 11 - Section A",
      subject: "English",
      teacher: "Jose Ramirez",
      studentsEnrolled: 28,
      schedule: "MWF 1:00–2:30 PM",
    },
    {
      id: "c04",
      className: "Grade 11 - Section B",
      subject: "History",
      teacher: "Ramon Villanueva",
      studentsEnrolled: 30,
      schedule: "TTh 2:00–3:30 PM",
    },
    {
      id: "c05",
      className: "Grade 12 - Section A",
      subject: "Physics",
      teacher: "Anthony Reyes",
      studentsEnrolled: 27,
      schedule: "MWF 3:00–4:30 PM",
    },
    {
      id: "c06",
      className: "Grade 12 - Section B",
      subject: "Chemistry",
      teacher: "Patrick Sy",
      studentsEnrolled: 29,
      schedule: "TTh 10:00–11:30 AM",
    },
    {
      id: "c07",
      className: "Grade 9 - Section A",
      subject: "Computer Science",
      teacher: "Angela Bautista",
      studentsEnrolled: 36,
      schedule: "MWF 8:00–9:30 AM",
    },
    {
      id: "c08",
      className: "Grade 9 - Section B",
      subject: "Biology",
      teacher: "Janine Flores",
      studentsEnrolled: 34,
      schedule: "TTh 1:00–2:30 PM",
    },
    {
      id: "c09",
      className: "Grade 8 - Section A",
      subject: "Filipino",
      teacher: "Melissa Ong",
      studentsEnrolled: 33,
      schedule: "MWF 11:00–12:30 PM",
    },
    {
      id: "c10",
      className: "Grade 8 - Section B",
      subject: "Economics",
      teacher: "Roberto Chua",
      studentsEnrolled: 31,
      schedule: "TTh 3:00–4:30 PM",
    },
    {
      id: "c11",
      className: "Grade 7 - Section A",
      subject: "Arts",
      teacher: "Veronica Aquino",
      studentsEnrolled: 37,
      schedule: "MWF 9:00–10:30 AM",
    },
    {
      id: "c12",
      className: "Grade 7 - Section B",
      subject: "Music",
      teacher: "Cynthia Lee",
      studentsEnrolled: 35,
      schedule: "TTh 8:00–9:30 AM",
    },
    {
      id: "c13",
      className: "Grade 11 - Section C",
      subject: "Geography",
      teacher: "Mark Cruz",
      studentsEnrolled: 26,
      schedule: "MWF 2:00–3:30 PM",
    },
    {
      id: "c14",
      className: "Grade 12 - Section C",
      subject: "Literature",
      teacher: "Sophia Mendoza",
      studentsEnrolled: 25,
      schedule: "TTh 4:00–5:30 PM",
    },
  ];
}

export async function getAdmission(): Promise<TAdmission[]> {
  // Fetch data from your API here.
  return [
    {
      applicationId: "A-001",
      name: "Juan Dela Cruz",
      gradeLevel: "Grade 10",
      email: "juan.dc@example.com",
      status: "Pending",
      dateApplied: "2025-08-01",
    },
    {
      applicationId: "A-002",
      name: "Maria Santos",
      gradeLevel: "Grade 11 - STEM",
      email: "maria.santos@example.com",
      status: "Approved",
      dateApplied: "2025-08-02",
    },
    {
      applicationId: "A-003",
      name: "Jose Ramirez",
      gradeLevel: "Grade 12 - HUMSS",
      email: "jose.ramirez@example.com",
      status: "Rejected",
      dateApplied: "2025-08-02",
    },
    {
      applicationId: "A-004",
      name: "Carmela Dela Cruz",
      gradeLevel: "Grade 9",
      email: "carmela.dc@example.com",
      status: "Pending",
      dateApplied: "2025-08-03",
    },
    {
      applicationId: "A-005",
      name: "Mark Cruz",
      gradeLevel: "Grade 11 - ABM",
      email: "mark.cruz@example.com",
      status: "Waitlisted",
      dateApplied: "2025-08-03",
    },
    {
      applicationId: "A-006",
      name: "Angela Bautista",
      gradeLevel: "Grade 8",
      email: "angela.b@example.com",
      status: "Approved",
      dateApplied: "2025-08-04",
    },
    {
      applicationId: "A-007",
      name: "Roberto Chua",
      gradeLevel: "Grade 12 - STEM",
      email: "roberto.chua@example.com",
      status: "Pending",
      dateApplied: "2025-08-05",
    },
    {
      applicationId: "A-008",
      name: "Sophia Mendoza",
      gradeLevel: "Grade 11 - HUMSS",
      email: "sophia.mendoza@example.com",
      status: "Rejected",
      dateApplied: "2025-08-06",
    },
    {
      applicationId: "A-009",
      name: "Anthony Reyes",
      gradeLevel: "Grade 10",
      email: "anthony.reyes@example.com",
      status: "Pending",
      dateApplied: "2025-08-06",
    },
    {
      applicationId: "A-010",
      name: "Veronica Aquino",
      gradeLevel: "Grade 9",
      email: "veronica.aquino@example.com",
      status: "Approved",
      dateApplied: "2025-08-07",
    },
    {
      applicationId: "A-011",
      name: "Melissa Ong",
      gradeLevel: "Grade 8",
      email: "melissa.ong@example.com",
      status: "Pending",
      dateApplied: "2025-08-08",
    },
    {
      applicationId: "A-012",
      name: "Janine Flores",
      gradeLevel: "Grade 12 - ABM",
      email: "janine.flores@example.com",
      status: "Approved",
      dateApplied: "2025-08-08",
    },
    {
      applicationId: "A-013",
      name: "Patrick Sy",
      gradeLevel: "Grade 11 - STEM",
      email: "patrick.sy@example.com",
      status: "Waitlisted",
      dateApplied: "2025-08-09",
    },
    {
      applicationId: "A-014",
      name: "Ramon Villanueva",
      gradeLevel: "Grade 10",
      email: "ramon.v@example.com",
      status: "Rejected",
      dateApplied: "2025-08-10",
    },
    {
      applicationId: "A-015",
      name: "Cynthia Lee",
      gradeLevel: "Grade 9",
      email: "cynthia.lee@example.com",
      status: "Pending",
      dateApplied: "2025-08-11",
    },
    {
      applicationId: "A-016",
      name: "Mark Villena",
      gradeLevel: "Grade 8",
      email: "mark.villena@example.com",
      status: "Approved",
      dateApplied: "2025-08-11",
    },
    {
      applicationId: "A-017",
      name: "Clarisse Gomez",
      gradeLevel: "Grade 12 - HUMSS",
      email: "clarisse.gomez@example.com",
      status: "Pending",
      dateApplied: "2025-08-12",
    },
    {
      applicationId: "A-018",
      name: "Christian Dizon",
      gradeLevel: "Grade 11 - ABM",
      email: "christian.dizon@example.com",
      status: "Approved",
      dateApplied: "2025-08-12",
    },
    {
      applicationId: "A-019",
      name: "Gabrielle Tan",
      gradeLevel: "Grade 9",
      email: "gabrielle.tan@example.com",
      status: "Rejected",
      dateApplied: "2025-08-13",
    },
    {
      applicationId: "A-020",
      name: "Ethan Lim",
      gradeLevel: "Grade 10",
      email: "ethan.lim@example.com",
      status: "Pending",
      dateApplied: "2025-08-14",
    },
  ];
}
