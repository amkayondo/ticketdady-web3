'use client'

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/components/shadcnui/table"
import { Skeleton } from "@ui/components/shadcnui/skeleton"

interface DataTableProps<TData> {
  columns: {
    header: string
    accessorKey?: keyof TData
    cell?: (item: TData) => React.ReactNode
  }[]
  data: TData[]
  isLoading?: boolean
}

export function DataTable<TData>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData>) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.header}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.header}>
                  {column.cell
                    ? column.cell(item)
                    : column.accessorKey
                    ? String(item[column.accessorKey])
                    : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
