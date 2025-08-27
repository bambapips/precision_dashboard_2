import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { X, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';

interface NewPromptModalProps {
  onClose: () => void;
}

const NewPromptModal: React.FC<NewPromptModalProps> = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const wordLimit = 200;

  // Simple word count logic
  const wordCount = message.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="w-full h-full absolute top-0 left-0 inset-0 z-50 flex items-center justify-center lg:justify-end bg-black/60 animate-in fade-in-0">
      <div className="bg-white rounded-xl lg:rounded-2xl w-full max-w-sm lg:max-w-[456px] p-6 m-4 flex flex-col gap-8 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">New Prompt</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8">
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="prompt-title" className="block text-sm font-medium text-gray-700 mb-1.5">
              Prompt title
            </label>
            <Input id="prompt-title" placeholder="A clear and concise title for the prompt." />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
              Message
            </label>
            <Textarea
              id="message"
              placeholder="The detailed content or message of the prompt."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px]"
            />
            <p className="text-right text-xs text-gray-500 mt-1.5">
              {wordCount}/{wordLimit} words
            </p>
          </div>

          <div>
            <label htmlFor="target-audience" className="block text-sm font-medium text-gray-700 mb-1.5">
              Target audience
            </label>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between font-normal text-gray-500">
                  <span>Please select</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                <DropdownMenuItem>All Users</DropdownMenuItem>
                <DropdownMenuItem>Subscribers</DropdownMenuItem>
                <DropdownMenuItem>Employees</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <label htmlFor="schedule-date" className="block text-sm font-medium text-gray-700 mb-1.5">
              Schedule Date and Time
            </label>
            <div className="relative">
                <Input id="schedule-date" type="text" placeholder="Please select" className="placeholder:text-gray-500" onFocus={(e) => e.target.type = 'datetime-local'} onBlur={(e) => e.target.type = 'text'}/>
                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1.5">
              Status
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between font-normal text-gray-500">
                  <span>Please select</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                <DropdownMenuItem>Draft</DropdownMenuItem>
                <DropdownMenuItem>Scheduled</DropdownMenuItem>
                <DropdownMenuItem>Sent</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t pt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewPromptModal;