import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import React from "react";
import { AlertCircle, Lightbulb, Stethoscope, GraduationCap, AlertTriangle, BookMarked } from "lucide-react";

export interface CalloutOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    callout: {
      setCallout: (options: { type: string; title: string }) => ReturnType;
    };
  }
}

const calloutConfig: Record<string, {
  icon: React.ElementType;
  borderColor: string;
  bg: string;
  textColor: string;
  titleColor: string;
  defaultTitle: string;
}> = {
  key_point: {
    icon: Lightbulb,
    borderColor: "border-l-sky-500",
    bg: "bg-sky-50/60",
    textColor: "text-foreground/90",
    titleColor: "text-sky-900",
    defaultTitle: "Key Concept",
  },
  clinical_note: {
    icon: Stethoscope,
    borderColor: "border-l-teal-500",
    bg: "bg-teal-50/60",
    textColor: "text-foreground/90",
    titleColor: "text-teal-900",
    defaultTitle: "Clinical Consideration",
  },
  important: {
    icon: AlertCircle,
    borderColor: "border-l-rose-500",
    bg: "bg-rose-50/60",
    textColor: "text-foreground/90",
    titleColor: "text-rose-900",
    defaultTitle: "Important Note",
  },
  exam_tip: {
    icon: GraduationCap,
    borderColor: "border-l-indigo-500",
    bg: "bg-indigo-50/60",
    textColor: "text-foreground/90",
    titleColor: "text-indigo-900",
    defaultTitle: "Board Review Point",
  },
  definition: {
    icon: BookMarked,
    borderColor: "border-l-zinc-400",
    bg: "bg-zinc-50",
    textColor: "text-foreground/90",
    titleColor: "text-foreground",
    defaultTitle: "Definition",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "border-l-amber-500",
    bg: "bg-amber-50/60",
    textColor: "text-foreground/90",
    titleColor: "text-amber-900",
    defaultTitle: "Caution / Warning",
  },
};

const CalloutComponent = (props: any) => {
  const { type = "key_point", title } = props.node.attrs;
  const config = calloutConfig[type] || calloutConfig.key_point;
  const Icon = config.icon;

  return (
    <NodeViewWrapper
      className={`my-6 rounded-r-2xl border border-l-[3.5px] border-border p-4.5 ${config.borderColor} ${config.bg}`}
    >
      <div className="flex items-center gap-2 mb-1.5 font-bold text-sm tracking-tight select-none">
        <Icon className={`h-4 w-4 shrink-0 ${config.titleColor}`} />
        <span className={config.titleColor}>{title || config.defaultTitle}</span>
      </div>
      <NodeViewContent className={`text-sm leading-relaxed ${config.textColor} prose-p:my-1`} />
    </NodeViewWrapper>
  );
};

export const CalloutExtension = Node.create<CalloutOptions>({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,

  addAttributes() {
    return {
      type: {
        default: "key_point",
        parseHTML: (element) => element.getAttribute("data-type"),
        renderHTML: (attributes) => ({ "data-type": attributes.type }),
      },
      title: {
        default: "Key Concept",
        parseHTML: (element) => element.getAttribute("data-title"),
        renderHTML: (attributes) => ({ "data-title": attributes.title }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-type]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setCallout:
        (options) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: options,
            content: [{ type: "paragraph" }],
          }),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutComponent);
  },
});
