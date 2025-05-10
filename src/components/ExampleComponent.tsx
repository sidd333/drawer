'use client'

import { useFileDrawerStore } from "@/store/fileDrawerStore";
import { useState } from "react";

export const ExampleComponent: React.FC = () => {
  const { openDrawer } = useFileDrawerStore();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const handleUploadClick = () => {
    openDrawer(
      'example-component', // requestId
      (files) => {
        setSelectedFiles(files);
        console.log('Files selected:', files);
        // Handle your upload logic here
      },
      { multiple: true, accept: '.jpg,.png,.pdf' }
    );
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        File Upload Example
      </h2>
      <button
        onClick={handleUploadClick}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors shadow-sm"
      >
        Bulk Upload Files
      </button>

      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-medium mb-2 text-gray-700">
            Selected Files ({selectedFiles.length})
          </h3>
          <ul className="space-y-2">
            {selectedFiles.map((file, index) => (
              <li
                key={index}
                className="flex items-center p-2 bg-gray-50 rounded border border-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-sm truncate">{file.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};