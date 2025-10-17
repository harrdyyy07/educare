// lib/data.ts
// This simulates a database for our demo

// Define resource types
interface Note {
  id: number;
  title: string;
  subject: string;
  semester: number;
  department: string;
  uploadDate: string;
  size: string;
  downloads: number;
  rating: number;
  tags: string[];
  type: 'notes';
}

interface Paper {
  id: number;
  title: string;
  subject: string;
  semester: number;
  department: string;
  year: number;
  month: string;
  size: string;
  downloads: number;
  solutions: boolean;
  type: 'papers';
}

interface Syllabus {
  id: number;
  course: string;
  semester: number;
  subjects: Array<{ code: string; name: string; credits: number }>;
  updated: string;
  type: 'syllabus';
}

type Resource = Note | Paper | Syllabus;

// Initial data
let resources = {
  notes: [
    {
      id: 1,
      title: 'Data Structures and Algorithms Complete Notes',
      subject: 'Data Structures',
      semester: 3,
      department: 'Computer Science',
      uploadDate: '2024-01-15',
      size: '2.4 MB',
      downloads: 1247,
      rating: 4.8,
      tags: ['CSE', 'Important', 'Updated'],
      type: 'notes'
    },
    {
      id: 2,
      title: 'Operating Systems Comprehensive Study Material',
      subject: 'Operating Systems',
      semester: 4,
      department: 'Computer Science',
      uploadDate: '2024-01-10',
      size: '3.1 MB',
      downloads: 892,
      rating: 4.6,
      tags: ['CSE', 'Core'],
      type: 'notes'
    }
  ] as Note[],
  papers: [
    {
      id: 1,
      title: 'Data Structures Question Paper - Dec 2023',
      subject: 'Data Structures',
      semester: 3,
      department: 'Computer Science',
      year: 2023,
      month: 'December',
      size: '1.2 MB',
      downloads: 1567,
      solutions: true,
      type: 'papers'
    }
  ] as Paper[],
  syllabus: [
    {
      id: 1,
      course: 'Computer Science and Engineering',
      semester: 3,
      subjects: [
        { code: '18CS31', name: 'Data Structures', credits: 4 },
        { code: '18CS32', name: 'Analog and Digital Electronics', credits: 4 }
      ],
      updated: '2023-24',
      type: 'syllabus'
    }
  ] as Syllabus[]
};

// Listeners for real-time updates
let listeners: (() => void)[] = [];

function notifyListeners(): void {
  listeners.forEach(listener => listener());
}

// Get all resources for home page
export function getHomePageResources(): Resource[] {
  const allResources: Resource[] = [
    ...resources.notes,
    ...resources.papers,
    ...resources.syllabus
  ];
  return allResources
    .sort((a, b) => new Date(b.uploadDate || '2024-01-01').getTime() - new Date(a.uploadDate || '2024-01-01').getTime())
    .slice(0, 6);
}

// Get notes
export function getNotes(): Note[] {
  return resources.notes;
}

// Get question papers
export function getQuestionPapers(): Paper[] {
  return resources.papers;
}

// Get syllabus
export function getSyllabus(): Syllabus[] {
  return resources.syllabus;
}

// Add new resource
export function addResource(type: 'notes' | 'papers' | 'syllabus', data: any): Resource {
  const newId = Math.max(0, ...resources[type].map(r => r.id)) + 1;
  
  let newResource: Resource;
  
  if (type === 'notes') {
    newResource = {
      id: newId,
      title: data.title,
      subject: data.subject,
      semester: data.semester,
      department: data.department,
      uploadDate: new Date().toISOString().split('T')[0],
      size: data.size || '0 MB',
      downloads: 0,
      rating: 4.5,
      tags: data.tags || [data.department],
      type: 'notes'
    } as Note;
  } else if (type === 'papers') {
    newResource = {
      id: newId,
      title: data.title,
      subject: data.subject,
      semester: data.semester,
      department: data.department,
      year: data.year || new Date().getFullYear(),
      month: data.month || new Date().toLocaleString('default', { month: 'long' }),
      size: data.size || '0 MB',
      downloads: 0,
      solutions: data.solutions || false,
      type: 'papers'
    } as Paper;
  } else {
    newResource = {
      id: newId,
      course: data.course || data.department + ' Engineering',
      semester: data.semester,
      subjects: data.subjects || [{ code: 'TEMP001', name: data.subject, credits: 4 }],
      updated: data.updated || `${new Date().getFullYear()}-${(new Date().getFullYear() + 1).toString().slice(2)}`,
      type: 'syllabus'
    } as Syllabus;
  }
  
  resources[type].unshift(newResource);
  notifyListeners();
  return newResource;
}

// Subscribe to changes
export function subscribe(callback: () => void): () => void {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter(l => l !== callback);
  };
}

// Get resource by ID and type
export function getResource(type: 'notes' | 'papers' | 'syllabus', id: number): Resource | undefined {
  return resources[type].find(resource => resource.id === id);
}

// Delete resource
export function deleteResource(type: 'notes' | 'papers' | 'syllabus', id: number): boolean {
  resources[type] = resources[type].filter(resource => resource.id !== id);
  notifyListeners();
  return true;
}