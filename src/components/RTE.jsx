import React, { useEffect, useRef } from "react";
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
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value || defaultValue}
            onChange={onChange}
            modules={modules}
            formats={formats}
            className="bg-white rounded-md"
            style={{ height: "600px", maxHeight: "80vh" }}
          />
        )}
      />
    </div>
  );
}
