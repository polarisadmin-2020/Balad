import { CustomAttribute } from '../../shared';
import { default as React } from 'react';

export interface FileItem {
    name: string;
    uploadStatus: "pending" | "uploading" | "complete" | "error";
    progress?: number;
    errorMessage?: string;
}
export interface FileUploadProps {
    id?: string;
    name?: string;
    multiple: boolean;
    accept?: string;
    customAttribute?: CustomAttribute;
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
declare const FileUpload: React.FC<FileUploadProps>;
export default FileUpload;
