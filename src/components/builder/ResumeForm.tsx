import { ResumeData } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const ResumeForm = ({ data, onChange }: Props) => {
  const update = (field: keyof ResumeData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [...data.education, { id: crypto.randomUUID(), degree: '', institution: '', year: '' }],
    });
  };

  const removeEducation = (id: string) => {
    if (data.education.length <= 1) return;
    onChange({ ...data, education: data.education.filter((e) => e.id !== id) });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      education: data.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [...data.experience, { id: crypto.randomUUID(), title: '', company: '', duration: '', description: '' }],
    });
  };

  const removeExperience = (id: string) => {
    if (data.experience.length <= 1) return;
    onChange({ ...data, experience: data.experience.filter((e) => e.id !== id) });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    });
  };

  return (
    <div className="space-y-8 p-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Personal Details</h2>
        <div className="space-y-3">
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
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Professional Summary</h2>
        <Textarea placeholder="Brief professional summary..." value={data.summary} onChange={(e) => update('summary', e.target.value)} rows={3} />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Skills</h2>
        <Input placeholder="React, TypeScript, Node.js, Python..." value={data.skills} onChange={(e) => update('skills', e.target.value)} />
        <p className="text-xs text-muted-foreground mt-1">Separate skills with commas</p>
      </div>

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
              <Textarea placeholder="Describe your responsibilities..." value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} rows={2} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
