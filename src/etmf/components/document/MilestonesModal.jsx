import React, { useState } from 'react';
import { X, Calendar, Check, AlertCircle } from 'lucide-react';
import { useTMFData } from '../../context/TMFDataContext';
import { useAuth } from '../../context/AuthContext';

export default function MilestonesModal({ onClose }) {
  const { milestones, selectedStudyId, refreshData } = useTMFData();
  const { hasPermission } = useAuth();
  const canEdit = hasPermission('editMetadata');
  const [edits, setEdits] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type, text }

  const milestonesList = milestones.filter(m => m.study_id === selectedStudyId);
  const valueOf = (m, field) => (edits[m._id]?.[field] !== undefined ? edits[m._id][field] : (m[field] || ''));
  const setField = (m, field, value) => setEdits(prev => ({ ...prev, [m._id]: { ...prev[m._id], [field]: value } }));
  const dirtyIds = Object.keys(edits);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      for (const id of dirtyIds) {
        const res = await fetch(`/api/etmf/milestones/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(edits[id])
        });
        if (!res.ok) throw new Error((await res.json().catch(() => null))?.error || 'Save failed.');
      }
      await refreshData();
      setEdits({});
      setMessage({ type: 'success', text: 'Milestone dates saved.' });
    } catch (e) {
      setMessage({ type: 'error', text: e.message });
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] text-xs font-sans">
        
        {/* Header matching Screenshot Page 15 & 16 */}
        <div className="bg-clinevo-blue text-white px-4 py-2.5 flex items-center justify-between font-bold">
          <span className="text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Milestones Due Date
          </span>
          <button onClick={onClose} className="p-1 text-white hover:bg-blue-700 rounded cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success Alert Banner matching screenshot 16 */}
        {message && (
          <div className={`border-b p-2.5 font-medium flex items-center gap-2 text-xs ${message.type === 'success' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'}`}>
            {message.type === 'success' ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        {/* Milestones Data Table */}
        <div className="flex-1 overflow-auto p-4">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-clinevo-table-header text-white font-bold text-[11px]">
                <th className="p-2 border border-blue-800">Level Name</th>
                <th className="p-2 border border-blue-800">Folder Name</th>
                <th className="p-2 border border-blue-800 text-center">Sequence</th>
                <th className="p-2 border border-blue-800">Milestone Status</th>
                <th className="p-2 border border-blue-800">Planned Date</th>
                <th className="p-2 border border-blue-800">Actual Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800 font-sans">
              {milestonesList.length === 0 && (
                <tr><td colSpan={6} className="p-4 text-center text-slate-500">No milestones defined for this study.</td></tr>
              )}
              {milestonesList.map((m, idx) => (
                <tr key={m._id || idx} className="hover:bg-sky-50/60">
                  <td className="p-2 border border-slate-200 text-slate-700">{m.level}</td>
                  <td className="p-2 border border-slate-200 font-bold text-slate-800">{m.folder}</td>
                  <td className="p-2 border border-slate-200 text-center font-mono font-bold text-slate-700">{m.seq}</td>
                  <td className="p-2 border border-slate-200 font-semibold text-slate-900">{m.milestone}</td>
                  <td className="p-2 border border-slate-200 font-mono text-slate-600">
                    <input type="date" disabled={!canEdit} value={valueOf(m, 'planned')} onChange={(e) => setField(m, 'planned', e.target.value)} className="bg-transparent border border-slate-200 rounded px-1 py-0.5 disabled:border-transparent" />
                  </td>
                  <td className="p-2 border border-slate-200 font-mono text-emerald-700 font-bold">
                    <input type="date" disabled={!canEdit} value={valueOf(m, 'actual')} onChange={(e) => setField(m, 'actual', e.target.value)} className="bg-transparent border border-slate-200 rounded px-1 py-0.5 disabled:border-transparent" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-2.5 flex justify-end gap-2">
          <button 
            onClick={handleSave}
            disabled={isSaving || !canEdit || dirtyIds.length === 0}
            className="bg-clinevo-blue hover:bg-blue-700 text-white font-bold px-4 py-1.5 rounded cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
          >
            {isSaving && <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            Save
          </button>
          <button onClick={() => (dirtyIds.length ? setEdits({}) : onClose())} className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold px-4 py-1.5 rounded cursor-pointer">
            Undo
          </button>
        </div>

      </div>
    </div>
  );
}
