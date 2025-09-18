import { useEffect, useState } from "react";
import { getStudents, type TStudents } from "app/components/table/data";

import Container from "app/components/ui/container";
import StudentsProfile from "~/components/admin/students/StudentsProfile";

export default function StudentView({ studentId }: { studentId: string }) {
  const [studentData, setStudentData] = useState<TStudents | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudents();
        const found = data.find((item: TStudents) => item.id === studentId);
        setStudentData(found ?? null);
      } catch (err) {
        console.error("Error fetching student:", err);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchStudent();
    } else {
      setLoading(false);
    }
  }, [studentId]);

  if (loading)
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );

  if (!studentData)
    return (
      <Container>
        <p>Student not found</p>
      </Container>
    );

  return <StudentsProfile data={studentData} />;
}
