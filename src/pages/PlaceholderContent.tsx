import React from 'react';


interface PlaceholderProps {
  title: string;
}

const PlaceholderContent: React.FC<PlaceholderProps> = ({ title }) => (
  <div className="p-8">
    <h1 className="text-3xl font-bold">{title}</h1>
    <p className="mt-2 text-gray-600">Content for the {title} page goes here.</p>
  </div>
);

export default PlaceholderContent;

