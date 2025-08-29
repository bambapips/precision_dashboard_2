import React from 'react';
import { UsersIcon } from '@/assets/icons/Icon';

interface TalentBankPageProps {
  setPath: (path: string) => void;
}

const TalentCard: React.FC<{
  title: string;
  lastUpdated: string;
  tags: string[];
  count: number;
  onClick: () => void;
}> = ({ title, lastUpdated, tags, count, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white p-4 rounded-lg shadow-md border border-gray-200 text-left w-full transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-sm text-gray-500 mb-4">Last updated: {lastUpdated}</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {tags.map((tag: string) => (
          <span key={tag} className={`text-xs font-medium px-2 py-1 rounded-full ${tag === 'Assessed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center text-gray-500">
        <UsersIcon className="w-4 h-4 mr-1" />
        <span>{count}</span>
      </div>
    </div>
  </button>
);


const TalentBankPage: React.FC<TalentBankPageProps> = ({ setPath }) => {
    const talents = [
        { title: 'Product Designer', lastUpdated: '12/02/2025', tags: ['Assessed', 'Interviewed'], count: 20 },
        { title: 'CEO', lastUpdated: '12/02/2025', tags: ['Interviewed'], count: 20 },
        { title: 'Product Manager', lastUpdated: '12/02/2025', tags: ['Interviewed'], count: 20 },
        { title: 'CEO', lastUpdated: '12/02/2025', tags: ['Interviewed'], count: 20 },
        { title: 'Product Designer', lastUpdated: '12/02/2025', tags: ['Assessed'], count: 20 },
        { title: 'Product Manager', lastUpdated: '12/02/2025', tags: ['Assessed', 'Interviewed'], count: 20 },
        { title: 'COO', lastUpdated: '12/02/2025', tags: ['Assessed', 'Interviewed'], count: 20 },
        { title: 'Product Manager', lastUpdated: '12/02/2025', tags: ['Assessed', 'Interviewed'], count: 20 },
        { title: 'Product Designer', lastUpdated: '12/02/2025', tags: ['Assessed'], count: 20 },
        { title: 'CFO', lastUpdated: '12/02/2025', tags: ['Assessed', 'Interviewed'], count: 20 },
        { title: 'Product Designer', lastUpdated: '12/02/2025', tags: [], count: 20 },
        { title: 'CFO', lastUpdated: '12/02/2025', tags: ['Assessed', 'Interviewed'], count: 20 },
    ];

  return (
    <div className="p-6 lg:p-8 bg-[#F5F9FF] h-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 lg:hidden">My Talents</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {talents.map((talent, index) => (
           <TalentCard
              key={index}
              {...talent}
              onClick={() => setPath(`/talent-bank/candidates/${talent.title.toLowerCase().replace(/ /g, '-')}`)}
           />
        ))}
      </div>
    </div>
  );
};

export default TalentBankPage;