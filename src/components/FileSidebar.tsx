"use client";

import { useFileDrawerStore } from "@/store/fileDrawerStore";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const FileSidebar: React.FC = () => {
  const { isOpen, options, closeDrawer, selectFiles } = useFileDrawerStore();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileSelections, setFileSelections] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    // Reset selections when drawer opens/closes
    if (isOpen) {
      setSelectedFiles([]);
      setFileSelections({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(newFiles);

      // Initialize all files as selected
      const newSelections: { [key: string]: boolean } = {};
      newFiles.forEach((file, index) => {
        newSelections[`${file.name}-${index}`] = true;
      });
      setFileSelections(newSelections);
    }
  };

  const handleToggleFile = (fileKey: string) => {
    setFileSelections((prev) => ({
      ...prev,
      [fileKey]: !prev[fileKey],
    }));
  };

  const handleAddFiles = () => {
    // Filter only selected files
    const filesToAdd = selectedFiles.filter(
      (file, index) => fileSelections[`${file.name}-${index}`]
    );
    selectFiles(filesToAdd);
  };

  return (
    <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-xl z-50 flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-xl font-semibold text-gray-800">
          Bulk Upload Files
        </h3>
        <button
          onClick={closeDrawer}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
        >
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 hover:border-blue-500 transition-colors mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            multiple={options.multiple}
            accept={options.accept}
            className="w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-medium
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
          />
        </div>

        {selectedFiles.length > 0 && (
          <div className="mt-2">
            <h4 className="font-medium text-gray-700 mb-2">Selected Files</h4>
            <ul className="space-y-2">
              {selectedFiles.map((file, index) => {
                const fileKey = `${file.name}-${index}`;
                return (
                  <li
                    key={fileKey}
                    className="flex items-center p-2 rounded border border-gray-200"
                  >
                    <input
                      type="checkbox"
                      id={fileKey}
                      checked={fileSelections[fileKey]}
                      onChange={() => handleToggleFile(fileKey)}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <label
                      htmlFor={fileKey}
                      className="text-sm truncate flex-1"
                    >
                      {file.name}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <button
          onClick={handleAddFiles}
          disabled={
            selectedFiles.length === 0 ||
            Object.values(fileSelections).every((v) => !v)
          }
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:hover:bg-blue-600"
        >
          Add Files
        </button>
      </div>
    </div>
  );
};
