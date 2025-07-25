"use client";

import { useState } from 'react';
import { Plus, Trash2, Pen } from 'lucide-react';
import { Project } from '@/types/custom';

interface ProjectShowcaseEditorProps {
  initialProjects: Project[];
}

export default function ProjectShowcaseEditor({ initialProjects }: ProjectShowcaseEditorProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [techStackInput, setTechStackInput] = useState('');

  const handleStartEdit = (project: Project) => {
    setEditingProject(project);
    setTechStackInput(project.techStack.join(', '));
  };

  const handleAddNew = () => {
    setEditingProject({
      title: '',
      description: '',
      techStack: [],
      displayOrder: projects.length + 1,
      imageUrl: '',
      liveDemoUrl: '',
      sourceCodeUrl: ''
    });
    setTechStackInput('');
  };

  const handleSave = async () => {
    if (!editingProject) return;
    const projectToSave = {
      ...editingProject,
      techStack: techStackInput.split(',').map(tag => tag.trim()).filter(Boolean),
    } as Project;

    const res = await fetch('/api/projects', {
      method: editingProject.id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectToSave),
    });
    const createdProject = await res.json();

    if (editingProject.id) {
      setProjects(prev => prev.map(p => (p.id === editingProject.id ? projectToSave : p)));
    } else {
      setProjects(prev => [...prev, { ...projectToSave, id: createdProject.id }]);
    }

    setEditingProject(null);
  };

  const handleDelete = async (projectId: string) => {
    await fetch(`/api/projects/${projectId}`, {
      method: 'DELETE',
    });
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const submitEnabled = editingProject && editingProject.title && editingProject.description && techStackInput;

  if (editingProject) {
    return (
      // --- EDIT/ADD FORM ---
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-bold text-white mb-4">{editingProject.id ? 'Edit Project' : 'Add New Project'}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Project Title*</label>
            <input
              type="text"
              value={editingProject.title}
              onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description*</label>
            <textarea
              value={editingProject.description}
              onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white"
              rows={4}
              required
            ></textarea>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Tech Stack (comma-separated)*</label>
              <input
                type="text"
                value={techStackInput}
                onChange={e => setTechStackInput(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white"
                placeholder="React, Next.js, Tailwind CSS"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Display Order</label>
              <input
                type="number"
                min="1"
                value={editingProject.displayOrder}
                onChange={e => setEditingProject({ ...editingProject, displayOrder: parseInt(e.target.value) })}
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
            <input
              type="url"
              value={editingProject.imageUrl}
              onChange={e => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Live Demo URL</label>
              <input
                type="url"
                value={editingProject.liveDemoUrl}
                onChange={e => setEditingProject({ ...editingProject, liveDemoUrl: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Source Code URL</label>
              <input
                type="url"
                value={editingProject.sourceCodeUrl}
                onChange={e => setEditingProject({ ...editingProject, sourceCodeUrl: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white"
              />
            </div>

          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setEditingProject(null)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">Cancel</button>
            {submitEnabled ?
              <button onClick={handleSave} className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg" disabled={!editingProject.title || !editingProject.description || !techStackInput}>Save Project</button>
              : <span className="bg-gray-900 text-gray-300 font-bold py-2 px-4 rounded-lg">Save Project</span>
            }
          </div>
        </div>
      </div>
    );
  }

  return (
    // --- PROJECT LIST VIEW ---
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold mb-8">Your Projects</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>
      <div className="space-y-2">
        {projects.length > 0 ? projects.map(p => (
          <div key={p.id} className="bg-gray-900 p-3 rounded-md flex justify-between items-center">
            <p className="font-semibold text-white">{p.title}</p>
            <div className="flex gap-8">
              <button onClick={() => handleStartEdit(p)} className="text-gray-400 hover:text-white"><Pen className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        )) : <p className="text-center text-gray-500 py-4">No projects added yet.</p>}
      </div>
    </div>
  );
};
