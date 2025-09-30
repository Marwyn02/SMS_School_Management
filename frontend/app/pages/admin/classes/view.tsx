import { useEffect, useState } from "react";
import { getClasses, type TClasses } from "app/components/table/data";

import Container from "app/components/ui/container";
import ClassesProfile from "~/components/admin/classes/ClassesProfile";
import { ProtectedRoute } from "~/protection/ProtectedRoute";
import { useClasses } from "~/hooks/useClasses";

export default function ClassesView({ classId }: { classId: string }) {
  const { data: classes = [], isLoading, isError, refetch } = useClasses();

  const data = classes.find((s) => s.id === classId);

  if (isLoading)
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );

  if (!data)
    return (
      <Container>
        <p>Class not found</p>
      </Container>
    );

  return <ClassesProfile data={data} />;
}
