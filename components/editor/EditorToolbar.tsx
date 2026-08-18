"use client";

import React, { useCallback } from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Image as ImageIcon,
  Table as TableIcon,
  Link as LinkIcon,
  MessageSquare,
  Minus,
} from "lucide-react";
import { uploadImageAction } from "@/app/admin/(protected)/actions/upload";

interface EditorToolbarProps {
  editor: Editor;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  const addImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg, image/webp, image/gif";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be under 5MB");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);

        const result = await uploadImageAction(formData);

        if (result.error) {
          alert("Error: " + result.error);
          return;
        }

        if (result.url) {
          editor.chain().focus().setImage({ src: result.url }).run();
        }
      } catch (err: any) {
        alert("Error uploading image: " + err.message);
      }
    };
    input.click();
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  const toggleCallout = (type: string, title: string) => {
    editor.chain().focus().setCallout({ type, title }).run();
  };

  const ToolbarButton = ({
    onClick,
    isActive = false,
    disabled = false,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className={`p-1.5 rounded-md transition-colors flex items-center justify-center text-xs ${
        isActive
          ? "bg-sky-100 text-sky-800 font-semibold"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      } disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-200 bg-slate-50/90 z-10 select-none">
      {/* Headings */}
      <div className="flex items-center gap-0.5 pr-1.5 border-r border-slate-200">
        <ToolbarButton
          title="Heading 1"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Heading 2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Heading 3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive("heading", { level: 3 })}
        >
          <Heading3 className="w-3.5 h-3.5" />
        </ToolbarButton>
      </div>

      {/* Inline Marks */}
      <div className="flex items-center gap-0.5 px-1.5 border-r border-slate-200">
        <ToolbarButton
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <Strikethrough className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Insert Link"
          onClick={setLink}
          isActive={editor.isActive("link")}
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </ToolbarButton>
      </div>

      {/* Lists & Blocks */}
      <div className="flex items-center gap-0.5 px-1.5 border-r border-slate-200">
        <ToolbarButton
          title="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Numbered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
        >
          <Quote className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Divider Line"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="w-3.5 h-3.5" />
        </ToolbarButton>
      </div>

      {/* Callouts Dropdown */}
      <div className="flex items-center gap-0.5 px-1.5 border-r border-slate-200 relative group">
        <button
          type="button"
          title="Insert Clinical Callout"
          className="p-1.5 rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1 text-xs"
        >
          <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
          <span className="hidden sm:inline font-medium">Callout</span>
        </button>
        <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-slate-200 shadow-md rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col py-1 z-50">
          <button type="button" onClick={() => toggleCallout("key_point", "Key Concept")} className="px-3 py-1.5 text-xs text-left hover:bg-slate-50 text-slate-700">Key Concept</button>
          <button type="button" onClick={() => toggleCallout("clinical_note", "Clinical Consideration")} className="px-3 py-1.5 text-xs text-left hover:bg-slate-50 text-teal-700 font-medium">Clinical Consideration</button>
          <button type="button" onClick={() => toggleCallout("important", "Important Note")} className="px-3 py-1.5 text-xs text-left hover:bg-slate-50 text-rose-700 font-medium">Important Note</button>
          <button type="button" onClick={() => toggleCallout("exam_tip", "Board Review Point")} className="px-3 py-1.5 text-xs text-left hover:bg-slate-50 text-indigo-700">Board Review Point</button>
          <button type="button" onClick={() => toggleCallout("definition", "Definition")} className="px-3 py-1.5 text-xs text-left hover:bg-slate-50 text-slate-700">Definition</button>
          <button type="button" onClick={() => toggleCallout("warning", "Caution / Warning")} className="px-3 py-1.5 text-xs text-left hover:bg-slate-50 text-amber-700 font-medium">Caution / Warning</button>
        </div>
      </div>

      {/* Media & Tables */}
      <div className="flex items-center gap-0.5 px-1.5 border-r border-slate-200">
        <ToolbarButton title="Upload Image (5MB max)" onClick={addImage}>
          <ImageIcon className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Insert Table"
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        >
          <TableIcon className="w-3.5 h-3.5" />
        </ToolbarButton>
      </div>

      {/* History Actions */}
      <div className="flex items-center gap-0.5 pl-1.5 ml-auto">
        <ToolbarButton
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="w-3.5 h-3.5" />
        </ToolbarButton>
      </div>
    </div>
  );
}
