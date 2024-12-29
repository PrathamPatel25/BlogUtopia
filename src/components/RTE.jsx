import React, { useRef } from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "link",
  "image",
];

export default function RTE({ name, control, label, defaultValue = "" }) {
  const quillRef = useRef(null);

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-2 text-gray-700 dark:text-gray-200 font-medium">
          {label}
        </label>
      )}

      <div className="relative">
        <style>
          {`
            /* Base Quill reset */
            .quill {
              border: none !important;
            }
            
            /* Toolbar styling */
            .ql-toolbar.ql-snow {
              border: none !important;
              background: #f8fafc;
              padding: 12px;
              border-radius: 8px 8px 0 0;
            }
            
            /* Container styling */
            .ql-container.ql-snow {
              border: none !important;
              background: white;
              border-radius: 0 0 8px 8px;
            }
            
            /* Editor styling */
            .ql-editor {
              font-size: 16px;
              line-height: 1.6;
              padding: 20px;
              min-height: 500px;
              color: #1f2937;
            }

            /* Toolbar icons */
            .ql-toolbar .ql-stroke {
              stroke: #64748b;
            }
            
            .ql-toolbar .ql-fill {
              fill: #64748b;
            }
            
            .ql-toolbar button:hover .ql-stroke {
              stroke: #3b82f6;
            }
            
            .ql-toolbar button:hover .ql-fill {
              fill: #3b82f6;
            }

            /* Dark mode overrides */
            .dark .ql-toolbar.ql-snow {
              background: #1e293b !important;
            }
            
            .dark .ql-container.ql-snow {
              background: #0f172a !important;
            }
            
            .dark .ql-editor {
              color: #e2e8f0 !important;
            }
            
            .dark .ql-toolbar .ql-stroke {
              stroke: #94a3b8 !important;
            }
            
            .dark .ql-toolbar .ql-fill {
              fill: #94a3b8 !important;
            }
            
            .dark .ql-toolbar button:hover .ql-stroke {
              stroke: #60a5fa !important;
            }
            
            .dark .ql-toolbar button:hover .ql-fill {
              fill: #60a5fa !important;
            }

            /* Scrollbar styling */
            .ql-editor::-webkit-scrollbar {
              width: 8px;
            }
            
            .ql-editor::-webkit-scrollbar-track {
              background: #f1f5f9;
              border-radius: 4px;
            }
            
            .ql-editor::-webkit-scrollbar-thumb {
              background: #cbd5e1;
              border-radius: 4px;
            }
            
            .dark .ql-editor::-webkit-scrollbar-track {
              background: #1e293b;
            }
            
            .dark .ql-editor::-webkit-scrollbar-thumb {
              background: #475569;
            }
          `}
        </style>

        <Controller
          name={name || "content"}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <div className="shadow-sm dark:shadow-gray-800">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={value || defaultValue}
                onChange={onChange}
                modules={modules}
                formats={formats}
                className="rounded-lg overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-200"
                style={{
                  height: "600px",
                  maxHeight: "80vh",
                }}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
