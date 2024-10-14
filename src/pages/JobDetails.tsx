import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById, createApplication } from '../services/api';

interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  type: string;
  salary: string;
  remoteWork: string;
  remoteDays?: number;
}

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(id!);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      await createApplication(id!);
      alert('Application submitted successfully');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application');
    }
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-xl mb-2">{job.company}</p>
        <p className="text-gray-600 mb-2">{job.location}</p>
        <p className="text-gray-600 mb-2">{job.type}</p>
        <p className="text-gray-600 mb-2">Salary: {job.salary}</p>
        <p className="text-gray-600 mb-4">
          Remote Work: {job.remoteWork === 'partial-remote' ? `${job.remoteDays} days/week` : job.remoteWork}
        </p>
        <h3 className="text-lg font-semibold mb-2">Job Description</h3>
        <p className="mb-4">{job.description}</p>
        <button
          onClick={handleApply}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply for this job
        </button>
      </div>
    </div>
  );
};

export default JobDetails;