'use client';

import { useDropzone } from 'react-dropzone';
import { useRef } from 'react';
import { File, UploadCloud, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const FileUpload = ({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: (files: File[]) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (newFiles: File[]) => {
    setFiles([...files, ...newFiles]);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });
  return (
    <div className="w-full" {...getRootProps()}>
      <div
        onClick={handleClick}
        className={cn(
          'w-full block relative',
          'rounded-lg cursor-pointer',
          'bg-muted h-32 flex items-center overflow-auto',
          'border border-dashed border-muted-foreground/70',
          'group/file',
          'transition-all duration-300',
          isDragActive && 'border-primary'
        )}
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          className="hidden absolute"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
        />
        <div
          className={cn(
            'flex flex-col',
            'items-center justify-center',
            'rounded-lg flex-1',
            files.length > 0 && 'basis-1/4'
          )}
        >
          <UploadCloud className="size-12 text-primary" />
          {files.length < 1 && (
            <p className="text-sm text-center">
              Drag and drop your files here <br /> or click to upload.
            </p>
          )}
        </div>
        {files.length > 0 && (
          <div className="flex flex-col basis-3/4 p-4 h-full gap-1 justify-center items-center border-l border-dashed border-muted-foreground/70 overflow-y-auto">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex flex-row gap-2 p-2 justify-between rounded-md bg-secondary w-full"
              >
                <div className="inline-flex items-center gap-1">
                  <File className="w-4 h-4" />
                  <p className="text-sm">{file.name}</p>
                  <div className="bg-muted text-center px-2 py-1 rounded-full text-xs ml-2">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                </div>
                <div
                  className="inline-flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFiles(files.filter((f) => f.name !== file.name));
                  }}
                >
                  <X className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
