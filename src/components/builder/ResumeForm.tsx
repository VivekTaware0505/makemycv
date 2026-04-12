import { useRef } from "react";
import { ResumeData, ResumeField, fieldLabels, fieldSkillSuggestions, fieldsWithoutProjects } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Linkedin, Globe, FolderKanban, Award, Camera, Briefcase } from "lucide-react";

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const durationSuggestions = ["Fresher", "6 Months", "1 Year", "2 Years", "3 Years", "5 Years", "7 Years", "10+ Years"];

const ResumeForm = ({ data, onChange }: Props) => {
  const photoInputRef = useRef<HTMLInputElement>(null);

  const update = (field: keyof ResumeData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      update("photo", ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFieldChange = (field: ResumeField) => {
    const hideProjects = fieldsWithoutProjects.includes(field);
    onChange({ ...data, field, showProjects: !hideProjects });
  };

  const addSkillSuggestion = (skill: string) => {
    const current = data.skills.split(",").map((s) => s.trim()).filter(Boolean);
    if (current.includes(skill)) return;
    const newSkills = [...current, skill].join(", ");
    update("skills", newSkills);
  };

  const addEducation = () => {
    onChange({ ...data, education: [...data.education, { id: crypto.randomUUID(), degree: '', institution: '', year: '' }] });
  };
  const removeEducation = (id: string) => {
    if (data.education.length <= 1) return;
    onChange({ ...data, education: data.education.filter((e) => e.id !== id) });
  };
  const updateEducation = (id: string, field: string, value: string) => {
    onChange({ ...data, education: data.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)) });
  };

  const addExperience = () => {
    onChange({ ...data, experience: [...data.experience, { id: crypto.randomUUID(), title: '', company: '', duration: '', description: '' }] });
  };
  const removeExperience = (id: string) => {
    if (data.experience.length <= 1) return;
    onChange({ ...data, experience: data.experience.filter((e) => e.id !== id) });
  };
  const updateExperience = (id: string, field: string, value: string) => {
    onChange({ ...data, experience: data.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)) });
  };

  const addProject = () => {
    onChange({ ...data, projects: [...data.projects, { id: crypto.randomUUID(), name: '', description: '', technologies: '', link: '' }] });
  };
  const removeProject = (id: string) => {
    if (data.projects.length <= 1) return;
    onChange({ ...data, projects: data.projects.filter((p) => p.id !== id) });
  };
  const updateProject = (id: string, field: string, value: string) => {
    onChange({ ...data, projects: data.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)) });
  };

  const addCertification = () => {
    onChange({ ...data, certifications: [...data.certifications, { id: crypto.randomUUID(), name: '', issuer: '', year: '' }] });
  };
  const removeCertification = (id: string) => {
    if (data.certifications.length <= 1) return;
    onChange({ ...data, certifications: data.certifications.filter((c) => c.id !== id) });
  };
  const updateCertification = (id: string, field: string, value: string) => {
    onChange({ ...data, certifications: data.certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)) });
  };

  const currentSkills = data.skills.split(",").map((s) => s.trim()).filter(Boolean);
  const suggestions = fieldSkillSuggestions[data.field] || [];
  const availableSuggestions = suggestions.filter((s) => !currentSkills.includes(s));

  return (
    <div className="space-y-8 p-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
      {/* Field / Domain Selection */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
          <Briefcase className="w-5 h-5" /> Your Field
        </h2>
        <p className="text-xs text-muted-foreground mb-3">Select your domain to get relevant skill suggestions and sections</p>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(fieldLabels) as [ResumeField, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleFieldChange(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                data.field === key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Photo + Personal Details */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Personal Details</h2>
        <div className="space-y-3">
          {/* Photo Upload */}
          <div className="flex items-center gap-4 mb-2">
            <div
              className="w-16 h-16 rounded-xl border-2 border-dashed border-border bg-secondary/50 flex items-center justify-center cursor-pointer overflow-hidden hover:border-primary/50 transition-colors"
              onClick={() => photoInputRef.current?.click()}
            >
              {data.photo ? (
                <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Profile Photo</p>
              <p className="text-xs text-muted-foreground">Click to upload (optional)</p>
              {data.photo && (
                <button onClick={() => update("photo", "")} className="text-xs text-destructive hover:underline mt-0.5">Remove</button>
              )}
            </div>
            <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">Full Name</Label>
            <Input placeholder="John Doe" value={data.name} onChange={(e) => update('name', e.target.value)} className="mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm text-muted-foreground">Email</Label>
              <Input placeholder="john@example.com" value={data.email} onChange={(e) => update('email', e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Phone</Label>
              <Input placeholder="+91 98765 43210" value={data.phone} onChange={(e) => update('phone', e.target.value)} className="mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </Label>
              <Input placeholder="linkedin.com/in/johndoe" value={data.linkedin} onChange={(e) => update('linkedin', e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> Portfolio / Website
              </Label>
              <Input placeholder="johndoe.dev" value={data.portfolio} onChange={(e) => update('portfolio', e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Professional Summary</h2>
        <Textarea placeholder="Brief professional summary..." value={data.summary} onChange={(e) => update('summary', e.target.value)} rows={3} />
      </div>

      {/* Skills with suggestions */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Skills</h2>
        <Input placeholder="React, TypeScript, Node.js, Python..." value={data.skills} onChange={(e) => update('skills', e.target.value)} />
        <p className="text-xs text-muted-foreground mt-1">Separate skills with commas</p>
        {availableSuggestions.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-muted-foreground mb-2">Suggested for {fieldLabels[data.field]}:</p>
            <div className="flex flex-wrap gap-1.5">
              {availableSuggestions.map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSkillSuggestion(skill)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium border border-dashed border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Education */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Education</h2>
          <Button variant="outline" size="sm" onClick={addEducation} className="h-8 text-xs">
            <Plus className="w-3 h-3 mr-1" /> Add
          </Button>
        </div>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id} className="p-4 rounded-xl border border-border bg-secondary/30 space-y-3 relative">
              {data.education.length > 1 && (
                <button onClick={() => removeEducation(edu.id)} className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <Input placeholder="Degree (e.g. B.Tech Computer Science)" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} />
                <Input placeholder="Year (e.g. 2020-2024)" value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience with duration suggestions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Experience</h2>
          <Button variant="outline" size="sm" onClick={addExperience} className="h-8 text-xs">
            <Plus className="w-3 h-3 mr-1" /> Add
          </Button>
        </div>
        <div className="space-y-4">
          {data.experience.map((exp) => (
            <div key={exp.id} className="p-4 rounded-xl border border-border bg-secondary/30 space-y-3 relative">
              {data.experience.length > 1 && (
                <button onClick={() => removeExperience(exp.id)} className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <Input placeholder="Job Title" value={exp.title} onChange={(e) => updateExperience(exp.id, 'title', e.target.value)} />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} />
                <Input placeholder="Duration (e.g. 2022-Present)" value={exp.duration} onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)} />
              </div>
              {/* Duration quick-select */}
              <div>
                <p className="text-xs text-muted-foreground mb-1.5">Quick select experience:</p>
                <div className="flex flex-wrap gap-1.5">
                  {durationSuggestions.map((dur) => (
                    <button
                      key={dur}
                      onClick={() => updateExperience(exp.id, 'duration', dur)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                        exp.duration === dur
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>
              <Textarea placeholder="Describe your responsibilities..." value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} rows={2} />
            </div>
          ))}
        </div>
      </div>

      {/* Projects - conditionally shown */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FolderKanban className="w-5 h-5" /> Projects
          </h2>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={data.showProjects}
                onChange={(e) => update("showProjects", e.target.checked)}
                className="rounded border-border"
              />
              Show section
            </label>
            {data.showProjects && (
              <Button variant="outline" size="sm" onClick={addProject} className="h-8 text-xs">
                <Plus className="w-3 h-3 mr-1" /> Add
              </Button>
            )}
          </div>
        </div>
        {!data.showProjects && (
          <p className="text-xs text-muted-foreground bg-secondary/50 p-3 rounded-lg">
            Projects section is hidden for {fieldLabels[data.field]} resumes. Toggle above to show it.
          </p>
        )}
        {data.showProjects && (
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id} className="p-4 rounded-xl border border-border bg-secondary/30 space-y-3 relative">
                {data.projects.length > 1 && (
                  <button onClick={() => removeProject(proj.id)} className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <Input placeholder="Project Name" value={proj.name} onChange={(e) => updateProject(proj.id, 'name', e.target.value)} />
                <Textarea placeholder="Project description..." value={proj.description} onChange={(e) => updateProject(proj.id, 'description', e.target.value)} rows={2} />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Technologies used" value={proj.technologies} onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)} />
                  <Input placeholder="Project link (optional)" value={proj.link} onChange={(e) => updateProject(proj.id, 'link', e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certifications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Award className="w-5 h-5" /> Certifications
          </h2>
          <Button variant="outline" size="sm" onClick={addCertification} className="h-8 text-xs">
            <Plus className="w-3 h-3 mr-1" /> Add
          </Button>
        </div>
        <div className="space-y-4">
          {data.certifications.map((cert) => (
            <div key={cert.id} className="p-4 rounded-xl border border-border bg-secondary/30 space-y-3 relative">
              {data.certifications.length > 1 && (
                <button onClick={() => removeCertification(cert.id)} className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <Input placeholder="Certification Name (e.g. AWS Solutions Architect)" value={cert.name} onChange={(e) => updateCertification(cert.id, 'name', e.target.value)} />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Issuing Organization" value={cert.issuer} onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)} />
                <Input placeholder="Year" value={cert.year} onChange={(e) => updateCertification(cert.id, 'year', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
