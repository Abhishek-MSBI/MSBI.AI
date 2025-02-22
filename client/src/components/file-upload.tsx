import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFilesSelected: (files: string[]) => void;
}

export function FileUpload({ onFilesSelected }: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    try {
      const fileContents = await Promise.all(
        files.map(async (file) => {
          const text = await file.text();
          return text;
        })
      );
      onFilesSelected(fileContents);
    } catch (error) {
      console.error("Error reading files:", error);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
    onFilesSelected([]);
  };

  return (
    <div className="pt-4 border-t border-gray-800">
      <Button
        variant="outline"
        onClick={() => document.getElementById("file-upload")?.click()}
        className="gap-2 text-gray-400 border-gray-800 hover:text-gray-200 hover:bg-gray-900/50 hover:border-gray-700 transition-colors"
      >
        <Upload className="h-4 w-4" />
        Upload Files
      </Button>
      <input
        id="file-upload"
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
        onChange={handleFileChange}
      />

      {selectedFiles.length > 0 && (
        <div className="space-y-2 mt-4">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-900/50 rounded-md border border-gray-800"
            >
              <span className="text-sm truncate text-gray-400">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}