import { type TStudent } from "app/components/table/data";
import { Link } from "react-router";

import Container from "app/components/ui/container";

export default async function StudentView({ data }: { data: TStudent }) {
  return (
    <Container>
      <Link to={"/dashboard/students"} className="font-semibold text-sm">
        Back
      </Link>

      <section className="space-y-4 mt-8 text-sm">
        <div className="border p-3 rounded-md">
          <p className="font-semibold">Student Name</p>
          <p className="uppercase">{data.name}</p>
        </div>
        <div className="border p-3 rounded-md">
          <p className="font-semibold">Student Status</p>
          <p
            className={`font-semibold capitalize ${data.status === "active" ? "text-green-700" : data.status === "pending" ? "text-orange-400" : "text-red-400"}`}
          >
            {data.status}
          </p>
        </div>
        <div className="border p-3 rounded-md">
          <p className="font-semibold">Student Email</p>
          <p>{data.email}</p>
        </div>
        <div className="border p-3 rounded-md">
          <p className="font-semibold">Student Year</p>
          <p>{data.year}</p>
        </div>
      </section>
    </Container>
  );
}
