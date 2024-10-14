import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to France-QA</h1>
      <p className="text-xl mb-8">Find your next job or mission in France's tech industry</p>
      <div className="space-x-4">
        <Link to="/jobs" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Browse Jobs
        </Link>
        <Link to="/register" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;