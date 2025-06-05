"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
// import { api } from "@/server/trpc/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Loader2, Upload, X } from "lucide-react";
import { Button } from "./button";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (url: string) => void;
  disabled?: boolean;
  className?: string;
}

export function ImageUpload({
  value = [],
  onChange,
  onRemove,
  disabled,
  className,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  // const { mutateAsync: createPresignedUrl } =
  //   api.upload.createPresignedUrl.useMutation();

  const onDrop = useCallback(
    // async (acceptedFiles: File[]) => {
      // try {
      //   setIsUploading(true);
      //   const uploadPromises = acceptedFiles.map(async (file) => {
      //     const response = await createPresignedUrl({
      //       filename: file.name,
      //       contentType: file.type,
      //     });

      //     if (!response) {
      //       throw new Error("Failed to get upload URL");
      //     }

      //     const { presignedUrl, publicUrl } = response;

      //     await fetch(presignedUrl, {
      //       method: "PUT",
      //       body: file,
      //       headers: {
      //         "Content-Type": file.type,
      //       },
      //     });

      //     return publicUrl;
      //   });

      //   const uploadedUrls = await Promise.all(uploadPromises);
      //   onChange([...value, ...uploadedUrls]);
      //   toast.success("Images uploaded successfully");
      // } catch (error) {
      //   console.error(error);
      //   toast.error("Failed to upload images");
      // } finally {
      //   setIsUploading(false);
      // }
    // },
    // [`createPresignedUrl`, onChange, value]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    // disabled: disabled || isUploading,
    multiple: true,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center rounded-lg border border-dashed p-6 transition-colors",
          isDragActive
            ? "border-primary bg-secondary/20"
            : "border-muted-foreground/25 hover:border-primary hover:bg-secondary/10",
          disabled && "cursor-not-allowed opacity-60",
          className
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            {isDragActive ? (
              <p>Drop the images here ...</p>
            ) : (
              <p>
                Drag & drop images here, or click to select
                <br />
                <span className="text-xs">
                  Supported formats: PNG, JPG, JPEG, GIF
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {isUploading && (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p className="text-sm text-muted-foreground">Uploading images...</p>
        </div>
      )}

      {value.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {value.map((url, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg border"
            >
              <Image
                src={url}
                alt={`Uploaded image ${index + 1}`}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => onRemove(url)}
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
