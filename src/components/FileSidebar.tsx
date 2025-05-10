"use client";

import { useFileDrawerStore, RemoteFile } from "@/store/fileDrawerStore";
import { useState, useEffect } from "react";
import {
  XMarkIcon,
  DocumentIcon,
  GlobeAltIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export const FileSidebar: React.FC = () => {
  const { isOpen, options, closeDrawer, selectFiles } = useFileDrawerStore();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [remoteUrls, setRemoteUrls] = useState<RemoteFile[]>([]);
  const [newRemoteUrl, setNewRemoteUrl] = useState("");
  const [fileSelections, setFileSelections] = useState<{
    [key: string]: boolean;
  }>({});
  const [urlSelections, setUrlSelections] = useState<{
    [key: string]: boolean;
  }>({});
  const [activeTab, setActiveTab] = useState<"local" | "remote">("local");
  const [urlError, setUrlError] = useState("");

  useEffect(() => {
    // Reset selections when drawer opens/closes
    if (isOpen) {
      setSelectedFiles([]);
      setRemoteUrls([]);
      setNewRemoteUrl("");
      setFileSelections({});
      setUrlSelections({});
      setActiveTab("local");
      setUrlError("");
    }
  }, [isOpen]);

  useEffect(() => {
    console.log("Selected Files:", selectedFiles);
    console.log("Remote URLs:", remoteUrls);
  }, [selectedFiles, remoteUrls]);

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

  const handleToggleUrl = (urlKey: string) => {
    setUrlSelections((prev) => ({
      ...prev,
      [urlKey]: !prev[urlKey],
    }));
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleAddRemoteUrl = () => {
    if (!newRemoteUrl.trim()) {
      setUrlError("URL cannot be empty");
      return;
    }

    if (!validateUrl(newRemoteUrl)) {
      setUrlError("Please enter a valid URL");
      return;
    }

    setUrlError("");

    // Extract filename from URL
    const urlObj = new URL(newRemoteUrl);
    const pathSegments = urlObj.pathname.split("/");
    const fileName = pathSegments[pathSegments.length - 1] || "remote-file";

    const newRemoteFile: RemoteFile = {
      url: newRemoteUrl,
      name: fileName,
      type: fileName.split(".").pop() || "unknown",
    };

    const newUrls = [...remoteUrls, newRemoteFile];
    setRemoteUrls(newUrls);

    // Add to selections
    const urlKey = `${newRemoteFile.url}-${remoteUrls.length}`;
    setUrlSelections((prev) => ({
      ...prev,
      [urlKey]: true,
    }));

    setNewRemoteUrl("");
  };

  const handleAddFiles = () => {
    // Filter selected local files
    const selectedLocalFiles = selectedFiles.filter(
      (file, index) => fileSelections[`${file.name}-${index}`]
    );

    // Filter selected remote files
    const selectedRemoteFiles = remoteUrls.filter(
      (file, index) => urlSelections[`${file.url}-${index}`]
    );

    console.log("Submitting files:", {
      selectedLocalFiles,
      selectedRemoteFiles,
    });

    if (selectedLocalFiles.length > 0 || selectedRemoteFiles.length > 0) {
      selectFiles(selectedLocalFiles, selectedRemoteFiles);
    }
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

      {options.allowRemote && (
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("local")}
            className={`flex-1 py-2 font-medium text-center ${
              activeTab === "local"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <DocumentIcon className="h-5 w-5 inline-block mr-1" />
            Local Files
          </button>
          <button
            onClick={() => setActiveTab("remote")}
            className={`flex-1 py-2 font-medium text-center ${
              activeTab === "remote"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <GlobeAltIcon className="h-5 w-5 inline-block mr-1" />
            Remote URLs
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "local" && (
          <>
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
                <h4 className="font-medium text-gray-700 mb-2">
                  Selected Files
                </h4>
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
          </>
        )}

        {activeTab === "remote" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add Remote File URL
              </label>
              <div className="flex">
                <input
                  type="url"
                  value={newRemoteUrl}
                  onChange={(e) => setNewRemoteUrl(e.target.value)}
                  placeholder="https://example.com/file.pdf"
                  className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleAddRemoteUrl}
                  className="bg-blue-50 text-blue-700 border border-l-0 border-gray-300 rounded-r-md px-3 py-2 text-sm hover:bg-blue-100"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>
              {urlError && (
                <p className="mt-1 text-sm text-red-600">{urlError}</p>
              )}
            </div>

            {remoteUrls.length > 0 && (
              <div className="mt-2">
                <h4 className="font-medium text-gray-700 mb-2">Remote Files</h4>
                <ul className="space-y-2">
                  {remoteUrls.map((file, index) => {
                    const urlKey = `${file.url}-${index}`;
                    return (
                      <li
                        key={urlKey}
                        className="flex items-center p-2 rounded border border-gray-200"
                      >
                        <input
                          type="checkbox"
                          id={urlKey}
                          checked={urlSelections[urlKey]}
                          onChange={() => handleToggleUrl(urlKey)}
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <label htmlFor={urlKey} className="truncate flex-1">
                          <span className="text-sm font-medium block">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-500 block truncate">
                            {file.url}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      <div className="p-4 border-t">
        <button
          onClick={handleAddFiles}
          disabled={
            activeTab === "local"
              ? selectedFiles.length === 0 ||
                Object.values(fileSelections).every((v) => !v)
              : remoteUrls.length === 0 ||
                Object.values(urlSelections).every((v) => !v)
          }
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:hover:bg-blue-600"
        >
          Add Files
        </button>
      </div>
    </div>
  );
};
