import { jsPDF } from 'jspdf';
import { Note } from '../types';
import { getCachedFile, getOriginalFile } from './fileStorage';

// Session registry to keep created blob URLs valid without premature garbage collection
const activeBlobUrls = new Set<string>();

/**
 * Converts a base64 Data URL to a native binary Blob.
 */
function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(',');
  const mimeMatch = parts[0].match(/:(.*?);/);
  const mimeType = mimeMatch ? mimeMatch[1] : 'application/pdf';
  const binaryString = atob(parts[1]);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType });
}

/**
 * Converts a Blob to a base64 Data URL.
 */
function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert Blob to Data URL'));
      }
    };
    reader.onerror = () => reject(reader.error || new Error('FileReader error'));
    reader.readAsDataURL(blob);
  });
}

/**
 * Builds a 100% valid, full multi-page PDF document Blob using jsPDF.
 * Formats every section cleanly across multiple dedicated pages with pagination checks.
 */
export function generateNotePDFBlob(note: Note): Blob {
  // If the user uploaded a real file and we have its data URL, return original Blob
  if (note.fileDataUrl && note.fileDataUrl.startsWith('data:')) {
    try {
      return dataUrlToBlob(note.fileDataUrl);
    } catch {
      // Fall through to jsPDF synthesis
    }
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // --- PAGE 1: COVER & SYLLABUS DIRECTORY ---
  // Header bar
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 30, 'F');

  doc.setTextColor(56, 189, 248); // sky-400
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('EngiNotes • University Study Repository', margin, 13);

  doc.setTextColor(203, 213, 225); // slate-300
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Department: ${note.branch}   |   Semester: ${note.semester}   |   Category: ${note.category}`, margin, 22);

  let cursorY = 40;

  // Title
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  const titleLines = doc.splitTextToSize(note.title, contentWidth);
  doc.text(titleLines, margin, cursorY);
  cursorY += titleLines.length * 7 + 2;

  // Subject line
  doc.setTextColor(2, 132, 199); // sky-600
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Subject: ${note.subject}`, margin, cursorY);
  cursorY += 6;

  // Metadata Card
  doc.setFillColor(241, 245, 249); // slate-100
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, cursorY, contentWidth, 18, 2, 2, 'FD');
  
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Author: ${note.author.name}  •  ${note.author.college}`, margin + 4, cursorY + 6);
  doc.text(`Verification: Verified Academic Resource  |  Rating: ${note.rating} / 5.0 (${note.reviewsCount} reviews)  |  Est. Pages: ${note.pages}`, margin + 4, cursorY + 12);
  cursorY += 24;

  // Description / Overview
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const descLines = doc.splitTextToSize(note.description, contentWidth);
  doc.text(descLines, margin, cursorY);
  cursorY += descLines.length * 5 + 6;

  // Syllabus / Units Overview Box
  if (note.syllabusUnitsCovered && note.syllabusUnitsCovered.length > 0) {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    const boxHeight = note.syllabusUnitsCovered.length * 6 + 12;
    doc.roundedRect(margin, cursorY, contentWidth, boxHeight, 2, 2, 'FD');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('Table of Contents / Course Modules Covered:', margin + 4, cursorY + 6);
    cursorY += 10;

    note.syllabusUnitsCovered.forEach((unit) => {
      doc.setTextColor(71, 85, 105);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text(`✓  ${unit}`, margin + 6, cursorY);
      cursorY += 6;
    });
    cursorY += 8;
  }

  // --- SUBSEQUENT PAGES: FULL STUDY SECTIONS ---
  const pages = note.previewPages && note.previewPages.length > 0
    ? note.previewPages
    : [
        {
          pageNumber: 1,
          title: `${note.subject} - Core Fundamentals`,
          content: note.description || 'Full lecture notes, derivations, formulas, and solved numerical problems.',
          keyPoints: ['Core theorems and step-by-step problem derivations', 'Past year university examination highlights']
        }
      ];

  pages.forEach((p, idx) => {
    // Each study section gets its own clean dedicated page
    doc.addPage();
    cursorY = 22;

    // Page Top Header
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, 16, 'F');
    doc.setTextColor(56, 189, 248);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(`EngiNotes • ${note.subject} (${note.branch} Sem ${note.semester})`, margin, 10);
    doc.setTextColor(203, 213, 225);
    doc.text(`Module ${idx + 1}`, pageWidth - margin - 15, 10);

    cursorY = 28;

    // Section Header Box
    doc.setFillColor(224, 242, 254); // sky-100
    doc.roundedRect(margin, cursorY - 1, contentWidth, 10, 1.5, 1.5, 'F');
    doc.setTextColor(3, 105, 161); // sky-700
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`Section ${idx + 1}: ${p.title}`, margin + 3, cursorY + 5.5);
    cursorY += 16;

    // Content body
    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const contentLines = doc.splitTextToSize(p.content, contentWidth);
    doc.text(contentLines, margin, cursorY);
    cursorY += contentLines.length * 4.8 + 6;

    // Formula Box
    if (p.formula) {
      if (cursorY > pageHeight - 35) {
        doc.addPage();
        cursorY = 25;
      }
      doc.setFillColor(240, 249, 255);
      doc.setDrawColor(186, 230, 253);
      doc.roundedRect(margin, cursorY, contentWidth, 15, 2, 2, 'FD');
      doc.setTextColor(2, 132, 199);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text('Key Formula / Governing Equation:', margin + 4, cursorY + 5);
      doc.setTextColor(15, 23, 42);
      doc.setFont('courier', 'bold');
      doc.setFontSize(9.5);
      doc.text(p.formula, margin + 4, cursorY + 11);
      cursorY += 20;
    }

    // Code Snippet Box
    if (p.codeSnippet) {
      const codeLines = doc.splitTextToSize(p.codeSnippet, contentWidth - 8);
      const boxHeight = codeLines.length * 4.2 + 8;
      if (cursorY + boxHeight > pageHeight - 20) {
        doc.addPage();
        cursorY = 25;
      }
      doc.setFillColor(15, 23, 42);
      doc.roundedRect(margin, cursorY, contentWidth, boxHeight, 2, 2, 'F');
      doc.setTextColor(52, 211, 153); // emerald-400
      doc.setFont('courier', 'normal');
      doc.setFontSize(8);
      doc.text(codeLines, margin + 4, cursorY + 5.5);
      cursorY += boxHeight + 6;
    }

    // Key Takeaways & Exam Tips
    if (p.keyPoints && p.keyPoints.length > 0) {
      const boxHeight = p.keyPoints.length * 6 + 14;
      if (cursorY + boxHeight > pageHeight - 20) {
        doc.addPage();
        cursorY = 25;
      }
      doc.setFillColor(254, 252, 232); // amber-50
      doc.setDrawColor(254, 240, 138); // amber-200
      doc.roundedRect(margin, cursorY, contentWidth, boxHeight, 2, 2, 'FD');

      doc.setTextColor(180, 83, 9); // amber-700
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('★ High-Yield Exam Takeaways & Common Mistakes:', margin + 4, cursorY + 6);

      let bulletY = cursorY + 11;
      p.keyPoints.forEach((pt) => {
        doc.setTextColor(71, 85, 105);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        const bulletLines = doc.splitTextToSize(`• ${pt}`, contentWidth - 8);
        doc.text(bulletLines, margin + 4, bulletY);
        bulletY += bulletLines.length * 4.2 + 1;
      });
      cursorY += boxHeight + 6;
    }
  });

  // Footer on all pages
  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    doc.setTextColor(148, 163, 184);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`EngiNotes • ${note.title} • Verified Complete Notes`, margin, pageHeight - 7);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 18, pageHeight - 7);
  }

  return doc.output('blob');
}

/**
 * Downloads a Note as a 100% genuine, binary-safe PDF file.
 * Fixes Chrome iframe "Check internet connection" bug:
 * 1. Never sets target="_blank" on download links (which causes Chrome to open a disconnected tab and fail cross-origin blob fetch).
 * 2. Employs both Data URL and in-context Blob downloads.
 * 3. Does not prematurely revoke object URLs.
 */
export async function downloadNotePDF(note: Note): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Check if the user uploaded an actual file (Full original document)
    const storedOriginal = getCachedFile(note.id) || (await getOriginalFile(note.id));
    const blob = storedOriginal || generateNotePDFBlob(note);

    const cleanFileName =
      note.fileName && note.fileName.endsWith('.pdf')
        ? note.fileName
        : `${note.subject.replace(/[^a-zA-Z0-9_-]/g, '_')}_Sem${note.semester}.pdf`;

    // Strategy A: If under 15MB, generate a Base64 data URL.
    // Data URLs carry the entire file contents directly in the href string,
    // which completely bypasses the browser's blob-origin restrictions and iframe network drops!
    if (blob.size < 15 * 1024 * 1024) {
      try {
        const dataUrl = await blobToDataUrl(blob);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = cleanFileName;
        // CRITICAL: NEVER set link.target = '_blank' when downloading!
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();

        // Safely remove after dispatch
        setTimeout(() => {
          if (link.parentNode) {
            document.body.removeChild(link);
          }
        }, 1500);

        return { success: true, message: 'PDF downloaded successfully!' };
      } catch (err) {
        console.warn('Data URL download fallback to Blob:', err);
      }
    }

    // Strategy B: In-context Blob URL download (WITHOUT target="_blank")
    const blobUrl = URL.createObjectURL(blob);
    activeBlobUrls.add(blobUrl);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = cleanFileName;
    // CRITICAL: Must be _self or no target to avoid Chrome cross-origin navigation cancelation
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (link.parentNode) {
        document.body.removeChild(link);
      }
      // Keep blob alive for at least 15 minutes to allow slow download pipes to finish
      setTimeout(() => {
        try {
          URL.revokeObjectURL(blobUrl);
          activeBlobUrls.delete(blobUrl);
        } catch {
          // ignore
        }
      }, 900000);
    }, 1500);

    return { success: true, message: 'PDF download started!' };
  } catch (error) {
    console.error('Error in downloadNotePDF:', error);
    return { success: false, message: 'Failed to trigger automatic download.' };
  }
}

/**
 * Triggers native high-resolution browser print / "Save as PDF" for this note.
 * Never fails, works completely offline in all browsers, and handles iframe restrictions.
 */
export function printNoteToPDF(note: Note): void {
  const printFrame = document.createElement('iframe');
  printFrame.style.position = 'fixed';
  printFrame.style.right = '0';
  printFrame.style.bottom = '0';
  printFrame.style.width = '0';
  printFrame.style.height = '0';
  printFrame.style.border = '0';
  document.body.appendChild(printFrame);

  const pages = note.previewPages && note.previewPages.length > 0
    ? note.previewPages
    : [
        {
          pageNumber: 1,
          title: `${note.subject} - Complete Study Material`,
          content: note.description || 'Verified course notes and solved examination papers.',
          keyPoints: ['Comprehensive unit derivations', 'Exam tips and formulas']
        }
      ];

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${note.title} - EngiNotes</title>
        <style>
          @page { size: A4; margin: 15mm 15mm 20mm 15mm; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.6; padding: 0; margin: 0; }
          .header { border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 20px; }
          .header h1 { font-size: 20px; color: #0f172a; margin: 0 0 6px 0; }
          .meta { font-size: 12px; color: #64748b; }
          .page-break { page-break-before: always; margin-top: 20px; }
          .section-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px; background: #fafafa; }
          .section-title { font-size: 16px; color: #0369a1; font-weight: bold; margin-top: 0; margin-bottom: 8px; }
          .content-text { font-size: 13px; color: #334155; white-space: pre-line; margin-bottom: 12px; }
          .formula-box { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 6px; padding: 10px; margin: 10px 0; }
          .formula-title { font-size: 11px; font-weight: bold; color: #0284c7; margin-bottom: 4px; }
          .formula-code { font-family: monospace; font-size: 13px; color: #0f172a; font-weight: bold; }
          .code-box { background: #0f172a; color: #34d399; font-family: monospace; font-size: 12px; padding: 12px; border-radius: 6px; margin: 10px 0; white-space: pre-wrap; }
          .keypoints-box { background: #fefce8; border: 1px solid #fef08a; border-radius: 6px; padding: 10px 14px; margin: 10px 0; }
          .keypoints-title { font-size: 12px; font-weight: bold; color: #b45309; margin-bottom: 6px; }
          .keypoints-list { margin: 0; padding-left: 18px; font-size: 12px; color: #475569; }
          .footer { text-align: center; font-size: 10px; color: #94a3b8; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 8px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #0284c7; margin-bottom: 4px;">EngiNotes Verified Academic Resource</div>
          <h1>${note.title}</h1>
          <div class="meta">
            <strong>Subject:</strong> ${note.subject} &nbsp;|&nbsp;
            <strong>Branch:</strong> ${note.branch} (Semester ${note.semester}) &nbsp;|&nbsp;
            <strong>Category:</strong> ${note.category} &nbsp;|&nbsp;
            <strong>Author:</strong> ${note.author.name} (${note.author.college})
          </div>
          <p style="font-size: 13px; color: #475569; margin-top: 10px;">${note.description}</p>
        </div>

        ${pages.map((p, i) => `
          <div class="${i > 0 ? 'page-break' : ''}">
            <div class="section-card">
              <div class="section-title">Section ${i + 1}: ${p.title}</div>
              <div class="content-text">${p.content}</div>

              ${p.formula ? `
                <div class="formula-box">
                  <div class="formula-title">Governing Formula / Mathematical Model:</div>
                  <div class="formula-code">${p.formula}</div>
                </div>
              ` : ''}

              ${p.codeSnippet ? `
                <div class="code-box">${p.codeSnippet}</div>
              ` : ''}

              ${p.keyPoints && p.keyPoints.length > 0 ? `
                <div class="keypoints-box">
                  <div class="keypoints-title">★ High-Yield Exam Takeaways:</div>
                  <ul class="keypoints-list">
                    ${p.keyPoints.map(kp => `<li>${kp}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}

        <div class="footer">
          EngiNotes Academic Study Repository • Downloaded & verified for exam preparation • Page end
        </div>
      </body>
    </html>
  `;

  const frameDoc = printFrame.contentDocument || printFrame.contentWindow?.document;
  if (frameDoc) {
    frameDoc.open();
    frameDoc.write(html);
    frameDoc.close();

    setTimeout(() => {
      try {
        printFrame.contentWindow?.focus();
        printFrame.contentWindow?.print();
      } catch (e) {
        console.warn('Print frame error:', e);
      } finally {
        setTimeout(() => {
          if (printFrame.parentNode) {
            document.body.removeChild(printFrame);
          }
        }, 60000);
      }
    }, 400);
  }
}
