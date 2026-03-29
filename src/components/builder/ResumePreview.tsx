import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
  template: "classic" | "modern";
  showWatermark?: boolean;
}

const ResumePreview = ({ data, template, showWatermark = true }: Props) => {
  if (template === "modern") return <ModernTemplate data={data} showWatermark={showWatermark} />;
  return <ClassicTemplate data={data} showWatermark={showWatermark} />;
};

const ClassicTemplate = ({ data, showWatermark }: { data: ResumeData; showWatermark: boolean }) => {
  const skills = data.skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div id="resume-preview" className="relative bg-card p-8 min-h-[800px] font-sans text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>
      {showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <span className="text-6xl font-bold rotate-[-30deg] select-none" style={{ color: 'rgba(0,0,0,0.06)' }}>PREVIEW</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6 pb-4" style={{ borderBottom: '2px solid #1a1a1a' }}>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#1a1a1a' }}>
          {data.name || "Your Name"}
        </h1>
        <div className="flex items-center justify-center gap-4 mt-2 text-xs" style={{ color: '#666' }}>
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#1a1a1a' }}>Professional Summary</h2>
          <p className="text-xs leading-relaxed" style={{ color: '#444' }}>{data.summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#1a1a1a' }}>Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span key={skill} className="px-2.5 py-1 text-xs rounded" style={{ background: '#f3f4f6', color: '#374151' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.some((e) => e.degree) && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#1a1a1a' }}>Education</h2>
          {data.education.filter((e) => e.degree).map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between">
                <span className="font-semibold text-xs">{edu.degree}</span>
                <span className="text-xs" style={{ color: '#888' }}>{edu.year}</span>
              </div>
              <p className="text-xs" style={{ color: '#666' }}>{edu.institution}</p>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {data.experience.some((e) => e.title) && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#1a1a1a' }}>Experience</h2>
          {data.experience.filter((e) => e.title).map((exp) => (
            <div key={exp.id} className="mb-3">
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
    </div>
  );
};

const ModernTemplate = ({ data, showWatermark }: { data: ResumeData; showWatermark: boolean }) => {
  const skills = data.skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div id="resume-preview" className="relative bg-card min-h-[800px] font-sans text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>
      {showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <span className="text-6xl font-bold rotate-[-30deg] select-none" style={{ color: 'rgba(0,0,0,0.06)' }}>PREVIEW</span>
        </div>
      )}

      {/* Header */}
      <div className="p-8 pb-6" style={{ background: '#111827', color: '#fff' }}>
        <h1 className="text-2xl font-bold tracking-tight">
          {data.name || "Your Name"}
        </h1>
        <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: '#9ca3af' }}>
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
        </div>
        {data.summary && (
          <p className="text-xs mt-3 leading-relaxed" style={{ color: '#d1d5db' }}>{data.summary}</p>
        )}
      </div>

      <div className="p-8 pt-6">
        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#111827' }}>Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span key={skill} className="px-3 py-1 text-xs rounded-full font-medium" style={{ background: '#111827', color: '#fff' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.some((e) => e.degree) && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#111827' }}>Education</h2>
            {data.education.filter((e) => e.degree).map((edu) => (
              <div key={edu.id} className="mb-2 pl-4" style={{ borderLeft: '2px solid #e5e7eb' }}>
                <div className="flex justify-between">
                  <span className="font-semibold text-xs">{edu.degree}</span>
                  <span className="text-xs" style={{ color: '#888' }}>{edu.year}</span>
                </div>
                <p className="text-xs" style={{ color: '#666' }}>{edu.institution}</p>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {data.experience.some((e) => e.title) && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#111827' }}>Experience</h2>
            {data.experience.filter((e) => e.title).map((exp) => (
              <div key={exp.id} className="mb-3 pl-4" style={{ borderLeft: '2px solid #e5e7eb' }}>
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
      </div>
    </div>
  );
};

export default ResumePreview;
