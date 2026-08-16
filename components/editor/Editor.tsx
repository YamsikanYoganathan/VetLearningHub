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
          "prose prose-slate max-w-none min-h-[400px] p-6 focus:outline-none focus:ring-0",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  // Re-sync content if initialContent changes completely (e.g. loading a different note)
  useEffect(() => {
    if (editor && initialContent && !editor.isDestroyed) {
      // Only set if editor is currently empty or if it's completely different
      // To avoid cursor jumping, we only rely on initialContent for the very first load
      // The parent shouldn't constantly update initialContent on every stroke.
    }
  }, [editor, initialContent]);

  if (!editor) {
    return (
      <div className="w-full min-h-[400px] border border-slate-200 rounded-2xl bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-2 text-slate-400">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin"></div>
          <span className="text-sm font-semibold">Loading editor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <EditorToolbar editor={editor} />
      <div className="flex-grow overflow-y-auto max-h-[800px] bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
