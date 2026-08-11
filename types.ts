
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface Project {
  id: string;
  name: string;
  techStack: string; // Previously genre
  image: string;
  category: string; // Previously day
  description: string;
  bullets?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
  action?: {
    label: string;
    path: string;
  };
}

export enum Section {
  HERO = 'hero',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  CONTACT = 'contact',
}
