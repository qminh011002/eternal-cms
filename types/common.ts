// src/types/common.ts

export interface BaseEntity {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

// Strapi v5 "Block Content" (rich text) structure, modeled after the JSON returned by the Blocks editor.
export type BlockTextLeaf = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

export type BlockParagraph = {
  type: "paragraph";
  children: BlockInlineChild[];
};

export type BlockHeading = {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: BlockInlineChild[];
};

export type BlockLink = {
  type: "link";
  url: string;
  children: BlockInlineChild[];
};

export type BlockList = {
  type: "list";
  format: "ordered" | "unordered";
  children: BlockListItem[];
};

export type BlockListItem = {
  type: "list-item";
  children: BlockElement[];
};

export type BlockQuote = {
  type: "quote";
  children: BlockElement[];
};

export type BlockCode = {
  type: "code";
  children: BlockInlineChild[];
  language?: string;
};

export type BlockInlineChild = BlockTextLeaf | BlockLink;
export type BlockElement =
  | BlockParagraph
  | BlockHeading
  | BlockList
  | BlockListItem
  | BlockQuote
  | BlockCode
  | BlockLink
  | BlockTextLeaf;

export type BlocksContent = BlockElement[];
