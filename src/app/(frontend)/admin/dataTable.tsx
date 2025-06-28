/* eslint-disable unused-imports/no-unused-vars */
"use client";

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // ── NEW: checkbox component
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type DataTableProps<TData extends { id: string }, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  /* ─────────────────── original state ─────────────────── */
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  /* ── NEW: row-selection state so we can track checked rows */
  const [rowSelection, setRowSelection] = useState({});

  const router = useRouter();

  /* ─────────────────── table instance ─────────────────── */
  const table = useReactTable({
    data,
    columns,
    /* keep original state + handlers */
    state: { sorting, columnFilters, rowSelection }, // ── NEW
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection, // ── NEW
    enableRowSelection: true, // ── NEW
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
    },
  });

  /* ── NEW: helper list of selected row IDs for bulk print */
  const selectedIds = table
    .getSelectedRowModel()
    .rows
.map((r) => (r.original as { id: string }).id);

  /* ─────────────────── UI ─────────────────── */
  return (
    <div className="space-y-4">
      {/* global search (unchanged) */}
      <Input
        placeholder="Search..."
        className="max-w-xs"
        value={(table.getState().columnFilters[0]?.value ?? "") as string}
        onChange={(e) =>
          table.getColumn("global")?.setFilterValue(e.target.value)
        }
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {/* ── NEW: checkbox header cell for “select all” */}
                <TableHead className="w-8">
                  <Checkbox
                    checked={
                      table.getIsSomeRowsSelected()
                        ? "indeterminate"
                        : table.getIsAllRowsSelected()
                    }
                    onCheckedChange={(v) =>
                      table.toggleAllPageRowsSelected(!!v)
                    }
                    aria-label="Select all rows"
                  />
                </TableHead>

                {/* original header cells untouched */}
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleGroupingHandler()}
                    className="cursor-pointer select-none"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getIsSorted() === "asc" && " ▲"}
                    {header.column.getIsSorted() === "desc" && " ▼"}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"} // ── NEW visual state
                className="cursor-pointer"
                /* ── NEW: single-row click goes to print page */
                onClick={() => router.push(`/admin/print/${row.original.id}`)}
              >
                {/* ── NEW: checkbox cell for row selection */}
                <TableCell
                  className="w-8"
                  onClick={(e) => e.stopPropagation()} // prevent row click
                >
                  <Checkbox
                    checked={
                      row.getIsSomeSelected()
                        ? "indeterminate"
                        : row.getIsSelected()
                    }
                    onCheckedChange={(v) => row.toggleSelected(!!v)}
                    aria-label="Select row"
                  />
                </TableCell>

                {/* original data cells untouched */}
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ── NEW: multi-print button (disabled until ≥2 rows) */}
      <Button
        variant="default"
        size="sm"
        disabled={selectedIds.length < 2}
        onClick={() =>
          router.push(`/admin/print/multi?ids=${selectedIds.join(",")}`)
        }
      >
        Print selected ({selectedIds.length})
      </Button>

      {/* pagination (unchanged) */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
