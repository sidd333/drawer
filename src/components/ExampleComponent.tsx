'use client'

import { useState } from "react";
import { GlobeAltIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { FileSidebar, FileSelectionResult, RemoteFile } from "./FileSidebar";

export const ExampleComponent: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedRemoteFiles, setSelectedRemoteFiles] = useState<RemoteFile[]>(
    []
  );

  const handleUploadClick = () => {
    setIsDrawerOpen(true);
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  const handleSelect = (result: FileSelectionResult) => {
    const { localFiles, remoteFiles } = result;
    setSelectedFiles(localFiles);
    setSelectedRemoteFiles(remoteFiles);

    console.log("Files selected:", { localFiles, remoteFiles });

    // Example of how to process different types of files
    localFiles.forEach((file) => {
      console.log(`Local file: ${file.name} (${file.size} bytes)`);
      // Here you could upload the local file to S3
      // AWS S3 upload would use the file binary data directly
    });

    remoteFiles.forEach((file) => {
      console.log(`Remote file: ${file.name} (${file.url})`);
      // Here you could fetch the remote file and then upload it
      // Or pass the URL directly to your backend to handle
    });
  };

  // Calculate total number of files
  const totalFiles = selectedFiles.length + selectedRemoteFiles.length;

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

      {totalFiles > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-medium mb-2 text-gray-700">
            Selected Files ({totalFiles})
          </h3>

          {selectedFiles.length > 0 && (
            <>
              <h4 className="text-sm font-medium mb-1 text-gray-600">
                Local Files
              </h4>
              <ul className="space-y-2 mb-3">
                {selectedFiles.map((file, index) => (
                  <li
                    key={`local-${index}`}
                    className="flex items-center p-2 bg-gray-50 rounded border border-gray-200"
                  >
                    <DocumentIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <div className="text-sm truncate flex-1">
                      <span className="block font-medium truncate">
                        {file.name}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {selectedRemoteFiles.length > 0 && (
            <>
              <h4 className="text-sm font-medium mb-1 text-gray-600">
                Remote Files
              </h4>
              <ul className="space-y-2">
                {selectedRemoteFiles.map((file, index) => (
                  <li
                    key={`remote-${index}`}
                    className="flex items-center p-2 bg-gray-50 rounded border border-gray-200"
                  >
                    <GlobeAltIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <div className="text-sm truncate flex-1">
                      <span className="block font-medium truncate">
                        {file.name}
                      </span>
                      <span className="block text-xs text-gray-500 truncate">
                        {file.url}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <FileSidebar
        isOpen={isDrawerOpen}
        onClose={handleClose}
        onSelect={handleSelect}
        options={{
          multiple: true,
          accept: ".jpg,.png,.pdf",
          allowRemote: true,
        }}
      />
    </div>
  );
};