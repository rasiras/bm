'use client';

import { useState } from 'react';
import { format } from 'date-fns';

// Mock report data
const reports = [
  {
    id: 1,
    title: 'Weekly Brand Mentions Report',
    description: 'Summary of brand mentions across all platforms for the past week',
    type: 'weekly',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    status: 'completed',
    downloadUrl: '#',
  },
  {
    id: 2,
    title: 'Monthly Sentiment Analysis',
    description: 'Detailed analysis of sentiment trends for the past month',
    type: 'monthly',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    status: 'completed',
    downloadUrl: '#',
  },
  {
    id: 3,
    title: 'Quarterly Competitor Analysis',
    description: 'Comparison with competitors based on social media presence',
    type: 'quarterly',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
    status: 'completed',
    downloadUrl: '#',
  },
  {
    id: 4,
    title: 'Annual Brand Health Report',
    description: 'Comprehensive analysis of brand health metrics for the year',
    type: 'annual',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365).toISOString(),
    status: 'completed',
    downloadUrl: '#',
  },
];

export default function ReportsPage() {
  const [selectedReportType, setSelectedReportType] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState(false);

  // Filter reports based on selected type
  const filteredReports = selectedReportType === 'all'
    ? reports
    : reports.filter(report => report.type === selectedReportType);

  // Handle report generation
  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      alert('Report generated successfully!');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <div className="flex items-center space-x-4">
          <button
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            onClick={handleGenerateReport}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate New Report'}
          </button>
        </div>
      </div>

      {/* Report Filters */}
      <div className="flex flex-col space-y-4 rounded-lg bg-white p-4 shadow sm:flex-row sm:space-x-4 sm:space-y-0">
        <div>
          <label htmlFor="reportType" className="block text-sm font-medium text-gray-700">
            Report Type
          </label>
          <select
            id="reportType"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={selectedReportType}
            onChange={(e) => setSelectedReportType(e.target.value)}
          >
            <option value="all">All Reports</option>
            <option value="weekly">Weekly Reports</option>
            <option value="monthly">Monthly Reports</option>
            <option value="quarterly">Quarterly Reports</option>
            <option value="annual">Annual Reports</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <ul className="divide-y divide-gray-200">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <li key={report.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{report.description}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        Generated on {format(new Date(report.date), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        report.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : report.status === 'processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                    <a
                      href={report.downloadUrl}
                      className="rounded-md bg-white px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-gray-500">No reports found for this type.</li>
          )}
        </ul>
      </div>

      {/* Scheduled Reports */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900">Scheduled Reports</h2>
        <div className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Report Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Frequency
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Next Run
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Recipients
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">Weekly Summary</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">Every Monday at 9:00 AM</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {format(new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">marketing@example.com</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">Monthly Analysis</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">1st of every month</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {format(new Date(Date.now() + 1000 * 60 * 60 * 24 * 15), 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">ceo@example.com, cto@example.com</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4">
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Schedule New Report
          </button>
        </div>
      </div>
    </div>
  );
} 