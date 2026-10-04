// Clinidea Education — VigiThink eTMF 9 Industry Roles, Student Credentials & 6-Rotation Matrix

export const ROLES_DEFINITION = [
  {
    id: "system_admin",
    name: "System Administrator",
    category: "Founder / Admin",
    purpose: "System/user/RBAC administration",
    recommendedScope: "ALL / ALL / ALL",
    trainingUse: "Founder only (Tushar Patil)",
    description: "System administration, RBAC, users, study/site setup, system governance, credential management, and full administrative access.",
    permissions: {
      view: true,
      download: true,
      upload: true,
      editMetadata: true,
      version: true,
      review: true,
      comment: true,
      approve: true,
      part11Sign: true,
      reject: true,
      moveFile: true,
      delete: true,
      admin: true,
      inspectorView: false
    },
    scopeDefaults: { study: "ALL", country: "ALL", site: "ALL" },
    badgeColor: "bg-purple-100 text-purple-900 border-purple-300"
  },
  {
    id: "tmf_manager",
    name: "TMF Manager / TMF Lead",
    category: "Clinical Research Mentor",
    purpose: "TMF operational ownership and oversight",
    recommendedScope: "ALL training studies",
    trainingUse: "Mentor / Sukriti Singh",
    description: "TMF oversight, completeness, QC/review, student supervision, inspection readiness, and operational access across all training studies.",
    permissions: {
      view: true,
      download: true,
      upload: true,
      editMetadata: true,
      version: true,
      review: true,
      comment: true,
      approve: true,
      part11Sign: true,
      reject: true,
      moveFile: true,
      delete: false,
      admin: false,
      inspectorView: false
    },
    scopeDefaults: { study: "ALL", country: "ALL", site: "ALL" },
    badgeColor: "bg-sky-100 text-sky-900 border-sky-300"
  },
  {
    id: "ctm",
    name: "Clinical Trial Manager (CTM)",
    category: "Study Management",
    purpose: "Study-level operational management",
    recommendedScope: "Assigned study / all relevant sites",
    trainingUse: "Advanced student rotation",
    description: "Study-level oversight, document review, missing-document follow-up across all sites within assigned study.",
    permissions: {
      view: true,
      download: true,
      upload: true,
      editMetadata: true,
      version: true,
      review: true,
      comment: true,
      approve: true,
      part11Sign: false,
      reject: true,
      moveFile: true,
      delete: false,
      admin: false,
      inspectorView: false
    },
    scopeDefaults: { study: "CLIN-001", country: "India", site: "ALL" },
    badgeColor: "bg-blue-100 text-blue-900 border-blue-300"
  },
  {
    id: "cra",
    name: "Clinical Research Associate (CRA)",
    category: "Site Monitoring",
    purpose: "Site monitoring and document follow-up",
    recommendedScope: "Assigned study / assigned sites",
    trainingUse: "Student rotation",
    description: "Site monitoring, document follow-up, site-level document management. Least privilege; assigned study/site only.",
    permissions: {
      view: true,
      download: true,
      upload: true,
      editMetadata: false,
      version: true,
      review: true,
      comment: true,
      approve: false,
      part11Sign: false,
      reject: false,
      moveFile: false,
      delete: false,
      admin: false,
      inspectorView: false
    },
    scopeDefaults: { study: "CLIN-001", country: "India", site: "Site 001 - AIIMS RPC Eye Centre, New Delhi" },
    badgeColor: "bg-indigo-100 text-indigo-900 border-indigo-300"
  },
  {
    id: "site_user",
    name: "Site User / Investigator (PI)",
    category: "Clinical Site",
    purpose: "Site-side document responsibilities",
    recommendedScope: "Assigned study / own site",
    trainingUse: "Student rotation",
    description: "Site-side document upload and maintenance (PI CV, Medical License, DOA Log, ICF). Least privilege; own assigned site only.",
    permissions: {
      view: true,
      download: true,
      upload: true,
      editMetadata: false,
      version: true,
      review: false,
      comment: true,
      approve: false,
      part11Sign: false,
      reject: false,
      moveFile: false,
      delete: false,
      admin: false,
      inspectorView: false
    },
    scopeDefaults: { study: "CLIN-001", country: "India", site: "Site 002 - Sankara Nethralaya, Chennai" },
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300"
  },
  {
    id: "doc_controller",
    name: "Document Controller / TMF Specialist",
    category: "Quality & Indexing",
    purpose: "Filing, metadata and document control",
    recommendedScope: "Assigned study / TMF scope",
    trainingUse: "Student rotation",
    description: "Filing, indexing, metadata entry, version control, duplicate checks, and DIA TMF Reference Model classification.",
    permissions: {
      view: true,
      download: true,
      upload: true,
      editMetadata: true,
      version: true,
      review: true,
      comment: true,
      approve: false,
      part11Sign: false,
      reject: true,
      moveFile: true,
      delete: false,
      admin: false,
      inspectorView: false
    },
    scopeDefaults: { study: "CLIN-001", country: "India", site: "ALL" },
    badgeColor: "bg-teal-100 text-teal-900 border-teal-300"
  },
  {
    id: "qa",
    name: "Quality Assurance (QA)",
    category: "Quality Compliance",
    purpose: "QC, completeness and inspection readiness",
    recommendedScope: "Assigned study / QA scope",
    trainingUse: "Student rotation",
    description: "Completeness, metadata QC, document quality, inspection readiness checks. Read/review focused; no document upload.",
    permissions: {
      view: true,
      download: true,
      upload: false,
      editMetadata: true,
      version: false,
      review: true,
      comment: true,
      approve: false,
      part11Sign: false,
      reject: true,
      moveFile: false,
      delete: false,
      admin: false,
      inspectorView: false
    },
    scopeDefaults: { study: "CLIN-001", country: "India", site: "ALL" },
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300"
  },
  {
    id: "tmf_lead_trainee",
    name: "TMF Lead Trainee",
    category: "TMF Oversight Trainee",
    purpose: "Training exposure to TMF oversight",
    recommendedScope: "Assigned training study",
    trainingUse: "Student advanced rotation",
    description: "TMF completeness monitoring, filing oversight and inspection-readiness training. Training-only elevated access; no delete/admin.",
    permissions: {
      view: true,
      download: true,
      upload: true,
      editMetadata: true,
      version: true,
      review: true,
      comment: true,
      approve: false,
      part11Sign: false,
      reject: true,
      moveFile: true,
      delete: false,
      admin: false,
      inspectorView: false
    },
    scopeDefaults: { study: "CLIN-001", country: "India", site: "ALL" },
    badgeColor: "bg-cyan-100 text-cyan-900 border-cyan-300"
  },
  {
    id: "auditor",
    name: "Auditor / FDA Inspector",
    category: "Regulatory Inspector",
    purpose: "Controlled read-only inspection access",
    recommendedScope: "Inspection scope only",
    trainingUse: "Optional simulation",
    description: "Controlled read-only inspection access. Searches essential documents, checks 21 CFR Part 11 audit trails, verifies e-signatures.",
    permissions: {
      view: true,
      download: true,
      upload: false,
      editMetadata: false,
      version: false,
      review: true,
      comment: true,
      approve: false,
      part11Sign: false,
      reject: false,
      moveFile: false,
      delete: false,
      admin: false,
      inspectorView: true
    },
    scopeDefaults: { study: "CLIN-001", country: "ALL", site: "ALL" },
    badgeColor: "bg-rose-100 text-rose-900 border-rose-300"
  }
];

export const ROTATION_SCHEDULE = [
  {
    rotation: "Rotation 1",
    weeks: "Week 1–2",
    objective: "Understand role responsibilities and basic document lifecycle",
    assignments: {
      "usr_shweta": { roleId: "cra", label: "CRA" },
      "usr_sanjay": { roleId: "site_user", label: "Site User / PI" },
      "usr_somesh": { roleId: "doc_controller", label: "Document Controller" },
      "usr_gourish": { roleId: "qa", label: "QA" },
      "usr_shubham": { roleId: "ctm", label: "CTM" },
      "usr_mary": { roleId: "tmf_lead_trainee", label: "TMF Lead Trainee" }
    }
  },
  {
    rotation: "Rotation 2",
    weeks: "Week 3–4",
    objective: "Connect site, CRA, filing, QA and study oversight workflows",
    assignments: {
      "usr_shweta": { roleId: "site_user", label: "Site User / PI" },
      "usr_sanjay": { roleId: "doc_controller", label: "Document Controller" },
      "usr_somesh": { roleId: "qa", label: "QA" },
      "usr_gourish": { roleId: "ctm", label: "CTM" },
      "usr_shubham": { roleId: "tmf_lead_trainee", label: "TMF Lead Trainee" },
      "usr_mary": { roleId: "cra", label: "CRA" }
    }
  },
  {
    rotation: "Rotation 3",
    weeks: "Week 5–6",
    objective: "Perform end-to-end operational workflow",
    assignments: {
      "usr_shweta": { roleId: "doc_controller", label: "Document Controller" },
      "usr_sanjay": { roleId: "qa", label: "QA" },
      "usr_somesh": { roleId: "ctm", label: "CTM" },
      "usr_gourish": { roleId: "tmf_lead_trainee", label: "TMF Lead Trainee" },
      "usr_shubham": { roleId: "cra", label: "CRA" },
      "usr_mary": { roleId: "site_user", label: "Site User / PI" }
    }
  },
  {
    rotation: "Rotation 4",
    weeks: "Week 7–8",
    objective: "Independent document quality and study operations",
    assignments: {
      "usr_shweta": { roleId: "qa", label: "QA" },
      "usr_sanjay": { roleId: "ctm", label: "CTM" },
      "usr_somesh": { roleId: "tmf_lead_trainee", label: "TMF Lead Trainee" },
      "usr_gourish": { roleId: "cra", label: "CRA" },
      "usr_shubham": { roleId: "site_user", label: "Site User / PI" },
      "usr_mary": { roleId: "doc_controller", label: "Document Controller" }
    }
  },
  {
    rotation: "Rotation 5",
    weeks: "Week 9–10",
    objective: "Scenario-based clinical trial/TMF problem solving",
    assignments: {
      "usr_shweta": { roleId: "ctm", label: "CTM" },
      "usr_sanjay": { roleId: "tmf_lead_trainee", label: "TMF Lead Trainee" },
      "usr_somesh": { roleId: "cra", label: "CRA" },
      "usr_gourish": { roleId: "site_user", label: "Site User / PI" },
      "usr_shubham": { roleId: "doc_controller", label: "Document Controller" },
      "usr_mary": { roleId: "qa", label: "QA" }
    }
  },
  {
    rotation: "Rotation 6",
    weeks: "Week 11–12",
    objective: "Final integrated simulation and role assessment",
    assignments: {
      "usr_shweta": { roleId: "tmf_lead_trainee", label: "TMF Lead Trainee" },
      "usr_sanjay": { roleId: "cra", label: "CRA" },
      "usr_somesh": { roleId: "site_user", label: "Site User / PI" },
      "usr_gourish": { roleId: "doc_controller", label: "Document Controller" },
      "usr_shubham": { roleId: "qa", label: "QA" },
      "usr_mary": { roleId: "ctm", label: "CTM" }
    }
  }
];

export const INITIAL_SETUP_CHECKLIST = [
  { no: 1, item: "Create CLIN-001 training study (CE-QVJ499-2026-001)", owner: "Tushar Patil", status: "Completed", notes: "Use one common simulated study for the full 3 months" },
  { no: 2, item: "Create India country scope", owner: "Tushar Patil", status: "Completed", notes: "Training environment only" },
  { no: 3, item: "Create 6 training sites (1 per student)", owner: "Tushar Patil", status: "Completed", notes: "Prefer one assigned site per student for site-level roles" },
  { no: 4, item: "Create user accounts & credentials", owner: "Tushar Patil", status: "Completed", notes: "Student @clinidea.in logins & passwords configured" },
  { no: 5, item: "Assign initial roles (Rotation 1)", owner: "Tushar Patil", status: "Completed", notes: "Use Initial Role Assignment sheet" },
  { no: 6, item: "Configure role permissions", owner: "Tushar Patil", status: "Completed", notes: "Follow Role Management sheet" },
  { no: 7, item: "Assign study/country/site scope", owner: "Tushar Patil", status: "Completed", notes: "Apply least-privilege access" },
  { no: 8, item: "Create initial TMF document structure", owner: "Sukriti Singh", status: "Completed", notes: "Zones/artifacts relevant to training study" },
  { no: 9, item: "Prepare document scenarios", owner: "Sukriti Singh", status: "In Progress", notes: "Missing docs, wrong metadata, wrong version, QC rejection" },
  { no: 10, item: "Start Rotation 1 (Weeks 1–2)", owner: "Sukriti Singh", status: "Active", notes: "Weeks 1–2 live operational training" },
  { no: 11, item: "Review student activity / audit trail", owner: "Tushar + Sukriti", status: "Active", notes: "Weekly review of 21 CFR Part 11 logs" }
];
