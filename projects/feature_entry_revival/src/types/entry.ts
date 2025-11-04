/**
 * Entry-related types
 */

export type EntryStatus = 'active' | 'archived' | 'draft';

export interface Entry {
  id: string;
  title: string;
  description?: string;
  status: EntryStatus;
  tags?: string[];
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface EntryInput {
  title: string;
  description?: string;
  tags?: string[];
}

export interface EntryFilters {
  status?: EntryStatus;
  searchQuery?: string;
  tags?: string[];
}
