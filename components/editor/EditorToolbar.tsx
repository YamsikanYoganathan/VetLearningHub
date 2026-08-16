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
import { createClient } from "@/lib/supabase/client";

interface EditorToolbarProps {
  editor: Editor;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  const supabase = createClient();

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
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `notes/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("resources")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("resources").getPublicUrl(filePath);
        
        editor.chain().focus().setImage({ src: data.publicUrl }).run();
      } catch (err: any) {
        alert("Error uploading image: " + err.message);
      }
    };
    input.click();
  }, [editor, supabase]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
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
    title
  }: { 
    onClick: () => void, 
    isActive?: boolean, 
    disabled?: boolean, 
    children: React.ReactNode,
    title: string 
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
        isActive
          ? "bg-teal-100 text-teal-700"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-200 bg-slate-50 rounded-t-2xl sticky top-16 z-10">
      <div className="flex items-center gap-1 pr-2 border-r border-slate-200">
        <ToolbarButton
          title="Heading 1"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Heading 2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Heading 3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive("heading", { level: 3 })}
        >
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-slate-200">
        <ToolbarButton
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Link"
          onClick={setLink}
          isActive={editor.isActive("link")}
        >
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-slate-200">
        <ToolbarButton
          title="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Ordered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Horizontal Rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="w-4 h-4" />
        </ToolbarButton>
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-slate-200 relative group">
        {/* Callout Dropdown */}
        <button
          type="button"
          title="Insert Callout"
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center justify-center"
        >
          <MessageSquare className="w-4 h-4" />
        </button>
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 shadow-lg rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col py-1 z-50">
          <button type="button" onClick={() => toggleCallout('key_point', 'Key Point')} className="px-4 py-2 text-sm text-left hover:bg-slate-50 text-slate-700">Key Point</button>
          <button type="button" onClick={() => toggleCallout('clinical_note', 'Clinical Note')} className="px-4 py-2 text-sm text-left hover:bg-slate-50 text-slate-700">Clinical Note</button>
          <button type="button" onClick={() => toggleCallout('important', 'Important')} className="px-4 py-2 text-sm text-left hover:bg-slate-50 text-slate-700">Important</button>
          <button type="button" onClick={() => toggleCallout('exam_tip', 'Exam Tip')} className="px-4 py-2 text-sm text-left hover:bg-slate-50 text-slate-700">Exam Tip</button>
          <button type="button" onClick={() => toggleCallout('definition', 'Definition')} className="px-4 py-2 text-sm text-left hover:bg-slate-50 text-slate-700">Definition</button>
          <button type="button" onClick={() => toggleCallout('warning', 'Warning')} className="px-4 py-2 text-sm text-left hover:bg-red-50 text-red-600 font-medium">Warning</button>
        </div>
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-slate-200">
        <ToolbarButton title="Insert Image" onClick={addImage}>
          <ImageIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Insert Table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
          <TableIcon className="w-4 h-4" />
        </ToolbarButton>
      </div>

      <div className="flex items-center gap-1 pl-2 ml-auto">
        <ToolbarButton
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="w-4 h-4" />
        </ToolbarButton>
      </div>
    </div>
  );
}
