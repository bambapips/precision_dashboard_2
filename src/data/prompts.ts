export type PromptStatus = "Active" | "Closed" | "Scheduled" | "Drafts";

export type Prompt = {
  id: string;
  title: string;
  contentPreview: string;
  targetAudience: "All Users" | "Subscribers" | "Employees";
  status: PromptStatus;
  createdBy: string;
  createdOn: string;
};

export const promptsData: Prompt[] = [
  {
    id: "001",
    title: "Welcome Message",
    contentPreview: '"Welcome to our platform! Ge..."',
    targetAudience: "All Users",
    status: "Active",
    createdBy: "Admin",
    createdOn: "Oct 15, 2023",
  },
  {
    id: "002",
    title: "Monthly Update",
    contentPreview: '"Stay tuned for our latest upd..."',
    targetAudience: "Subscribers",
    status: "Closed",
    createdBy: "Admin",
    createdOn: "Oct 15, 2023",
  },
  {
    id: "003",
    title: "Training Announcement",
    contentPreview: '"New training session on Nov..."',
    targetAudience: "Employees",
    status: "Scheduled",
    createdBy: "Admin",
    createdOn: "Oct 28, 2023",
  },
  {
    id: "004",
    title: "Holiday Greetings",
    contentPreview: '"Wishing you a joyful holiday s..."',
    targetAudience: "All Users",
    status: "Drafts",
    createdBy: "HR Manager",
    createdOn: "Nov 1, 2023",
  },
  {
    id: "005",
    title: "Monthly Update",
    contentPreview: '"Stay tuned for our latest upd..."',
    targetAudience: "All Users",
    status: "Active",
    createdBy: "Admin",
    createdOn: "Nov 3, 2023",
  },
  {
    id: "006",
    title: "Billing Update",
    contentPreview: '"Your current plan is expiring s..."',
    targetAudience: "All Users",
    status: "Active",
    createdBy: "Admin",
    createdOn: "Nov 5, 2023",
  },
  {
    id: "007",
    title: "Feature Review",
    contentPreview: '"Introducing Assessment join us..."',
    targetAudience: "All Users",
    status: "Active",
    createdBy: "Admin",
    createdOn: "Nov 6, 2023",
  },
];