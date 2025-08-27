import * as React from "react"
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal, ChevronDown, ChevronUp, Edit, Eye, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { promptsData, type Prompt, type PromptStatus } from "@/data/prompts"

// Helper to get status colors
const getStatusStyles = (status: PromptStatus) => {
    switch (status) {
        case "Active":
            return { dot: "bg-green-500", text: "text-green-700", background: "bg-[#E6FFF3B2]" };
        case "Closed":
            return { dot: "bg-red-500", text: "text-red-700", background: "bg-[#FFF2F0]" };
        case "Scheduled":
            return { dot: "bg-orange-500", text: "text-orange-700", background: "bg-[#FFF5E6]" };
        case "Drafts":
            return { dot: "bg-blue-500", text: "text-blue-700", background: "bg-[#E5E1FC66]" };
        default:
            return { dot: "bg-gray-500", text: "text-gray-700", background: "bg-[#444]" };
    }
};

// Desktop Table Columns Definition
const columns: ColumnDef<Prompt>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    { accessorKey: "id", header: "Prompt ID" },
    { accessorKey: "title", header: "Prompt title" },
    { accessorKey: "contentPreview", header: "Content preview" },
    { accessorKey: "targetAudience", header: "Target audience" },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as PromptStatus;
            const { dot, text, background } = getStatusStyles(status);
            return (
                <div className={`flex items-center w-fit rounded-[5px] p-2 gap-2 ${background}`}>
                    <span className={`h-2 w-2 rounded-full ${dot} `}></span>
                    <span className={text}>{status}</span>
                </div>
            );
        },
    },
    { accessorKey: "createdBy", header: "Created by" },
    { accessorKey: "createdOn", header: "Created on" },
    {
        id: "actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600 focus:text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

// Mobile Card Component
const PromptCard: React.FC<{ prompt: Prompt }> = ({ prompt }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { dot, text } = getStatusStyles(prompt.status);

    return (
        <div className="border bg-[#EAECF0] border-gray-200 rounded-lg mb-3">
            <div className="p-4 flex items-center gap-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="text-[12px] font-medium border-1 border-[#DFDEFF] text-gray-500 p-2 rounded-md">{prompt.id}</div>
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-[14px] text-gray-800">{prompt.title}</p>
                            <p className="lg:text-sm  text-[14px] text-gray-500">{prompt.contentPreview.substring(0, 20) + "..." + "\""}</p>
                        </div>

                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                        <span className={`h-2 w-2 rounded-full ${dot}`}></span>
                        <span className={`text-sm font-medium ${text}`}>{prompt.status}</span>
                    </div>
                    {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                </div>
            </div>
            {isOpen && (
                <div className="p-4 border-t border-gray-200">
                    <hr className="bg-[#EAECF0]"/>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex justify-between"><span>Audience:</span> <span className="font-medium text-gray-800">{prompt.targetAudience}</span></div>
                        <div className="flex justify-between"><span>Created By:</span> <span className="font-medium text-gray-800">{prompt.createdBy}</span></div>
                        <div className="flex justify-between"><span>Date Created:</span> <span className="font-medium text-gray-800">{prompt.createdOn}</span></div>
                    </div>
                    <div className="flex justify-between w-full gap-2">
                        <Button className="bg-transparent shadow-none  text-[12px] text-black">
                            <Trash2 className="h-3 w-3" /> Delete
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="outline" className="text-[12px]">
                                <Eye className="h-3 w-3" /> Preview
                            </Button>
                            <Button className="bg-[#605BFF] text-[12px]">
                                <Edit className="h-3 w-3" /> Edit
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

// Main Component
export const PromptsTable = () => {
    const [data] = React.useState(promptsData);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="w-full h-full">
            {/* Desktop Table View */}
            <div className="hidden lg:block">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-between space-x-2 p-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        &larr; Prev
                    </Button>
                    <div className="text-sm text-gray-600">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next &rarr;
                    </Button>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden h-fit p-4 space-y-3">
                {data.map((prompt) => <PromptCard key={prompt.id} prompt={prompt} />)}
            </div>
        </div>
    );
};