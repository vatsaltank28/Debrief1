export type NoteCategory = 'action' | 'decision' | 'problem' | 'discussion';

export type Route = 'all' | 'action' | 'decision' | 'discussion' | 'problem';

export interface Note {
  id: string;
  content: string;
  category: NoteCategory;
  title: string;
  priority?: 'high' | 'medium' | 'low';
  assignee?: string;
  assigneeAvatar?: string;
  dueDate?: string;
  reportedBy?: string;
  reporterAvatar?: string;
  type?: string;
  author?: string;
  authorAvatar?: string;
  replies?: number;
  votes?: number;
  createdAt: number;
}

export interface ClassificationResult {
  category: NoteCategory;
  title: string;
  priority?: 'high' | 'medium' | 'low';
  assignee?: string;
  dueDate?: string;
  type?: string;
  reportedBy?: string;
}

export interface AuthUser {
  email: string;
  name: string;
}
