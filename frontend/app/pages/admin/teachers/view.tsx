import { getTeachers, type TTeachers } from "app/components/table/data";
import { Link } from "react-router";

import Container from "app/components/ui/container";
import { useEffect, useState } from "react";

export default function Teacher({ teacherId }: { teacherId: string }) {
  const [teacherData, setTeacherData] = useState<TTeachers | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const data = await getTeachers();
        const found = data.find((item: TTeachers) => item.id === teacherId);
        setTeacherData(found ?? null);
      } catch (err) {
        console.error("Error fetching Teacher:", err);
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchTeacher();
    } else {
      setLoading(false);
    }
  }, [teacherId]);

  if (loading)
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );

  if (!teacherData)
    return (
      <Container>
        <p>Teacher not found</p>
      </Container>
    );

  return (
    <Container>
      <Link to={"/dashboard/Teachers"} className="font-semibold text-sm">
        Back
      </Link>

      <section className="space-y-4 mt-8 text-sm">
        <div className="border p-3 rounded-md">
          <p className="font-semibold">Teacher Name</p>
          <p className="uppercase">{teacherData.name}</p>
        </div>
        <div className="border p-3 rounded-md">
          <p className="font-semibold">Teacher Status</p>
          <p
            className={`font-semibold capitalize ${teacherData.status === "active" ? "text-green-700" : "text-red-400"}`}
          >
            {teacherData.status}
          </p>
        </div>
        <div className="border p-3 rounded-md">
          <p className="font-semibold">Teacher Email</p>
          <p>{teacherData.email}</p>
        </div>
        <div className="border p-3 rounded-md">
          <p className="font-semibold">Teacher Year</p>
          <p>{teacherData.subject}</p>
        </div>
      </section>
    </Container>
  );
}
