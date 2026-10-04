import React, { useState } from 'react';
import { Calendar, Play, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';
import { useTMFData } from '../context/TMFDataContext';
import { runIntegrityCheck } from '../integrity';

// On-demand compliance checks computed from live data. (No background scheduler runs on this server.)
export default function ScheduledJobsView() {
  const { documents, selectedStudyId, refreshData } = useTMFData();
  const [runningJob, setRunningJob] = useState(null);
  const [results, setResults] = useState({});

  const studyDocs = documents.filter(d => d.study_id === selectedStudyId);

  const checks = [
    {
      id: 'integrity',
      name: 'SHA-256 Checksum Re-verification',
      type: '21 CFR Part 11 Integrity',
      description: 'Re-computes the SHA-256 of every stored file and compares it with the filed hash.',
      run: async () => {
        const r = await runIntegrityCheck(selectedStudyId);
        const bad = r.tampered.length + r.missing.length;
        return { ok: bad === 0, text: `${r.verified} of ${r.checked} files match; ${r.tampered.length} mismatched; ${r.missing.length} missing.` };
      }
    },
    {
      id: 'edl',
      name: 'Expected Document List (EDL) Gap Check',
      type: 'File Plan',
      description: 'Counts expected documents that are still placeholders (not yet filed).',
      run: async () => {
        await refreshData();
        const gaps = studyDocs.filter(d => d.status === 'Placeholder').length;
        return { ok: gaps === 0, text: `${gaps} placeholder(s) outstanding out of ${studyDocs.length} expected record(s).` };
      }
    },
    {
      id: 'locks',
      name: 'Checked-Out Document Locks',
      type: 'Version Control',
      description: 'Lists documents currently checked out for editing.',
      run: async () => {
        await refreshData();
        const locked = studyDocs.filter(d => d.checkout_status === 'Checked Out');
        return { ok: locked.length === 0, text: locked.length ? `${locked.length} document(s) checked out: ${locked.map(d => d.document_id).join(', ')}` : 'No documents are checked out.' };
      }
    },
    {
      id: 'qc',
      name: 'QC Backlog',
      type: 'Quality',
      description: 'Counts documents still awaiting QC or with an open query.',
      run: async () => {
        await refreshData();
        const pending = studyDocs.filter(d => d.qc_status === 'In Progress' || d.qc_status === 'Query Raised').length;
        return { ok: pending === 0, text: `${pending} document(s) pending QC or with an open query.` };
      }
    }
  ];

  const handleRun = async (check) => {
    setRunningJob(check.id);
    try {
      const outcome = await check.run();
      setResults(prev => ({ ...prev, [check.id]: { ...outcome, at: new Date().toLocaleString() } }));
    } catch (e) {
      setResults(prev => ({ ...prev, [check.id]: { ok: false, text: e.message, at: new Date().toLocaleString() } }));
    } finally {
      setRunningJob(null);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-full font-sans text-xs">
      <div>
        <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-700" />
          Compliance Checks
        </h1>
        <p className="text-xs text-slate-500 font-mono">
          On-demand checks computed from live study data. Results are not stored and no background scheduler is running.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checks.map(check => {
          const result = results[check.id];
          return (
            <div key={check.id} className="glass-panel p-5 rounded-xl space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold border border-purple-200">
                    {check.type}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">{check.name}</h3>
                  <p className="text-[11px] text-slate-500">{check.description}</p>
                </div>

                <button
                  disabled={runningJob === check.id}
                  onClick={() => handleRun(check)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-purple-100 text-purple-800 border border-purple-300 rounded font-semibold text-xs flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  {runningJob === check.id ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-600" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-purple-600 fill-purple-600" />
                      Run Now
                    </>
                  )}
                </button>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] space-y-1">
                {result ? (
                  <>
                    <p><strong className="text-slate-700">Last run (this session):</strong> {result.at}</p>
                    <p className={`flex items-center gap-1 font-semibold ${result.ok ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {result.ok ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />} {result.text}
                    </p>
                  </>
                ) : (
                  <p className="text-slate-500">Not run yet.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
