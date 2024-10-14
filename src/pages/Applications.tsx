import React, { useState, useEffect } from 'react';
import { getUserApplications, updateApplicationStatus } from '../services/api';

interface Application {
  _id: string;
  job: {
    _id: string;
    title: string;
  };
  applicant: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  status: 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected';
}

const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getUserApplications();
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
    fetchApplications();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateApplicationStatus(id, newStatus);
      setApplications(prevApplications =>
        prevApplications.map(app =>
          app._id === id ? { ...app, status: newStatus as Application['status'] } : app
        )
      );
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Applications</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Job Title</th>
            <th className="border p-2">Applicant</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application._id}>
              <td className="border p-2">{application.job.title}</td>
              <td className="border p-2">{`${application.applicant.firstName} ${application.applicant.lastName}`}</td>
              <td className="border p-2">{application.status}</td>
              <td className="border p-2">
                <select
                  value={application.status}
                  onChange={(e) => handleUpdateStatus(application._id, e.target.value)}
                  className="bg-white border rounded px-2 py-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Applications;