import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loader: React.FC = () => (
  <div className="flex flex-col items-center">
    <FaSpinner className="w-8 h-8" />
    Loading...
  </div>
);

export default Loader;
