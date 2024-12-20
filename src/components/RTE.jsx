import React, { useRef, useEffect } from "react";
import { Controller } from "react-hook-form";
import "quill/dist/quill.snow.css";
import Quill from "quill";

export default function RTE({ name, control, label, defaultValue = "" }) {
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(`#${name}-editor`, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });
    }
  }, [name]);

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          useEffect(() => {
            if (quillRef.current) {
              quillRef.current.root.innerHTML = value || defaultValue;
            }
          }, [value, defaultValue]);

          useEffect(() => {
            if (quillRef.current) {
              const handler = () => {
                onChange(quillRef.current.root.innerHTML);
              };
              quillRef.current.on("text-change", handler);
              return () => {
                quillRef.current.off("text-change", handler);
              };
            }
          }, [onChange]);

          return (
            <div
              id={`${name}-editor`}
              className="bg-white border rounded-md overflow-auto"
              style={{ height: "300px" }} // Fixed height
            />
          );
        }}
      />
    </div>
  );
}
