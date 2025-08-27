import React, { useState } from 'react';
import { SettingsIcon, FilterIcon, SearchIcon } from '../assets/icons/Icon';
import NewPromptModal from '@/components/NewPromptModal';
import { Button } from '@/components/ui/button';
import { PromptsTable } from '@/components/PromptsTable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';

const PromptsPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="p-4 h-fit mb-4 flex flex-col gap-6 lg:gap-8 sm:p-6 lg:p-8">
                <div className="flex items-center text-sm text-[#667085]">
                    <div className="flex gap-1 items-center">
                        <SettingsIcon className="w-5 h-5" fill="#667085" />
                        <span className="font-semibold text-gray-500">Settings</span>
                    </div>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="font-semibold text-[#605BFF] lg:text-gray-800">Prompts</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Prompts</h1>
                        <p className="mt-1 text-[#667085]">Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                    <Button onClick={() => setIsModalOpen(true)} className="mt-4 bg-[#605BFF] w-[105px] lg:w-[131px] sm:mt-0">
                        New prompt
                    </Button>
                </div>

                <div className="flex flex-col border h-fit border-gray-200 rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex flex-row h-full justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-700">All Prompts</h2>
                            <div className="flex items-center gap-2">
                                {/* Mobile Kebab Menu Dropdown */}
                                <div className="lg:hidden">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="shadow-none data-[state=open]:bg-gray-100">
                                                <MoreVertical className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <SearchIcon className="mr-2 h-4 w-4" />
                                                <span>Search</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <FilterIcon className="mr-2 h-4 w-4" />
                                                <span>Filter</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                {/* Desktop Filter and Search */}
                                <Button variant="outline" className="hidden lg:flex items-center text-gray-600">
                                    <FilterIcon />
                                    <span className="ml-2">Filter</span>
                                </Button>
                                <div className="relative hidden lg:block">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <SearchIcon />
                                    </span>
                                    <Input type="text" placeholder="Search in list..." className="pl-10" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <PromptsTable/>

                </div>
            </div>
            {isModalOpen && <NewPromptModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default PromptsPage;