import { ResumeData } from "@/types/resume";
import { TemplateId } from "@/types/templates";

interface Props {
  data: ResumeData;
  template: TemplateId;
}

const ResumePreview = ({ data, template }: Props) => {
  const skills = data.skills.split(",").map((s) => s.trim()).filter(Boolean);
  const validEdu = data.education.filter((e) => e.degree);
  const validExp = data.experience.filter((e) => e.title);
  const validProjects = data.showProjects ? data.projects.filter((p) => p.name) : [];
  const validCerts = data.certifications.filter((c) => c.name);

  const config = getTemplateConfig(template);

  // Two-column layout for executive / consulting
  if (config.layout === "two-column") {
    return (
      <div id="resume-preview" className="relative bg-white min-h-[800px] font-sans text-sm" style={{ fontFamily: config.fontFamily, color: '#1a1a1a' }}>
        
        {/* Header */}
        <div className="p-8 pb-5" style={{ background: config.headerBg, color: '#fff' }}>
          <div className="flex items-start gap-4">
            {data.photo && (
              <img src={data.photo} alt={data.name} className="w-16 h-16 rounded-lg object-cover border-2 border-white/20 flex-shrink-0" />
            )}
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{data.name || "Your Name"}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {data.email && <span>✉ {data.email}</span>}
            {data.phone && <span>☎ {data.phone}</span>}
            {data.linkedin && <span>in {data.linkedin}</span>}
            {data.portfolio && <span>⌂ {data.portfolio}</span>}
          </div>
          {data.summary && (
            <p className="text-xs mt-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>{data.summary}</p>
          )}
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-[35%] p-6 space-y-5" style={{ background: '#f8f9fa', borderRight: '1px solid #e5e7eb' }}>
            {skills.length > 0 && (
              <div>
                <SectionTitle label={config.labels.skills} color={config.accentColor} />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {skills.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 text-[10px] font-semibold rounded" style={{
                      background: `${config.accentColor}12`,
                      color: config.accentColor,
                      border: `1px solid ${config.accentColor}25`,
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {validEdu.length > 0 && (
              <div>
                <SectionTitle label={config.labels.education} color={config.accentColor} />
                {validEdu.map((edu) => (
                  <div key={edu.id} className="mt-2">
                    <p className="font-semibold text-xs">{edu.degree}</p>
                    <p className="text-[10px]" style={{ color: '#666' }}>{edu.institution}</p>
                    <p className="text-[10px]" style={{ color: '#999' }}>{edu.year}</p>
                  </div>
                ))}
              </div>
            )}

            {validCerts.length > 0 && (
              <div>
                <SectionTitle label={config.labels.certifications} color={config.accentColor} />
                {validCerts.map((cert) => (
                  <div key={cert.id} className="mt-2">
                    <p className="font-semibold text-xs">{cert.name}</p>
                    <p className="text-[10px]" style={{ color: '#666' }}>{cert.issuer} · {cert.year}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="w-[65%] p-6 space-y-5">
            {validExp.length > 0 && (
              <div>
                <SectionTitle label={config.labels.experience} color={config.accentColor} />
                {validExp.map((exp) => (
                  <div key={exp.id} className="mt-3 pl-3" style={{ borderLeft: `2px solid ${config.accentColor}30` }}>
                    <div className="flex justify-between">
                      <span className="font-semibold text-xs">{exp.title}</span>
                      <span className="text-[10px]" style={{ color: '#999' }}>{exp.duration}</span>
                    </div>
                    <p className="text-[10px] font-medium" style={{ color: '#666' }}>{exp.company}</p>
                    {exp.description && <p className="text-[10px] mt-1 leading-relaxed" style={{ color: '#555' }}>{exp.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {validProjects.length > 0 && (
              <div>
                <SectionTitle label={config.labels.projects} color={config.accentColor} />
                {validProjects.map((proj) => (
                  <div key={proj.id} className="mt-3 pl-3" style={{ borderLeft: `2px solid ${config.accentColor}30` }}>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-xs">{proj.name}</span>
                      {proj.link && <span className="text-[10px]" style={{ color: config.accentColor }}>{proj.link}</span>}
                    </div>
                    {proj.description && <p className="text-[10px] mt-0.5 leading-relaxed" style={{ color: '#555' }}>{proj.description}</p>}
                    {proj.technologies && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {proj.technologies.split(",").map((t) => t.trim()).filter(Boolean).map((tech) => (
                          <span key={tech} className="text-[9px] px-1.5 py-0.5 rounded" style={{
                            background: `${config.accentColor}08`,
                            color: config.accentColor,
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
          </div>
        </div>
      </div>
    );
  }

  // Default single-column layout
  return (
    <div id="resume-preview" className="relative bg-white min-h-[800px] font-sans text-sm" style={{ fontFamily: config.fontFamily, color: '#1a1a1a' }}>
      {/* Header */}
      {config.headerStyle === "banner" ? (
        <div className="p-8 pb-6" style={{ background: config.headerBg, color: '#fff' }}>
          <div className="flex items-start gap-4">
            {data.photo && (
              <img src={data.photo} alt={data.name} className="w-16 h-16 rounded-lg object-cover border-2 border-white/20 flex-shrink-0" />
            )}
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{data.name || "Your Name"}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {data.email && <span>✉ {data.email}</span>}
            {data.phone && <span>☎ {data.phone}</span>}
            {data.linkedin && <span>in {data.linkedin}</span>}
            {data.portfolio && <span>⌂ {data.portfolio}</span>}
          </div>
          {data.summary && (
            <p className="text-xs mt-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>{data.summary}</p>
          )}
            </div>
          </div>
        </div>
      ) : config.headerStyle === "minimal" ? (
        <div className="p-8 pb-4">
          <div className="flex items-start gap-4">
            {data.photo && (
              <img src={data.photo} alt={data.name} className="w-14 h-14 rounded-lg object-cover border border-border flex-shrink-0" />
            )}
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#1a1a1a' }}>
                {data.name || "Your Name"}
              </h1>
              <div className="w-12 h-0.5 mt-2 mb-2" style={{ background: config.accentColor }} />
              <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: '#888' }}>
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>{data.phone}</span>}
                {data.linkedin && <span>{data.linkedin}</span>}
                {data.portfolio && <span>{data.portfolio}</span>}
              </div>
              {data.summary && (
                <p className="text-xs mt-3 leading-relaxed" style={{ color: '#555' }}>{data.summary}</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 pb-4 text-center" style={{ borderBottom: `2px solid ${config.accentColor}` }}>
          {data.photo && (
            <img src={data.photo} alt={data.name} className="w-16 h-16 rounded-full object-cover border-2 mx-auto mb-2" style={{ borderColor: config.accentColor }} />
          )}
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
            <SectionTitle label={config.labels.skills} color={config.accentColor} />
            <div className="flex flex-wrap gap-1.5 mt-2">
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
            <SectionTitle label={config.labels.experience} color={config.accentColor} />
            {validExp.map((exp) => (
              <div key={exp.id} className="mb-3 pl-3 mt-2" style={{ borderLeft: `2px solid ${config.accentColor}20` }}>
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
            <SectionTitle label={config.labels.projects} color={config.accentColor} />
            {validProjects.map((proj) => (
              <div key={proj.id} className="mb-3 pl-3 mt-2" style={{ borderLeft: `2px solid ${config.accentColor}20` }}>
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
            <SectionTitle label={config.labels.education} color={config.accentColor} />
            {validEdu.map((edu) => (
              <div key={edu.id} className="mb-2 pl-3 mt-2" style={{ borderLeft: `2px solid ${config.accentColor}20` }}>
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
            <SectionTitle label={config.labels.certifications} color={config.accentColor} />
            {validCerts.map((cert) => (
              <div key={cert.id} className="mb-2 pl-3 mt-2" style={{ borderLeft: `2px solid ${config.accentColor}20` }}>
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

const SectionTitle = ({ label, color }: { label: string; color: string }) => (
  <h2 className="text-xs font-bold uppercase tracking-widest pb-1" style={{ color, borderBottom: `1px solid ${color}20` }}>{label}</h2>
);

interface TemplateConfig {
  headerStyle: "banner" | "classic" | "minimal";
  layout: "single" | "two-column";
  headerBg: string;
  accentColor: string;
  pillStyle: "rounded" | "square";
  fontFamily: string;
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
  const base = { layout: "single" as const, fontFamily: "'Inter', 'Segoe UI', sans-serif" };

  switch (template) {
    case "modern":
      return { ...base, headerStyle: "banner", headerBg: "#111827", accentColor: "#111827", pillStyle: "rounded", labels: defaults };
    case "minimal":
      return { ...base, headerStyle: "minimal", headerBg: "#fff", accentColor: "#374151", pillStyle: "square", labels: defaults };
    case "executive":
      return { ...base, layout: "two-column", headerStyle: "banner", headerBg: "#0c1425", accentColor: "#b8860b", pillStyle: "square", fontFamily: "'Georgia', serif", labels: { skills: "Core Competencies", education: "Education", experience: "Executive Experience", projects: "Strategic Initiatives", certifications: "Board & Certifications" } };
    case "consulting":
      return { ...base, layout: "two-column", headerStyle: "banner", headerBg: "#0f172a", accentColor: "#0ea5e9", pillStyle: "rounded", labels: { skills: "Expertise", education: "Education", experience: "Consulting Experience", projects: "Key Engagements", certifications: "Certifications" } };
    case "it-developer":
      return { ...base, headerStyle: "banner", headerBg: "#0f766e", accentColor: "#0f766e", pillStyle: "rounded", labels: { skills: "Technical Skills", education: "Education", experience: "Work Experience", projects: "Technical Projects", certifications: "Certifications & Courses" } };
    case "banking":
      return { ...base, headerStyle: "classic", headerBg: "#1e3a5f", accentColor: "#1e3a5f", pillStyle: "square", labels: { skills: "Core Competencies", education: "Academic Qualifications", experience: "Professional Experience", projects: "Key Initiatives", certifications: "Professional Certifications" } };
    case "healthcare":
      return { ...base, headerStyle: "banner", headerBg: "#0e7490", accentColor: "#0e7490", pillStyle: "rounded", labels: { skills: "Clinical Skills", education: "Medical Education", experience: "Clinical Experience", projects: "Research & Publications", certifications: "Medical Licenses & Certifications" } };
    case "marketing":
      return { ...base, headerStyle: "banner", headerBg: "#c2410c", accentColor: "#c2410c", pillStyle: "rounded", labels: { skills: "Key Skills", education: "Education", experience: "Campaign Experience", projects: "Notable Campaigns", certifications: "Certifications" } };
    case "engineering":
      return { ...base, headerStyle: "classic", headerBg: "#4338ca", accentColor: "#4338ca", pillStyle: "square", labels: { skills: "Technical Expertise", education: "Academic Background", experience: "Engineering Experience", projects: "Engineering Projects", certifications: "Professional Certifications" } };
    case "creative":
      return { ...base, headerStyle: "banner", headerBg: "#9333ea", accentColor: "#9333ea", pillStyle: "rounded", labels: { skills: "Expertise", education: "Education", experience: "Portfolio & Experience", projects: "Creative Projects", certifications: "Certifications & Awards" } };
    case "legal":
      return { ...base, headerStyle: "classic", headerBg: "#1c1917", accentColor: "#78350f", pillStyle: "square", fontFamily: "'Georgia', serif", labels: { skills: "Areas of Practice", education: "Legal Education", experience: "Professional Experience", projects: "Notable Cases", certifications: "Bar Admissions & Certifications" } };
    case "academic":
      return { ...base, headerStyle: "classic", headerBg: "#1e3a5f", accentColor: "#1e3a5f", pillStyle: "square", fontFamily: "'Georgia', serif", labels: { skills: "Research Interests", education: "Academic Qualifications", experience: "Academic Positions", projects: "Publications & Research", certifications: "Awards & Fellowships" } };
    case "government":
      return { ...base, headerStyle: "banner", headerBg: "#1a365d", accentColor: "#1a365d", pillStyle: "square", labels: { skills: "Key Competencies", education: "Education", experience: "Service Record", projects: "Key Initiatives", certifications: "Clearances & Certifications" } };
    case "classic":
    default:
      return { ...base, headerStyle: "classic", headerBg: "#1a1a1a", accentColor: "#1a1a1a", pillStyle: "square", labels: defaults };
  }
}

export default ResumePreview;
