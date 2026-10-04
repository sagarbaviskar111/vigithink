// Calls the server-side SHA-256 re-verification of all stored files for a study.
export const runIntegrityCheck = async (studyId) => {
  const res = await fetch(`/api/etmf/documents/integrity-check?study_id=${encodeURIComponent(studyId || 'ALL')}`);
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) throw new Error(json?.error || 'Integrity check failed.');
  return json.data;
};
