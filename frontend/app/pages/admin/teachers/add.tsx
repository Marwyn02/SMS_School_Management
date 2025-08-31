import AddTeachersForm from "~/components/form/teachers/AddTeachersForm";

export default function AddTeachers() {
  return (
    <main>
      <div className="container mx-auto px-4 pt-28 pb-5 space-y-5">
        <h1 className="text-2xl font-bold">Add Teacher Page</h1>

        <AddTeachersForm />
      </div>
    </main>
  );
}
