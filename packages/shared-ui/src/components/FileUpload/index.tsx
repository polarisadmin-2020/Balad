"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '../../utils/styles';

export interface FileItem {
  name: string;
  uploadStatus: 'pending' | 'uploading' | 'complete' | 'error';
  progress?: number;
  errorMessage?: string;
}

export interface FileUploadProps {
  id?: string;
  name?: string;
  multiple: boolean;
  accept?: string;
  title?: string;
  fileTypesText?: string;
  actionName?: string;
  getUploadedFile?: (files: FileItem[]) => void;
  maximumFilesSize?: number;
  uploadFileOverSize?: () => void;
  isUploading?: (event: boolean) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emitDeleteFile?: (file: FileItem, index: number) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  name,
  multiple,
  accept,
  title = "Drop files here",
  fileTypesText = "Supported file types: JPG, PNG, PDF",
  actionName = "Choose File",
  getUploadedFile,
  maximumFilesSize = 5,
  uploadFileOverSize,
  isUploading,
  onChange,
  emitDeleteFile
}) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const handleFiles = (selectedFiles: File[]) => {
    const newFiles: FileItem[] = selectedFiles.map(file => ({
      name: file.name,
      uploadStatus: 'pending',
      progress: 0
    }));

    if (multiple) {
      setFiles(prev => [...prev, ...newFiles]);
    } else {
      setFiles(newFiles);
    }

    if (getUploadedFile) {
      getUploadedFile(newFiles);
    }
  };

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    setFiles(prev => prev.filter((_, i) => i !== index));
    
    if (emitDeleteFile) {
      emitDeleteFile(fileToRemove, index);
    }
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center",
          isDragging ? "border-primary bg-primary/10" : "border-gray-300",
          "transition-colors duration-200"
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-4 text-lg font-medium">{title}</p>
        <p className="mt-2 text-sm text-gray-500">{fileTypesText}</p>
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          {actionName}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          id={id}
          name={name}
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={handleFileInput}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {file.uploadStatus === 'complete' && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {file.uploadStatus === 'error' && (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="text-sm font-medium">{file.name}</span>
              </div>
              <button
                type="button"
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;