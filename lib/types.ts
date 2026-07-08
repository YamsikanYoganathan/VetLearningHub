export interface Subject {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  created_at: string;
}

export type NoteStatus = 'draft' | 'published';

export interface Note {
  id: string;
  subject_id: string;
  title: string;
  slug: string;
  content: Record<string, any>; // JSONB representation of rich text or structured clinical data
  status: NoteStatus;
  created_at: string;
  updated_at: string;
}

export interface SubjectWithNotes extends Subject {
  notes?: Note[];
}
