import { ResumeData, fieldLabels } from "@/types/resume";
import { TemplateId } from "@/types/templates";

interface Props {
  data: ResumeData;
  template: TemplateId;
}

interface Density {
  fs: number;
  gap: number;
  blockGap: number;
  pad: number;
  lh: number;
}

const ResumePreview = ({ data, template }: Props) => {
  const skills = data.skills.split(",").map((s) => s.trim()).filter(Boolean);
  const validEdu = data.education.filter((e) => e.degree);
  const validExp = data.experience.filter((e) => e.title);
  const validProjects = data.showProjects ? data.projects.filter((p) => p.name) : [];
  const validCerts = data.certifications.filter((c) => c.name);

  const config = getTemplateConfig(template);

  // ---- Density-aware sizing -------------------------------------------------
  // Sparse resumes get slightly larger type and more generous spacing so the
  // A4 page fills naturally instead of leaving a big empty block at the bottom.
  const contentLength =
    (data.summary?.length || 0) +
    data.skills.length +
    validExp.reduce((n, e) => n + e.title.length + e.company.length + (e.description?.length || 0), 0) +
    validProjects.reduce((n, p) => n + p.name.length + (p.description?.length || 0), 0) +
    validEdu.reduce((n, e) => n + e.degree.length + e.institution.length, 0) +
    validCerts.reduce((n, c) => n + c.name.length + c.issuer.length, 0);

  const d: Density =
    contentLength < 700
      ? { fs: 1.18, gap: 30, blockGap: 16, pad: 30, lh: 1.7 }
      : contentLength < 1400
      ? { fs: 1.08, gap: 22, blockGap: 12, pad: 26, lh: 1.6 }
      : contentLength < 2600
      ? { fs: 1, gap: 18, blockGap: 10, pad: 24, lh: 1.5 }
      : { fs: 0.94, gap: 14, blockGap: 8, pad: 20, lh: 1.45 };

  const px = (n: number) => `${Math.round(n * d.fs * 10) / 10}px`;
  const roleLabel = fieldLabels[data.field] && data.field !== "other" ? fieldLabels[data.field] : "";

  // Two-column layout: dark full-height sidebar + banner header with photo
  if (config.layout === "two-column") {
    const sidebarBg = config.sidebarBg || "#2f3b45";
    const bannerBg = config.headerBg;
    return (
      <div
        id="resume-preview"
        className="relative bg-white font-sans"
        style={{ fontFamily: config.fontFamily, color: "#1f2933", display: "flex", flexDirection: "column", aspectRatio: "794 / 1123" }}
      >
        {/* Top band: dark stub over sidebar + colored banner with photo */}
        <div style={{ display: "flex", alignItems: "stretch" }}>
          <div style={{ width: "34%", background: sidebarBg }} />
          <div
            style={{
              width: "66%",
              background: bannerBg,
              color: "#fff",
              padding: `${d.pad}px ${d.pad}px ${d.pad}px 0`,
              position: "relative",
              minHeight: 130,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ paddingRight: data.photo ? 150 : 0 }}>
              <h1 style={{ fontSize: px(26), fontWeight: 700, letterSpacing: "0.02em", lineHeight: 1.1, textTransform: "uppercase" }}>
                {data.name || "Your Name"}
              </h1>
              {roleLabel && (
                <p style={{ fontSize: px(13), letterSpacing: "0.08em", marginTop: 6, color: "rgba(255,255,255,0.9)", textTransform: "uppercase" }}>
                  {roleLabel}
                </p>
              )}
            </div>
            {data.photo && (
              <img
                src={data.photo}
                alt={data.name}
                style={{
                  position: "absolute",
                  right: d.pad,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid #fff",
                }}
              />
            )}
          </div>
        </div>

        {/* Body: full-height dark sidebar + main column */}
        <div style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
          {/* Sidebar */}
          <div
            style={{
              width: "34%",
              background: sidebarBg,
              color: "rgba(255,255,255,0.92)",
              padding: d.pad,
              display: "flex",
              flexDirection: "column",
              gap: d.gap,
            }}
          >
            {(data.email || data.phone || data.linkedin || data.portfolio) && (
              <div style={{ display: "flex", flexDirection: "column", gap: Math.max(6, d.blockGap - 2) }}>
                {data.phone && <ContactRow icon="☎" text={data.phone} size={px(11)} />}
                {data.email && <ContactRow icon="✉" text={data.email} size={px(11)} />}
                {data.portfolio && <ContactRow icon="⌘" text={data.portfolio} size={px(11)} />}
                {data.linkedin && <ContactRow icon="in" text={data.linkedin} size={px(11)} />}
                <div style={{ height: 1, background: "rgba(255,255,255,0.25)", marginTop: 6 }} />
              </div>
            )}

            {skills.length > 0 && (
              <div className="rp-block">
                <SidebarTitle label={config.labels.skills} size={px(13)} />
                <ul style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 5 }}>
                  {skills.map((skill) => (
                    <li key={skill} style={{ fontSize: px(11), lineHeight: d.lh, display: "flex", gap: 7 }}>
                      <span style={{ opacity: 0.7 }}>•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ height: 1, background: "rgba(255,255,255,0.25)", marginTop: d.blockGap }} />
              </div>
            )}

            {validCerts.length > 0 && (
              <div className="rp-block">
                <SidebarTitle label={config.labels.certifications} size={px(13)} />
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: d.blockGap - 2 }}>
                  {validCerts.map((cert) => (
                    <div key={cert.id} style={{ fontSize: px(11), lineHeight: d.lh }}>
                      {cert.year && <span style={{ fontWeight: 700 }}>{cert.year}: </span>}
                      <span>{cert.name}</span>
                      {cert.issuer && <span style={{ opacity: 0.75 }}> — {cert.issuer}</span>}
                    </div>
                  ))}
                </div>
                <div style={{ height: 1, background: "rgba(255,255,255,0.25)", marginTop: d.blockGap }} />
              </div>
            )}

            {validEdu.length > 0 && (
              <div className="rp-block">
                <SidebarTitle label={config.labels.education} size={px(13)} />
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: d.blockGap - 2 }}>
                  {validEdu.map((edu) => (
                    <div key={edu.id} style={{ fontSize: px(11), lineHeight: d.lh }}>
                      <p style={{ fontWeight: 700 }}>{edu.degree}</p>
                      {edu.institution && <p style={{ opacity: 0.8 }}>{edu.institution}</p>}
                      {edu.year && <p style={{ opacity: 0.6 }}>{edu.year}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main column */}
          <div
            style={{
              width: "66%",
              padding: d.pad,
              display: "flex",
              flexDirection: "column",
              gap: d.gap,
              background: "#fff",
            }}
          >
            {data.summary && (
              <div className="rp-block">
                <MainTitle label="Objective" size={px(14)} />
                <p style={{ fontSize: px(11.5), lineHeight: d.lh, marginTop: 8, color: "#3b4551" }}>{data.summary}</p>
              </div>
            )}

            {validEdu.length > 0 && (
              <div className="rp-block">
                <MainTitle label={config.labels.education} size={px(14)} />
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: d.blockGap }}>
                  {validEdu.map((edu) => (
                    <div key={edu.id} className="rp-block" style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontSize: px(11), lineHeight: d.lh }}>●</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                          <span style={{ fontSize: px(11.5), fontWeight: 700 }}>{edu.degree}</span>
                          {edu.year && <span style={{ fontSize: px(10.5), color: "#6b7280", whiteSpace: "nowrap" }}>{edu.year}</span>}
                        </div>
                        {edu.institution && (
                          <p style={{ fontSize: px(11), color: "#6b7280", lineHeight: d.lh }}>{edu.institution}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {validExp.length > 0 && (
              <div className="rp-block">
                <MainTitle label={config.labels.experience} size={px(14)} />
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: d.blockGap }}>
                  {validExp.map((exp) => (
                    <div key={exp.id} className="rp-block" style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontSize: px(11), lineHeight: d.lh }}>●</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                          <span style={{ fontSize: px(11.5), fontWeight: 700 }}>{exp.company || exp.title}</span>
                          {exp.duration && <span style={{ fontSize: px(10.5), color: "#6b7280", whiteSpace: "nowrap" }}>{exp.duration}</span>}
                        </div>
                        {exp.company && exp.title && (
                          <p style={{ fontSize: px(11), color: "#6b7280", lineHeight: d.lh }}>{exp.title}</p>
                        )}
                        {exp.description && (
                          <div style={{ marginTop: 3 }}>
                            {exp.description.split(/\n|(?:^|\s)[-•]\s/).map((s) => s.trim()).filter(Boolean).map((line, i) => (
                              <p key={i} style={{ fontSize: px(11), lineHeight: d.lh, color: "#3b4551" }}>- {line}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {validProjects.length > 0 && (
              <div className="rp-block">
                <MainTitle label={config.labels.projects} size={px(14)} />
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: d.blockGap }}>
                  {validProjects.map((proj) => (
                    <div key={proj.id} className="rp-block" style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontSize: px(11), lineHeight: d.lh }}>●</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                          <span style={{ fontSize: px(11.5), fontWeight: 700 }}>{proj.name}</span>
                          {proj.link && <span style={{ fontSize: px(10.5), color: config.accentColor }}>{proj.link}</span>}
                        </div>
                        {proj.description && (
                          <p style={{ fontSize: px(11), lineHeight: d.lh, color: "#3b4551" }}>- {proj.description}</p>
                        )}
                        {proj.technologies && (
                          <p style={{ fontSize: px(10.5), color: "#6b7280", marginTop: 2 }}>{proj.technologies}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
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
          <div className="rp-block mb-6">
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
          <div className="rp-block mb-6">
            <SectionTitle label={config.labels.experience} color={config.accentColor} />
            {validExp.map((exp) => (
              <div key={exp.id} className="rp-block mb-3 pl-3 mt-2" style={{ borderLeft: `2px solid ${config.accentColor}20` }}>
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
          <div className="rp-block mb-6">
            <SectionTitle label={config.labels.projects} color={config.accentColor} />
            {validProjects.map((proj) => (
              <div key={proj.id} className="rp-block mb-3 pl-3 mt-2" style={{ borderLeft: `2px solid ${config.accentColor}20` }}>
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
          <div className="rp-block mb-6">
            <SectionTitle label={config.labels.education} color={config.accentColor} />
            {validEdu.map((edu) => (
              <div key={edu.id} className="rp-block mb-2 pl-3 mt-2" style={{ borderLeft: `2px solid ${config.accentColor}20` }}>
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
          <div className="rp-block mb-6">
            <SectionTitle label={config.labels.certifications} color={config.accentColor} />
            {validCerts.map((cert) => (
              <div key={cert.id} className="rp-block mb-2 pl-3 mt-2" style={{ borderLeft: `2px solid ${config.accentColor}20` }}>
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

const ContactRow = ({ icon, text, size }: { icon: string; text: string; size: string }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: size, lineHeight: 1.5 }}>
    <span style={{ width: 14, flexShrink: 0, opacity: 0.85, textAlign: "center" }}>{icon}</span>
    <span style={{ wordBreak: "break-word" }}>{text}</span>
  </div>
);

const SidebarTitle = ({ label, size }: { label: string; size: string }) => (
  <h2 style={{ fontSize: size, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff" }}>{label}</h2>
);

const MainTitle = ({ label, size }: { label: string; size: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <h2 style={{ fontSize: size, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1f2933", whiteSpace: "nowrap" }}>{label}</h2>
    <span style={{ flex: 1, height: 1, background: "#9aa5b1" }} />
  </div>
);

interface TemplateConfig {
  headerStyle: "banner" | "classic" | "minimal";
  layout: "single" | "two-column";
  headerBg: string;
  sidebarBg?: string;
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
  // All templates share the professional sidebar layout (dark left rail +
  // colored header band with photo), varying by color, labels and typography.
  const base = { layout: "two-column" as const, fontFamily: "'Inter', 'Segoe UI', sans-serif" };

  switch (template) {
    case "modern":
      return { ...base, layout: "two-column", headerStyle: "banner", headerBg: "#4a7c95", sidebarBg: "#2f3b45", accentColor: "#4a7c95", pillStyle: "rounded", labels: defaults };
    case "minimal":
      return { ...base, headerStyle: "minimal", headerBg: "#fff", accentColor: "#374151", pillStyle: "square", labels: defaults };
    case "executive":
      return { ...base, layout: "two-column", headerStyle: "banner", headerBg: "#1b2a41", sidebarBg: "#0c1425", accentColor: "#b8860b", pillStyle: "square", fontFamily: "'Georgia', serif", labels: { skills: "Core Competencies", education: "Education", experience: "Executive Experience", projects: "Strategic Initiatives", certifications: "Board & Certifications" } };
    case "consulting":
      return { ...base, layout: "two-column", headerStyle: "banner", headerBg: "#2f77a1", sidebarBg: "#1f2a33", accentColor: "#0ea5e9", pillStyle: "rounded", labels: { skills: "Expertise", education: "Education", experience: "Consulting Experience", projects: "Key Engagements", certifications: "Certifications" } };
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
