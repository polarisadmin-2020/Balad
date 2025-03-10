"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '../../utils/styles';

export interface FileItem {
  name: string;
  uploadStatus: 'pending' | 'uploading' | 'complete' | 'error';
  progress?: number;
  errorMessage?: string;
}

export interface FileUploadProps {
  multiple?: boolean;
  accept?: string;
  title?: string;
  fileTypesText?: string;
  actionName?: string;
  getUploadedFile?: (files: File[]) => void;
  maximumFilesSize?: number;
  uploadFileOverSize?: () => void;
  isUploading?: (uploading: boolean) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emitDeleteFile?: (file: FileItem, index: number) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  multiple = false,
  accept = "*",
  title = "Drop files here",
  fileTypesText = "Supported file types",
  actionName = "Select File",
  getUploadedFile,
  maximumFilesSize = 5, // 5MB default
  uploadFileOverSize,
  isUploading,
  onChange,
  emitDeleteFile
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
      if (onChange) onChange(e);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const oversizedFiles = newFiles.filter(file => file.size > maximumFilesSize * 1024 * 1024);
    
    if (oversizedFiles.length > 0) {
      if (uploadFileOverSize) uploadFileOverSize();
      return;
    }

    const fileItems: FileItem[] = newFiles.map(file => ({
      name: file.name,
      uploadStatus: 'pending',
      progress: 0
    }));

    setFiles(prev => [...prev, ...fileItems]);
    if (getUploadedFile) getUploadedFile(newFiles);
    if (isUploading) isUploading(true);

    // Simulate upload progress
    fileItems.forEach((item, index) => {
      simulateUpload(index);
    });
  };

  const simulateUpload = (index: number) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFiles(prev => {
        const newFiles = [...prev];
        newFiles[index] = {
          ...newFiles[index],
          uploadStatus: 'uploading',
          progress
        };
        return newFiles;
      });

      if (progress >= 100) {
        clearInterval(interval);
        setFiles(prev => {
          const newFiles = [...prev];
          newFiles[index] = {
            ...newFiles[index],
            uploadStatus: 'complete',
            progress: 100
          };
          return newFiles;
        });
        if (isUploading) isUploading(false);
      }
    }, 200);
  };

  const handleDelete = (index: number) => {
    const file = files[index];
    setFiles(prev => prev.filter((_, i) => i !== index));
    if (emitDeleteFile) emitDeleteFile(file, index);
  };

  const getStatusIcon = (status: string, progress?: number) => {
    switch (status) {
      case 'uploading':
        return (
          <div className="relative">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            {progress !== undefined && (
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">
                {progress}%
              </span>
            )}
          </div>
        );
      case 'complete':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={handleFileInput}
        />
        
        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{fileTypesText}</p>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {actionName}
        </button>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div>{getStatusIcon(file.uploadStatus, file.progress)}</div>
                <span className="text-sm font-medium">{file.name}</span>
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;