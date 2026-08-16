import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import React from 'react';
import { AlertTriangle, BookOpen, CheckCircle, Info, Lightbulb, Stethoscope } from 'lucide-react';

export interface CalloutOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    callout: {
      /**
       * Set a callout node
       */
      setCallout: (options: { type: string; title: string }) => ReturnType;
    };
  }
}

const CalloutComponent = (props: any) => {
  const { type, title } = props.node.attrs;

  const getIcon = () => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'clinical_note': return <Stethoscope className="w-5 h-5" />;
      case 'exam_tip': return <Lightbulb className="w-5 h-5" />;
      case 'important': return <CheckCircle className="w-5 h-5" />;
      case 'definition': return <BookOpen className="w-5 h-5" />;
      case 'key_point':
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case 'warning': return 'bg-red-50 border-red-200 text-red-900';
      case 'clinical_note': return 'bg-teal-50 border-teal-200 text-teal-900';
      case 'exam_tip': return 'bg-amber-50 border-amber-200 text-amber-900';
      case 'important': return 'bg-emerald-50 border-emerald-200 text-emerald-900';
      case 'definition': return 'bg-indigo-50 border-indigo-200 text-indigo-900';
      case 'key_point':
      default:
        return 'bg-sky-50 border-sky-200 text-sky-900';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'warning': return 'text-red-500';
      case 'clinical_note': return 'text-teal-500';
      case 'exam_tip': return 'text-amber-500';
      case 'important': return 'text-emerald-500';
      case 'definition': return 'text-indigo-500';
      case 'key_point':
      default:
        return 'text-sky-500';
    }
  };

  return (
    <NodeViewWrapper className={`my-6 rounded-xl border ${getColorClasses()} overflow-hidden`}>
      <div className={`px-4 py-3 border-b flex items-center gap-2 font-bold text-sm ${getColorClasses()} bg-opacity-50`}>
        <div className={getIconColor()}>
          {getIcon()}
        </div>
        <span>{title}</span>
      </div>
      <NodeViewContent className="px-4 py-3 text-sm prose-p:my-1 prose-p:last:mb-0" />
    </NodeViewWrapper>
  );
};

export const CalloutExtension = Node.create<CalloutOptions>({
  name: 'callout',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      type: {
        default: 'key_point',
        parseHTML: element => element.getAttribute('data-type'),
        renderHTML: attributes => {
          return {
            'data-type': attributes.type,
          }
        },
      },
      title: {
        default: 'Key Point',
        parseHTML: element => element.getAttribute('data-title'),
        renderHTML: attributes => {
          return {
            'data-title': attributes.title,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setCallout: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
          content: [
            {
              type: 'paragraph',
            },
          ],
        })
      },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutComponent)
  },
})
