export type Candidate = {
  id: string;
  name: string;
  email: string;
  date: string;
  assessmentScore: number;
  interviewScore: number;
};

export const candidatesData: Candidate[] = [
  { id: '001', name: 'Jane Doe', email: 'janedoe@example.com', date: '12/11/2024', assessmentScore: 92, interviewScore: 92 },
  { id: '002', name: 'Jane Doe', email: 'janedoe@example.com', date: '12/11/2024', assessmentScore: 76, interviewScore: 76 },
  { id: '003', name: 'Jane Doe', email: 'janedoe@example.com', date: '12/11/2024', assessmentScore: 40, interviewScore: 40 },
  { id: '004', name: 'Jane Doe', email: 'janedoe@example.com', date: '12/11/2024', assessmentScore: 85, interviewScore: 85 },
  { id: '005', name: 'Jane Doe', email: 'janedoe@example.com', date: '12/11/2024', assessmentScore: 92, interviewScore: 92 },
  { id: '006', name: 'Jane Doe', email: 'janedoe@example.com', date: '12/11/2024', assessmentScore: 85, interviewScore: 85 },
  { id: '007', name: 'Jane Doe', email: 'janedoe@example.com', date: '12/11/2024', assessmentScore: 92, interviewScore: 92 },
  { id: '008', name: 'Jane Doe', email: 'janedoe@example.com', date: '12/11/2024', assessmentScore: 85, interviewScore: 85 },
  { id: '009', name: 'Jane Doe', email: 'janedoe@example.com', date: '12/11/2024', assessmentScore: 92, interviewScore: 92 },
  { id: '010', name: 'Jane Doe', email: 'janedoe@example.com', date: '12/11/2024', assessmentScore: 85, interviewScore: 85 },
];