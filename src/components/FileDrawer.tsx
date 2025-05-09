'use client'

import { useFileDrawerStore } from "@/store/fileDrawerStore";
import { useState } from "react";

// 
export const FileDrawer: React.FC = () => {
    const { isOpen, options, closeDrawer, selectFiles } = useFileDrawerStore();
    const [files, setFiles] = useState<File[]>([]);
    
    if (!isOpen) return null;
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFiles(Array.from(e.target.files));
      }
    };
    
    return (
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Select Files</h3>
          <form onSubmit={(e) => { e.preventDefault(); selectFiles(files); }} className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 hover:border-blue-500 transition-colors">
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
            
            {files.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">{files.length} file(s) selected</p>
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              <button 
                type="button" 
                onClick={closeDrawer}
                className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
              >
                Select
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };