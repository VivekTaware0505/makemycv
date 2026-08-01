import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, FileText, FileImage, Upload, Download, Loader2, CheckCircle, FileType, FileSpreadsheet, Minimize2, ImageDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

type ConverterId =
  | "pdf-to-word"
  | "word-to-pdf"
  | "image-to-pdf"
  | "pdf-to-image"
  | "excel-to-pdf"
  | "pdf-compress"
  | "image-compress";

interface ConverterTool {
  id: ConverterId;
  title: string;
  desc: string;
  accept: string;
  multiple?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
}

const tools: ConverterTool[] = [
  { id: "pdf-to-word", title: "PDF to Word", desc: "Convert PDF into editable .doc file", accept: ".pdf", icon: FileType, color: "text-blue-600", bg: "bg-blue-50" },
  { id: "word-to-pdf", title: "Word to PDF", desc: "Convert .doc/.docx to high-quality PDF", accept: ".doc,.docx", icon: FileText, color: "text-red-600", bg: "bg-red-50" },
  { id: "image-to-pdf", title: "Image to PDF", desc: "Combine JPG/PNG images into one PDF", accept: "image/*", multiple: true, icon: FileImage, color: "text-emerald-600", bg: "bg-emerald-50" },
  { id: "pdf-to-image", title: "PDF to Image", desc: "Export each PDF page as PNG image", accept: ".pdf", icon: FileImage, color: "text-purple-600", bg: "bg-purple-50" },
  { id: "excel-to-pdf", title: "Excel to PDF", desc: "Convert .xlsx/.xls into a clean PDF", accept: ".xls,.xlsx,.csv", icon: FileSpreadsheet, color: "text-green-600", bg: "bg-green-50" },
  { id: "pdf-compress", title: "PDF Size Reducer", desc: "Compress PDF for email & uploads", accept: ".pdf", icon: Minimize2, color: "text-orange-600", bg: "bg-orange-50" },
  { id: "image-compress", title: "Image Size Reducer", desc: "Shrink JPG/PNG without quality loss", accept: "image/*", multiple: true, icon: ImageDown, color: "text-pink-600", bg: "bg-pink-50" },
];

const Converter = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<ConverterTool | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [targetSize, setTargetSize] = useState<number>(500); // in KB
  const inputRef = useRef<HTMLInputElement>(null);

  const supportsTarget = active?.id === "pdf-compress" || active?.id === "image-compress";

  const reset = () => { setFiles([]); setDone(false); };

  const onPick = (tool: ConverterTool) => {
    setActive(tool);
    reset();
    setTimeout(() => inputRef.current?.click(), 100);
  };

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files || []);
    setFiles(list);
    setDone(false);
  };

  const downloadBlob = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const convert = async () => {
    if (!active || files.length === 0) return;
    setBusy(true);
    try {
      switch (active.id) {
        case "image-to-pdf": await imageToPdf(files); break;
        case "word-to-pdf": await wordToPdf(files[0]); break;
        case "pdf-to-word": await pdfToWord(files[0]); break;
        case "pdf-to-image": await pdfToImage(files[0]); break;
        case "excel-to-pdf": await excelToPdf(files[0]); break;
        case "pdf-compress": await pdfCompress(files[0], targetSize); break;
        case "image-compress": await imageCompress(files, targetSize); break;
      }
      setDone(true);
      toast.success("Conversion complete — file downloaded!");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Conversion failed. Please try a different file.");
    } finally {
      setBusy(false);
    }
  };

  // ============== conversion handlers ==============
  const imageToPdf = async (imgs: File[]) => {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    for (let i = 0; i < imgs.length; i++) {
      const dataUrl = await new Promise<string>((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result as string);
        r.onerror = rej;
        r.readAsDataURL(imgs[i]);
      });
      const img = await new Promise<HTMLImageElement>((res, rej) => {
        const im = new Image();
        im.onload = () => res(im); im.onerror = rej; im.src = dataUrl;
      });
      const margin = 24;
      const availW = pageW - margin * 2;
      const availH = pageH - margin * 2;
      const ratio = Math.min(availW / img.width, availH / img.height);
      const w = img.width * ratio, h = img.height * ratio;
      const x = (pageW - w) / 2, y = (pageH - h) / 2;
      if (i > 0) pdf.addPage();
      // Lossless PNG path preserves sharp text in screenshots/certificates
      const isPng = /^data:image\/png/i.test(dataUrl);
      pdf.addImage(dataUrl, isPng ? "PNG" : "JPEG", x, y, w, h, undefined, "SLOW");
    }
    pdf.save(`images-${Date.now()}.pdf`);
  };

  const wordToPdf = async (file: File) => {
    const mammoth = await import("mammoth");
    const buf = await file.arrayBuffer();
    const { value: html } = await mammoth.convertToHtml({ arrayBuffer: buf });
    const wrapper = document.createElement("div");
    wrapper.style.cssText = "padding:40px;font-family:Arial,sans-serif;font-size:12pt;line-height:1.6;color:#111;width:794px;background:#fff;";
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf().set({
        margin: 10,
        filename: file.name.replace(/\.docx?$/i, ".pdf"),
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      }).from(wrapper).save();
    } finally {
      document.body.removeChild(wrapper);
    }
  };

  const pdfToWord = async (file: File) => {
    const pdfjs: any = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
    const buf = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: buf }).promise;
    const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    let html = "";
    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p);
      const content = await page.getTextContent();
      // Group items into visual lines by transform y, then paragraphs by gap.
      type Item = { str: string; x: number; y: number; h: number; bold: boolean };
      const items: Item[] = content.items
        .filter((it: any) => typeof it.str === "string")
        .map((it: any) => ({
          str: it.str,
          x: it.transform[4],
          y: it.transform[5],
          h: it.height || Math.abs(it.transform[3]) || 10,
          bold: /bold|black|heavy/i.test(it.fontName || ""),
        }));
      // Sort top→bottom, left→right
      items.sort((a, b) => (b.y - a.y) || (a.x - b.x));
      const lines: { y: number; h: number; text: string; bold: boolean }[] = [];
      for (const it of items) {
        const last = lines[lines.length - 1];
        if (last && Math.abs(last.y - it.y) < it.h * 0.6) {
          last.text += (it.str.startsWith(" ") || last.text.endsWith(" ") ? "" : " ") + it.str;
          last.bold = last.bold || it.bold;
        } else {
          lines.push({ y: it.y, h: it.h, text: it.str, bold: it.bold });
        }
      }
      // Merge lines into paragraphs by vertical gap
      let paraBuf: string[] = [];
      let prevY: number | null = null;
      let prevH = 12;
      const flush = (bold = false) => {
        if (paraBuf.length) {
          const txt = esc(paraBuf.join(" ").replace(/\s+/g, " ").trim());
          if (txt) html += bold
            ? `<p style="margin:6pt 0;font-weight:700;">${txt}</p>`
            : `<p style="margin:6pt 0;">${txt}</p>`;
          paraBuf = [];
        }
      };
      for (const ln of lines) {
        const gap = prevY == null ? 0 : prevY - ln.y;
        if (prevY != null && gap > prevH * 1.6) flush(ln.bold);
        paraBuf.push(ln.text);
        prevY = ln.y; prevH = ln.h;
      }
      flush();
      if (p < pdf.numPages) html += `<br clear="all" style="page-break-before:always" />`;
    }
    const doc = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>${esc(file.name)}</title></head><body style="font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.5;color:#111;">${html}</body></html>`;
    downloadBlob(new Blob([doc], { type: "application/msword" }), file.name.replace(/\.pdf$/i, ".doc"));
  };

  const pdfToImage = async (file: File) => {
    const pdfjs: any = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
    const buf = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: buf }).promise;
    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width; canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;
      await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;
      const blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), "image/png"));
      downloadBlob(blob, `${file.name.replace(/\.pdf$/i, "")}-page-${p}.png`);
    }
  };

  const excelToPdf = async (file: File) => {
    const XLSX = await import("xlsx");
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, { type: "array" });
    const wrapper = document.createElement("div");
    wrapper.style.cssText = "padding:24px;font-family:Arial,sans-serif;font-size:10pt;color:#111;background:#fff;width:1100px;";
    wb.SheetNames.forEach((name, idx) => {
      const ws = wb.Sheets[name];
      const html = XLSX.utils.sheet_to_html(ws, { editable: false });
      wrapper.insertAdjacentHTML("beforeend", `<h3 style="margin:16px 0 8px;font-size:14pt;">${name}</h3>${html}`);
      if (idx < wb.SheetNames.length - 1) {
        wrapper.insertAdjacentHTML("beforeend", '<div style="page-break-after:always"></div>');
      }
    });
    wrapper.querySelectorAll("table").forEach((t) => {
      (t as HTMLElement).style.cssText = "border-collapse:collapse;width:100%;font-size:9pt;";
      t.querySelectorAll("td,th").forEach((c) => {
        (c as HTMLElement).style.cssText = "border:1px solid #ccc;padding:4px 6px;";
      });
    });
    document.body.appendChild(wrapper);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf().set({
        margin: 8,
        filename: file.name.replace(/\.(xlsx?|csv)$/i, ".pdf"),
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
      }).from(wrapper).save();
    } finally {
      document.body.removeChild(wrapper);
    }
  };

  const pdfCompress = async (file: File, targetKB: number) => {
    const pdfjs: any = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
    const { jsPDF } = await import("jspdf");
    const buf = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: buf }).promise;
    const targetBytes = targetKB * 1024;

    // Pre-render each page once at high resolution, then re-encode at
    // decreasing quality/scale until the output fits the requested size.
    const pages: HTMLCanvasElement[] = [];
    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width; canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;
      pages.push(canvas);
    }

    const build = (quality: number, scale: number) => {
      const out = new jsPDF({ unit: "pt", format: "a4", compress: true });
      const pageW = out.internal.pageSize.getWidth();
      const pageH = out.internal.pageSize.getHeight();
      pages.forEach((src, i) => {
        let canvas = src;
        if (scale < 1) {
          const c = document.createElement("canvas");
          c.width = Math.max(1, Math.round(src.width * scale));
          c.height = Math.max(1, Math.round(src.height * scale));
          const cx = c.getContext("2d")!;
          cx.fillStyle = "#ffffff";
          cx.fillRect(0, 0, c.width, c.height);
          cx.drawImage(src, 0, 0, c.width, c.height);
          canvas = c;
        }
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        const ratio = Math.min(pageW / canvas.width, pageH / canvas.height);
        const w = canvas.width * ratio, h = canvas.height * ratio;
        if (i > 0) out.addPage();
        out.addImage(dataUrl, "JPEG", (pageW - w) / 2, (pageH - h) / 2, w, h, undefined, "FAST");
      });
      return out.output("blob") as Blob;
    };

    const attempts: Array<[number, number]> = [
      [0.9, 1], [0.8, 1], [0.7, 1], [0.6, 0.85], [0.5, 0.75],
      [0.4, 0.65], [0.3, 0.55], [0.25, 0.45], [0.2, 0.4],
    ];
    let best: Blob | null = null;
    for (const [q, s] of attempts) {
      const blob = build(q, s);
      best = blob;
      if (blob.size <= targetBytes) break;
    }
    if (best) {
      downloadBlob(best, file.name.replace(/\.pdf$/i, "-compressed.pdf"));
      const kb = Math.round(best.size / 1024);
      if (best.size > targetBytes) {
        toast.info(`Smallest achievable size was ${kb} KB while keeping pages readable.`);
      } else {
        toast.success(`Compressed to ${kb} KB (target ${targetKB} KB).`);
      }
    }
  };

  const imageCompress = async (imgs: File[], targetKB: number) => {
    const targetBytes = targetKB * 1024;
    for (const file of imgs) {
      const dataUrl = await new Promise<string>((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result as string);
        r.onerror = rej;
        r.readAsDataURL(file);
      });
      const img = await new Promise<HTMLImageElement>((res, rej) => {
        const im = new Image();
        im.onload = () => res(im); im.onerror = rej; im.src = dataUrl;
      });
      const encode = async (quality: number, scale: number) => {
        const maxDim = 1920 * scale;
        let w = img.width, h = img.height;
        if (w > maxDim || h > maxDim) {
          const r = Math.min(maxDim / w, maxDim / h);
          w = Math.round(w * r); h = Math.round(h * r);
        }
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        return await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), "image/jpeg", quality));
      };
      const attempts: Array<[number, number]> = [
        [0.92, 1], [0.85, 1], [0.75, 1], [0.65, 0.85], [0.55, 0.75],
        [0.45, 0.65], [0.35, 0.55], [0.28, 0.45], [0.2, 0.35],
      ];
      let best: Blob | null = null;
      for (const [q, s] of attempts) {
        best = await encode(q, s);
        if (best.size <= targetBytes) break;
      }
      if (best) {
        const base = file.name.replace(/\.[^.]+$/, "");
        downloadBlob(best, `${base}-compressed.jpg`);
        const kb = Math.round(best.size / 1024);
        if (best.size > targetBytes) toast.info(`${file.name}: smallest achievable was ${kb} KB.`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>PDF &amp; Word Converter - MakeMyCV</title>
        <meta name="description" content="Convert PDF to Word, Word to PDF, images to PDF, and more. Free browser-based file converter with no upload required." />
        <link rel="canonical" href="https://makemycv.lovable.app/converter" />
        <meta property="og:title" content="PDF &amp; Word Converter - MakeMyCV" />
        <meta property="og:url" content="https://makemycv.lovable.app/converter" />
      </Helmet>
      <Navbar />
      <main className="flex-1 pt-20 sm:pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="mb-4 gap-2 text-muted-foreground">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>

          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-muted-foreground mb-4">
              <FileType className="w-3.5 h-3.5" /> 100% Free · No sign-up · Files never leave your browser
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-3">
              File Converter <span className="text-primary">Tools</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Convert between PDF, Word and images instantly. Secure browser-side processing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {tools.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.button
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  onClick={() => onPick(t)}
                  className="text-left p-5 sm:p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-card-hover transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl ${t.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${t.color}`} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5">{t.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                </motion.button>
              );
            })}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept={active?.accept}
            multiple={active?.multiple}
            className="hidden"
            onChange={onFiles}
          />

          {active && (files.length > 0 || done) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-5 sm:p-6 rounded-2xl border border-border bg-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${active.bg} flex items-center justify-center`}>
                  <active.icon className={`w-5 h-5 ${active.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm sm:text-base">{active.title}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {files.length} file{files.length > 1 ? "s" : ""} selected
                  </p>
                </div>
              </div>

              {supportsTarget && (
                <div className="mb-4 p-4 rounded-xl bg-secondary/50 border border-border">
                  <p className="text-xs font-semibold text-foreground mb-1">Target file size</p>
                  <p className="text-[11px] text-muted-foreground mb-3">
                    Pick how small the output should be — we compress just enough to hit it.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {[
                      { label: "50 KB", kb: 50 },
                      { label: "100 KB", kb: 100 },
                      { label: "200 KB", kb: 200 },
                      { label: "500 KB", kb: 500 },
                      { label: "1 MB", kb: 1024 },
                      { label: "2 MB", kb: 2048 },
                      { label: "5 MB", kb: 5120 },
                    ].map((o) => (
                      <button
                        key={o.kb}
                        type="button"
                        onClick={() => setTargetSize(o.kb)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          targetSize === o.kb
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-muted-foreground border-border hover:text-foreground"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground">Custom:</span>
                    <input
                      type="number"
                      min={10}
                      value={targetSize}
                      onChange={(e) => setTargetSize(Math.max(10, Number(e.target.value) || 10))}
                      className="w-24 h-9 px-2 rounded-lg border border-border bg-card text-sm text-foreground"
                    />
                    <span className="text-[11px] text-muted-foreground">
                      KB ({(targetSize / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-xs">
                    <Upload className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="truncate flex-1 text-foreground">{f.name}</span>
                    <span className="text-muted-foreground flex-shrink-0">{(f.size / 1024).toFixed(0)} KB</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <Button onClick={convert} disabled={busy || files.length === 0} className="flex-1 h-11 font-semibold gap-2">
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : done ? <CheckCircle className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  {busy ? "Converting…" : done ? "Done — Download Again" : "Convert & Download"}
                </Button>
                <Button variant="outline" onClick={() => inputRef.current?.click()} className="h-11 sm:w-auto">
                  Change file
                </Button>
              </div>
            </motion.div>
          )}

          <div className="mt-12 grid sm:grid-cols-3 gap-4 text-center">
            {[
              { t: "🔒 100% Private", d: "Files processed in your browser, never uploaded." },
              { t: "⚡ Instant", d: "No queues, no waiting. Convert in seconds." },
              { t: "💎 Always Free", d: "Unlimited conversions, no sign-up required." },
            ].map((b) => (
              <div key={b.t} className="p-4 rounded-xl bg-secondary/50 border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">{b.t}</p>
                <p className="text-xs text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Converter;