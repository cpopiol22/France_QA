import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getJobs } from '../services/api';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Freelance';
  salary: string;
  remoteWork: 'no-remote' | 'partial-remote' | 'full-remote';
  remoteDays?: number;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const getRemoteWorkText = (job: Job) => {
    switch (job.remoteWork) {
      case 'no-remote':
        return 'No remote work';
      case 'partial-remote':
        return `Partial remote (${job.remoteDays} days/week)`;
      case 'full-remote':
        return 'Full remote';
      default:
        return 'Unknown';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-gray-600">{job.type}</p>
            <p className="text-gray-600">{job.salary}</p>
            <p className="text-gray-600">{getRemoteWorkText(job)}</p>
            <Link to={`/jobs/${job._id}`} className="text-blue-600 hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;