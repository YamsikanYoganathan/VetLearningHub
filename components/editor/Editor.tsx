"use client";

import React from "react";
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
import { Loader2 } from "lucide-react";

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
          "prose prose-zinc max-w-[68ch] mx-auto min-h-[420px] p-6 focus:outline-none focus:ring-0 leading-[1.75] text-foreground",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  if (!editor) {
    return (
      <div className="w-full min-h-[400px] border border-border/80 rounded-2xl bg-white flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-border/80 rounded-2xl shadow-xs overflow-hidden flex flex-col">
      <EditorToolbar editor={editor} />
      <div className="grow overflow-y-auto max-h-[800px] bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
