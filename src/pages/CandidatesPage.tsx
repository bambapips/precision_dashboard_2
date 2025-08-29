import React, { useState } from "react";
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronLeft, MoreVertical, SearchIcon, Trash2, Eye, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { candidatesData, type Candidate } from "@/data/candidates";

// --- Sub-components for this page ---

const ScoreIndicator = ({ score }) => {
    const getColor = () => {
        if (score > 80) return "#18B368"; 
        if (score > 50) return "#1570EF"; 
        return "#EDA12F"; 
    };
    const color = getColor();
    const circumference = 2 * Math.PI * 18;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center w-12 h-12">
            <svg className="w-full h-full" viewBox="0 0 40 40">
                <circle className="text-gray-200" strokeWidth="4" stroke="currentColor" fill="transparent" r="18" cx="20" cy="20" />
                <circle
                    className="transition-all duration-500"
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke={color}
                    fill="transparent"
                    r="18"
                    cx="20"
                    cy="20"
                    transform="rotate(-90 20 20)"
                />
            </svg>
            <span className="absolute text-sm font-semibold" style={{ color }}>{score}%</span>
        </div>
    );
};

const SummaryCard = ({ title, value, description, tSize }) => (
    <div className="flex-col w-fit p-4 bg-white rounded-lg">
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-[${tSize}] gap-2 flex items-center font-bold mt-1`}>{value + " "} <span className="font-medium text-[12px] ">{description && "Assessed"}</span>  </p>
        {description && <p className={`text-[${tSize}] gap-2 font-bold flex items-center mt-1`}>{description + " "} <span className="font-medium text-[12px]">Interviewed</span></p>}
    </div>
);

// --- Page Columns and Components ---

const columns: ColumnDef<Candidate>[] = [
    { id: "select", header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} />, cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />, },
    { accessorKey: "id", header: "S/N", cell: ({ row }) => <div className="text-[#667085]">{row.original.id}</div> },
    { accessorKey: "name", header: "Name", cell: ({ row }) => <div><p className="font-medium text-black">{row.original.name}</p><p className="text-sm text-[#667085]">{row.original.email}</p></div> },
    { accessorKey: "date", header: "Date", cell: ({ row }) => <div className="text-[#667085]">{row.original.date}</div> },
    { accessorKey: "assessmentScore", header: "Assessment score", cell: ({ row }) => <ScoreIndicator score={row.original.assessmentScore} /> },
    { accessorKey: "interviewScore", header: "Interview score", cell: ({ row }) => <ScoreIndicator score={row.original.interviewScore} /> },
    { id: "actions", header: "Actions", cell: () => (<DropdownMenu><DropdownMenuTrigger asChild><Button className="w-fit hover:bg-transarent text-[#175CD3] bg-transparent justify-between">Move <ChevronDown className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>Action 1</DropdownMenuItem><DropdownMenuItem>Action 2</DropdownMenuItem></DropdownMenuContent></DropdownMenu>) },
];

const MobileCandidateCard = ({ candidate }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border bg-gray-50 rounded-lg mb-3">
            <div className="p-4 flex items-center gap-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="text-sm font-medium text-gray-500">{candidate.id}</div>
                <div className="flex-1">
                    <p className="font-semibold text-black">{candidate.name}</p>
                    <p className="text-sm text-[#667085]">{candidate.email}</p>
                </div>
                <div className="text-sm text-gray-600">{candidate.date}</div>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            {isOpen && (
                <div className="p-4 border-t border-gray-100">
                    <div className="flex flex-col gap-4 justify-around items-center mb-4">
                        <div className="flex w-full items-center justify-between">
                            <p className="text-[12px] text-center text-gray-500 mb-1">Assessment</p>
                            <ScoreIndicator score={candidate.assessmentScore} />
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <p className="text-[12px] text-center text-gray-500 mb-1">Interview</p>
                            <ScoreIndicator score={candidate.interviewScore} />
                        </div>
                    </div>
                    <div className="flex w-full justify-between gap-2">
                        <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4 mr-1" /> Delete</Button>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm"><Eye className="w-4 h-4 mr-1" /> Preview</Button>
                            <Button size="sm"><Edit className="w-4 h-4 mr-1" /> Edit</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Main Page Component ---

const CandidatesPage = ({ setPath }) => {
    const [data] = useState(candidatesData);
    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel() });

    return (
        <div className="p-6 lg:p-8 bg-[#F5F9FF] h-fit">
            <button onClick={() => setPath('/talent-bank/my-talents')} className="flex items-center text-sm text-gray-600 hover:text-black mb-4">
                <ChevronLeft className="w-4 h-4 mr-1" /> My Talents / Candidates
            </button>

            <h1 className="py-2 text-[20px] text-[#012169]">My Talents</h1>

            <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-6 lg:gap-4 gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="bg-[#D1E9FF] text-[12px] lg:text-[16px] lg:w-fit w-[133px] font-medium text-[#012169] flex items-center h-8 justify-between">
                            Product Manager <ChevronDown className="h-5 w-5 lg:ml-4" />
                        </Button>
                    </DropdownMenuTrigger>
                </DropdownMenu>
            </div>

            {/* Summary Cards */}
            <div className="flex p-4 justify-between rounded-lg flex-col bg-white lg:flex-row gap-0 mb-8">
                <SummaryCard title="Total Candidates" value="20" tSize={"44px"} />
                <div className="hidden lg:block">
                    <SummaryCard title="Process" value="20" description="10" tSize={"28px"} />
                </div><div className="block lg:hidden">
                    <SummaryCard title="Process" value="20" description="10" tSize={"44px"} />
                </div>
                <SummaryCard title="Assessment Date" tSize={"18px"} value="11 Wed - 24 Sat, April" />
                <SummaryCard title="Interview Type" value="Virtual" />
                <SummaryCard title="Interview Date" tSize={"18px"} value="03 Wed - 06 Sat, 08 Mon - 11 Tue" />
            </div>

            {/* Candidates Table/List */}
            <div className="p-4 rounded-lg">
                <div className="flex flex-row justify-between lg:items-center mb-4">
                    <h2 className="text-[24px] text-[#012169] font-semibold text-gray-800 mb-4 lg:mb-0">Candidates <span className="text-white bg-[#012169] px-[13px] py-1 rounded-[12px] font-medium text-[14px]">20</span></h2>
                    <div className="flex items-center gap-2">

                        <div className="hidden lg:flex">
                            <Button className="bg-transparent" variant="outline">Sort by Scores</Button>
                            <Button className="bg-transparent" variant="outline">Sort by Metric</Button>
                            <div className="relative bg-white flex-1 lg:flex-initial">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input placeholder="Search" className="pl-10" />
                            </div>
                        </div>
                        <div className="lg:hidden"><Button variant="ghost" size="icon"><MoreVertical /></Button></div>
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden py-4 bg-white rounded-[12px] lg:block">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map(hg => (<TableRow key={hg.id}>{hg.headers.map(h => <TableHead key={h.id}>{flexRender(h.column.columnDef.header, h.getContext())}</TableHead>)}</TableRow>))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.map(row => (<TableRow key={row.id}>{row.getVisibleCells().map(cell => <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}</TableRow>))}
                        </TableBody>
                    </Table>
                </div>

                {/* Mobile Card List */}
                <div className="lg:hidden">
                    {data.map(candidate => <MobileCandidateCard key={candidate.id} candidate={candidate} />)}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>← Previous</Button>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: table.getPageCount() }, (_, i) => (
                            <Button className="bg-[#D1E9FF] text-[#000] hover:bg-white" key={i} variant={table.getState().pagination.pageIndex === i ? 'ghost' : 'default'} size="sm" onClick={() => table.setPageIndex(i)}>{i + 1}</Button>
                        ))}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next →</Button>
                </div>
            </div>
        </div>
    );
};

export default CandidatesPage;