"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type ChildRow = {
  id: string;
  guardian: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  classInFall: string;
  school: string | null;
  // createdAt: string;
};

export const columns: ColumnDef<ChildRow>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => row.getValue("firstName"),
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => row.getValue("lastName"),
  },
  {
    accessorKey: "guardian",
    header: "Guardian",
    cell: ({ row }) => row.getValue("guardian"),
  },
  {
    accessorKey: "classInFall",
    header: "Class In Fall",
  },
  {
    accessorKey: "school",
    header: "School",
  },
  // {
  //     accessorKey: 'createdAt',
  //     header: 'Registered',
  //     cell: ({ row }) => {
  //         const iso = row.getValue<string | null>("createdAt");
  //         if (!iso) return "";
  //         return new Intl.DateTimeFormat("en-US").format(new Date(iso));
  //     },
  // },
  {
    id: "global",
    accessorFn: (row) =>
      `S{row.firstName} ${row.lastName} ${row.guardian} ${row.school ?? ""}`,
    header: () => null,
    cell: () => null,
  },
];
