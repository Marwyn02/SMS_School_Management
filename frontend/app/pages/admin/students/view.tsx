import { useEffect, useState } from "react";
import { getData, type TStudent } from "app/components/table/data";

import Container from "app/components/ui/container";
import StudentsProfile from "~/components/admin/students/StudentsProfile";

export default function StudentView({ studentId }: { studentId: string }) {
  const [studentData, setStudentData] = useState<TStudent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getData();
        const found = data.find((item: TStudent) => item.id === studentId);
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
