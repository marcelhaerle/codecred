"use client";

import { Project, ProjectShowcaseBlock, Theme } from '@/lib/types';
import { Briefcase, ArrowUpRight } from 'lucide-react';
import GithubIcon from './GithubIcon';
import Image from 'next/image';

interface ProjectShowcaseBlockProps {
  block: ProjectShowcaseBlock;
  theme: Theme;
  data: Project[];
}

const imageLoader = ({ src }: { src: string }) => {
  return src;
}

export default function ProjectShowcaseBlockRenderer({ data: projects, theme }: ProjectShowcaseBlockProps) {
  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-4">Project Showcase</h3>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="border rounded-lg overflow-hidden flex flex-col group" style={{ borderColor: theme.colors.primaryText }}>
              {project.imageUrl ? (
                <Image
                  loader={imageLoader}
                  width={500}
                  height={500}
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    // Simple fallback: hide the image if it fails to load
                    (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-40 flex items-center justify-center">
                  <Briefcase className="w-10 h-10" style={{ color: theme.colors.secondaryText }} />
                </div>
              )}

              <div className="p-4 flex flex-col flex-grow">
                <h4 className="font-bold text-lg" style={{ color: theme.colors.primaryText }}>{project.title}</h4>
                <p className="text-sm" style={{ color: theme.colors.secondaryText }}>{project.description}</p>

                <div className="flex flex-wrap gap-2 my-4">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: theme.colors.pageBackground, color: theme.colors.primaryText }}>
                      {tech}
                    </span>
                  ))}
                </div>
                {(project.liveDemoUrl || project.sourceCodeUrl) &&
                  <div className="flex gap-2 mt-auto pt-2 border-t" style={{ borderColor: theme.colors.blockText }}>
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center hover:underline font-semibold py-2 px-3 rounded-md text-sm flex items-center justify-center gap-1.5">
                        <ArrowUpRight className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                    {project.sourceCodeUrl && (
                      <a
                        href={project.sourceCodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center hover:underline font-semibold py-2 px-3 rounded-md text-sm flex items-center justify-center gap-1.5">
                        <GithubIcon className="w-4 h-4" /> Source
                      </a>
                    )}
                  </div>
                }
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No projects to showcase yet.</p>
      )}
    </div>
  );
};
