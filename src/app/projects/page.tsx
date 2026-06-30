import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageHead } from "@/components/ui/PageHead";
import { FadeIn } from "@/components/ui/FadeIn";
import { getAllProjects } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";

export const metadata = {
  title: "Projects",
  description:
    "Things I'm building, have built, and the lessons learned along the way.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <PageWrapper className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <PageHead
          title="Projects"
          subtitle="Things I'm building, have built, and the lessons learned along the way. The focus is on learning — not on polished showcases."
        />

        {projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted italic">
              No projects yet. The first idea is taking shape.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.08}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
