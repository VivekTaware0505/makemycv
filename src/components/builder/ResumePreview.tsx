import { ResumeData } from "@/types/resume";
import { TemplateId } from "@/types/templates";

interface Props {
  data: ResumeData;
  template: TemplateId;
  showWatermark?: boolean;
}

const ResumePreview = ({ data, template, showWatermark = true }: Props) => {
  const skills = data.skills.split(",").map((s) => s.trim()).filter(Boolean);
  const validEdu = data.education.filter((e) => e.degree);
  const validExp = data.experience.filter((e) => e.title);
  const validProjects = data.projects.filter((p) => p.name);
  const validCerts = data.certifications.filter((c) => c.name);

  const config = getTemplateConfig(template);

  return (
    <div id="resume-preview" className="relative bg-card min-h-[800px] font-sans text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>
      {showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <span className="text-6xl font-bold rotate-[-30deg] select-none" style={{ color: 'rgba(0,0,0,0.06)' }}>PREVIEW</span>
        </div>
      )}

      {/* Header */}
      {config.headerStyle === "banner" ? (
        <div className="p-8 pb-6" style={{ background: config.headerBg, color: '#fff' }}>
          <h1 className="text-2xl font-bold tracking-tight">{data.name || "Your Name"}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.linkedin && <span>{data.linkedin}</span>}
            {data.portfolio && <span>{data.portfolio}</span>}
          </div>
          {data.summary && (
            <p className="text-xs mt-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>{data.summary}</p>
          )}
        </div>
      ) : (
        <div className="p-8 pb-4 text-center" style={{ borderBottom: `2px solid ${config.accentColor}` }}>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: config.accentColor }}>
            {data.name || "Your Name"}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-xs" style={{ color: '#666' }}>
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.linkedin && <span>🔗 {data.linkedin}</span>}
            {data.portfolio && <span>🌐 {data.portfolio}</span>}
          </div>
          {data.summary && (
            <p className="text-xs mt-3 leading-relaxed" style={{ color: '#444' }}>{data.summary}</p>
          )}
        </div>
      )}

      <div className={config.headerStyle === "banner" ? "p-8 pt-6" : "p-8 pt-5"}>
        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: config.accentColor }}>{config.labels.skills}</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span key={skill} className="px-2.5 py-1 text-xs font-medium" style={{
                  background: `${config.accentColor}10`,
                  color: config.accentColor,
                  borderRadius: config.pillStyle === "rounded" ? "9999px" : "4px",
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {validExp.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: config.accentColor }}>{config.labels.experience}</h2>
            {validExp.map((exp) => (
              <div key={exp.id} className="mb-3 pl-3" style={{ borderLeft: `2px solid ${config.accentColor}20` }}>
                <div className="flex justify-between">
                  <span className="font-semibold text-xs">{exp.title}</span>
                  <span className="text-xs" style={{ color: '#888' }}>{exp.duration}</span>
                </div>
                <p className="text-xs font-medium" style={{ color: '#666' }}>{exp.company}</p>
                {exp.description && <p className="text-xs mt-1 leading-relaxed" style={{ color: '#555' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {validProjects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: config.accentColor }}>{config.labels.projects}</h2>
            {validProjects.map((proj) => (
              <div key={proj.id} className="mb-3 pl-3" style={{ borderLeft: `2px solid ${config.accentColor}20` }}>
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-xs">{proj.name}</span>
                  {proj.link && <span className="text-xs" style={{ color: config.accentColor }}>{proj.link}</span>}
                </div>
                {proj.description && <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#555' }}>{proj.description}</p>}
                {proj.technologies && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.technologies.split(",").map((t) => t.trim()).filter(Boolean).map((tech) => (
                      <span key={tech} className="text-[10px] px-1.5 py-0.5 font-medium" style={{
                        background: `${config.accentColor}08`,
                        color: config.accentColor,
                        borderRadius: '3px',
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {validEdu.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: config.accentColor }}>{config.labels.education}</h2>
            {validEdu.map((edu) => (
              <div key={edu.id} className="mb-2 pl-3" style={{ borderLeft: `2px solid ${config.accentColor}20` }}>
                <div className="flex justify-between">
                  <span className="font-semibold text-xs">{edu.degree}</span>
                  <span className="text-xs" style={{ color: '#888' }}>{edu.year}</span>
                </div>
                <p className="text-xs" style={{ color: '#666' }}>{edu.institution}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {validCerts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: config.accentColor }}>{config.labels.certifications}</h2>
            {validCerts.map((cert) => (
              <div key={cert.id} className="mb-2 pl-3" style={{ borderLeft: `2px solid ${config.accentColor}20` }}>
                <div className="flex justify-between">
                  <span className="font-semibold text-xs">{cert.name}</span>
                  <span className="text-xs" style={{ color: '#888' }}>{cert.year}</span>
                </div>
                <p className="text-xs" style={{ color: '#666' }}>{cert.issuer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface TemplateConfig {
  headerStyle: "banner" | "classic";
  headerBg: string;
  accentColor: string;
  pillStyle: "rounded" | "square";
  labels: {
    skills: string;
    education: string;
    experience: string;
    projects: string;
    certifications: string;
  };
}

function getTemplateConfig(template: TemplateId): TemplateConfig {
  const defaults = { skills: "Skills", education: "Education", experience: "Experience", projects: "Projects", certifications: "Certifications" };

  switch (template) {
    case "modern":
      return { headerStyle: "banner", headerBg: "#111827", accentColor: "#111827", pillStyle: "rounded", labels: defaults };
    case "it-developer":
      return { headerStyle: "banner", headerBg: "#0f766e", accentColor: "#0f766e", pillStyle: "rounded", labels: { skills: "Technical Skills", education: "Education", experience: "Work Experience", projects: "Technical Projects", certifications: "Certifications & Courses" } };
    case "banking":
      return { headerStyle: "classic", headerBg: "#1e3a5f", accentColor: "#1e3a5f", pillStyle: "square", labels: { skills: "Core Competencies", education: "Academic Qualifications", experience: "Professional Experience", projects: "Key Initiatives", certifications: "Professional Certifications" } };
    case "healthcare":
      return { headerStyle: "banner", headerBg: "#0e7490", accentColor: "#0e7490", pillStyle: "rounded", labels: { skills: "Clinical Skills", education: "Medical Education", experience: "Clinical Experience", projects: "Research & Publications", certifications: "Medical Licenses & Certifications" } };
    case "marketing":
      return { headerStyle: "banner", headerBg: "#c2410c", accentColor: "#c2410c", pillStyle: "rounded", labels: { skills: "Key Skills", education: "Education", experience: "Campaign Experience", projects: "Notable Campaigns", certifications: "Certifications" } };
    case "engineering":
      return { headerStyle: "classic", headerBg: "#4338ca", accentColor: "#4338ca", pillStyle: "square", labels: { skills: "Technical Expertise", education: "Academic Background", experience: "Engineering Experience", projects: "Engineering Projects", certifications: "Professional Certifications" } };
    case "creative":
      return { headerStyle: "banner", headerBg: "#9333ea", accentColor: "#9333ea", pillStyle: "rounded", labels: { skills: "Expertise", education: "Education", experience: "Portfolio & Experience", projects: "Creative Projects", certifications: "Certifications & Awards" } };
    case "classic":
    default:
      return { headerStyle: "classic", headerBg: "#1a1a1a", accentColor: "#1a1a1a", pillStyle: "square", labels: defaults };
  }
}

export default ResumePreview;
