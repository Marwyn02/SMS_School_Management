import { Link } from "react-router";

import {
  AlertTriangle,
  BookOpen,
  Calendar,
  ChevronLeft,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
} from "lucide-react";

import type { TStudent } from "~/components/table/data";
import Container from "~/components/ui/container";

export default function StudentsProfile({ data }: { data: TStudent }) {
  return (
    <Container>
      <Link
        to={"/dashboard/students"}
        className="font-semibold text-sm flex items-center justify-center py-0.5 px-2 bg-gray-100 border border-gray-200 rounded-full w-min"
      >
        <ChevronLeft size={16} /> <p>Back</p>
      </Link>

      <section className="space-y-4 mt-8 text-sm">
        <section className="border p-3 rounded-md space-y-4 bg-gray-100">
          <div className="h-[120px] w-[120px] rounded-full bg-gray-200 border-8 border-white"></div>

          <section className="space-y-4">
            <div className="space-y-2">
              <p className="text-2xl font-semibold">{data.name}</p>
              <p className="h-6 w-max px-2 text-xs bg-gray-200 border border-gray-300 rounded-full flex items-center font-semibold">
                ID: {data.id}
              </p>
            </div>
            <div className="font-medium flex gap-x-6 items-center">
              <div className="flex items-center gap-x-1">
                <GraduationCap size={14} className="text-gray-600" />
                <p>Grade 11</p>
              </div>

              <div className="flex items-center gap-x-1">
                <Users size={14} className="text-gray-600" />
                <p>Section A</p>
              </div>

              <div className="flex items-center gap-x-1">
                <BookOpen size={14} className="text-gray-600" />
                <p>GPA: 3.85</p>
              </div>
            </div>
          </section>
        </section>

        <section className="border p-3 rounded-md space-y-4">
          <div className="flex items-center gap-x-2">
            <User size={18} />
            <h3 className="text-xl font-bold">Personal Information</h3>
          </div>

          <section className="space-y-4">
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Date of Birth</p>
              <div className="flex items-center gap-x-2">
                <Calendar size={14} className="text-gray-600" />
                <p className="font-medium">March 02 2001</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Address</p>
              <div className="flex items-center gap-x-2">
                <MapPin size={14} className="text-gray-600" />
                <p>GMA, Cavite</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Phone</p>
              <div className="flex items-center gap-x-2">
                <Phone size={14} className="text-gray-600" />
                <p>09192312978</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Email</p>
              <div className="flex items-center gap-x-2">
                <Mail size={14} className="text-gray-600" />
                <p>marwyn@example.com</p>
              </div>
            </div>
          </section>
        </section>

        <section className="border p-3 rounded-md space-y-4">
          <div className="flex items-center gap-x-2">
            <Users size={18} />
            <h3 className="text-xl font-bold">Guardian Information</h3>
          </div>

          <section className="space-y-4">
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Guardian Name</p>
              <p className="font-medium">Marwyn Sumargo</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Guardian Phone</p>
              <div className="flex items-center gap-x-2">
                <Phone size={14} className="text-gray-600" />
                <p>09192312978</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Guardian Email</p>
              <div className="flex items-center gap-x-2">
                <Mail size={14} className="text-gray-600" />
                <p>marwyn@example.com</p>
              </div>
            </div>
          </section>
        </section>

        <section className="border p-3 rounded-md space-y-4">
          <div className="flex items-center gap-x-2">
            <Heart size={18} className="text-red-500" />
            <h3 className="text-xl font-bold">Health & Emergency</h3>
          </div>

          <section className="space-y-4 divide-y-1 ">
            <div className="space-y-1 pb-3">
              <p className="text-gray-500 text-sm font-medium">
                Emergency Contact
              </p>
              <p className="font-medium">Redin Bala (Father)</p>
              <div className="flex items-center gap-x-2">
                <Phone size={14} className="text-red-600" />
                <p>09192312978</p>
              </div>
            </div>

            <section className="space-y-4">
              <div className="flex gap-x-2 items-center">
                <p className="text-gray-500 text-sm">Blood Type</p>
                <p className="h-5 w-10 flex items-center justify-center font-semibold bg-red-200 border border-red-300 text-red-500  rounded-full">
                  0+
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Allergies</p>
                <p className="text-orange-300"> Peanuts</p>
              </div>

              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Medical Conditions</p>
                <p> Asthma - Inhaler Required</p>
              </div>
            </section>
          </section>
        </section>

        <section className="border p-3 rounded-md space-y-4">
          <div className="flex items-center gap-x-2">
            <BookOpen size={18} className="text-blue-500" />
            <h3 className="text-xl font-bold">Academic Records - 2025-2026</h3>
          </div>

          <section className="space-y-4">
            <div className="space-y-4 bg-blue-50 border border-blue-100 rounded-md p-4">
              <p className="text-gray-500 text-sm">Mathematics</p>

              <div className="flex justify-between items-center">
                <p className="flex items-center text-sm h-5 px-3 bg-blue-100 border border-blue-200 rounded-full font-medium text-blue-500">
                  A-
                </p>
                <p className="text-gray-500">92%</p>
              </div>
            </div>

            <div className="space-y-4 bg-blue-50 border border-blue-100 rounded-md p-4">
              <p className="text-gray-500 text-sm">English</p>

              <div className="flex justify-between items-center">
                <p className="flex items-center text-sm h-5 px-3 bg-blue-100 border border-blue-200 rounded-full font-medium text-blue-500">
                  A
                </p>
                <p className="text-gray-500">95%</p>
              </div>
            </div>

            <div className="space-y-4 bg-blue-50 border border-blue-100 rounded-md p-4">
              <p className="text-gray-500 text-sm">Science</p>

              <div className="flex justify-between items-center">
                <p className="flex items-center text-sm h-5 px-3 bg-blue-100 border border-blue-200 rounded-full font-medium text-blue-500">
                  B+
                </p>
                <p className="text-gray-500">88%</p>
              </div>
            </div>
          </section>
        </section>

        <section className="border p-3 rounded-md space-y-4">
          <div className="flex items-center gap-x-2">
            <AlertTriangle size={18} className="text-orange-400" />
            <h3 className="text-xl font-bold">Disciplinary Records</h3>
          </div>

          <section className="space-y-4">
            <div className="space-y-4 bg-gray-50 border border-gray-100 rounded-md p-4">
              <p className="text-gray-500 text-sm">None</p>
            </div>
          </section>
        </section>

        <section className="border p-3 rounded-md space-y-4">
          <h3 className="text-xl font-bold">Enrollment History</h3>

          <section className="space-y-4">
            <div className="space-y-4 bg-gray-50 border border-gray-100 rounded-md p-4">
              <p className="text-gray-700 font-semibold text-sm text-center">
                Admission Date
              </p>
              <p className="text-center text-gray-600">August 20, 2019</p>
            </div>

            <div className="space-y-4 bg-gray-50 border border-gray-100 rounded-md p-4">
              <p className="text-gray-700 font-semibold text-sm text-center">
                Current Level
              </p>
              <p className="text-center text-gray-600">Grade 11</p>
            </div>

            <div className="space-y-4 bg-gray-50 border border-gray-100 rounded-md p-4">
              <p className="text-gray-700 font-semibold text-sm text-center">
                Years Enrolled
              </p>
              <p className="text-center text-gray-600">5 Years</p>
            </div>
          </section>
        </section>
      </section>
    </Container>
  );
}
