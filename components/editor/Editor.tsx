"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { CalloutExtension } from "./CalloutExtension";
import EditorToolbar from "./EditorToolbar";

interface EditorProps {
  initialContent?: any;
  onChange: (content: any) => void;
}

export default function Editor({ initialContent, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CalloutExtension,
    ],
    content: initialContent || { type: "doc", content: [] },
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-[65ch] mx-auto min-h-[420px] p-6 focus:outline-none focus:ring-0 leading-[1.75]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  if (!editor) {
    return (
      <div className="w-full min-h-[400px] border border-slate-200 rounded-xl bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-2 text-slate-400">
          <div className="w-6 h-6 border-2 border-slate-200 border-t-sky-600 rounded-full animate-spin" />
          <span className="text-xs font-medium">Initializing editor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col">
      <EditorToolbar editor={editor} />
      <div className="grow overflow-y-auto max-h-[800px] bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
