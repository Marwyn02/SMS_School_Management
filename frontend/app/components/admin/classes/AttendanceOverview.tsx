import { UserCheck } from "lucide-react";

export default function AttendanceOverview() {
  return (
    <section className="border p-3 rounded-md space-y-4">
      <div className="flex items-center gap-x-2">
        <UserCheck size={18} className="text-green-500" />
        <h3 className="text-xl font-bold">Attendance Overview</h3>
      </div>

      <section className="space-y-2">
        <div className="bg-blue-50 border border-gray-100 rounded-md p-4">
          <div className="flex justify-between items-center font-medium">
            <p>Redin Bala</p>
            <p>90%</p>
          </div>

          <div className="flex justify-between items-center text-gray-500 text-sm">
            <p>Grade 11</p>
            <p>20P / 3A</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-gray-100 rounded-md p-4">
          <div className="flex justify-between items-center font-medium">
            <p>Juan Dela Cruz</p>
            <p>90%</p>
          </div>

          <div className="flex justify-between items-center text-gray-500 text-sm">
            <p>Grade 11</p>
            <p>20P / 3A</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-gray-100 rounded-md p-4">
          <div className="flex justify-between items-center font-medium">
            <p>John Doe</p>
            <p>90%</p>
          </div>

          <div className="flex justify-between items-center text-gray-500 text-sm">
            <p>Grade 11</p>
            <p>20P / 3A</p>
          </div>
        </div>
      </section>
    </section>
  );
}
