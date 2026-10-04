import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ROLES_DEFINITION, ROTATION_SCHEDULE, INITIAL_SETUP_CHECKLIST } from '../data/initialRolesData';
import { getToken, setToken, clearToken, UNAUTHORIZED_EVENT } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(() => Boolean(getToken()));
  const [usersList, setUsersList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeRoleId, setActiveRoleId] = useState('');
  const [setupChecklist, setSetupChecklist] = useState(INITIAL_SETUP_CHECKLIST);

  // 4D Scoping State
  const [selectedStudyScope, setSelectedStudyScope] = useState('ALL');
  const [selectedCountryScope, setSelectedCountryScope] = useState('ALL');
  const [selectedSiteScope, setSelectedSiteScope] = useState('ALL');
  const [isInspectorMode, setIsInspectorMode] = useState(false);

  const applySession = useCallback((u) => {
    setCurrentUser(u);
    setActiveRoleId(u.roleId);
    setSelectedStudyScope(u.studyScope || 'ALL');
    setSelectedCountryScope(u.countryScope || 'ALL');
    setSelectedSiteScope(u.siteScope || 'ALL');
    setIsInspectorMode(u.roleId === 'auditor');
    setIsAuthenticated(true);
  }, []);

  const clearSession = useCallback(() => {
    clearToken();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveRoleId('');
    setUsersList([]);
  }, []);

  // Fetch live users from the server (requires a valid session)
  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch('/api/etmf/users');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) setUsersList(json.data);
      }
    } catch {
      // network error - keep the current list
    }
  }, []);

  // Restore an existing session on page load
  useEffect(() => {
    if (!getToken()) return;
    (async () => {
      try {
        const res = await fetch('/api/etmf/users/me');
        const json = res.ok ? await res.json() : null;
        if (json && json.success) {
          applySession(json.data);
          fetchUsers();
        } else {
          clearToken();
        }
      } catch {
        clearToken();
      } finally {
        setIsAuthLoading(false);
      }
    })();
  }, [applySession, fetchUsers]);

  // Sign out when the server rejects the session (expired / deactivated)
  useEffect(() => {
    window.addEventListener(UNAUTHORIZED_EVENT, clearSession);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, clearSession);
  }, [clearSession]);

  // Get active role definition
  const currentRole = ROLES_DEFINITION.find(r => r.id === activeRoleId) || ROLES_DEFINITION[0];

  // Login with Login ID / Email & password (verified by the server)
  const loginWithCredentials = async (loginInput, password) => {
    try {
      const res = await fetch('/api/etmf/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginInput, password })
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success && data.token) {
        setToken(data.token);
        applySession(data.data);
        fetchUsers();
        return { success: true, user: data.data };
      }
      return { success: false, error: data?.error || 'Login failed. Please try again.' };
    } catch {
      return { success: false, error: 'Cannot reach the server. Please try again.' };
    }
  };

  const logout = () => {
    clearSession();
  };

  // View-as for administrators only. This changes the UI view; the server still acts as the signed-in admin.
  const switchUserPersona = (userIdOrRole) => {
    if (currentUser?.roleId !== 'system_admin') return;
    const found =
      usersList.find(u => u.id === userIdOrRole || u.loginId === userIdOrRole) ||
      usersList.find(u => u.roleId === userIdOrRole);
    if (found) {
      setActiveRoleId(found.roleId);
      setSelectedStudyScope(found.studyScope || 'ALL');
      setSelectedCountryScope(found.countryScope || 'ALL');
      setSelectedSiteScope(found.siteScope || 'ALL');
      setIsInspectorMode(found.roleId === 'auditor');
    }
  };

  const switchRole = (roleOrUserId) => {
    switchUserPersona(roleOrUserId);
  };

  // Admin: Create new user credential
  const createUserCredential = async (newUserData) => {
    try {
      const res = await fetch('/api/etmf/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newUserData, adminUser: currentUser })
      });
      const json = await res.json();
      if (json.success && json.data) {
        setUsersList(prev => [...prev, json.data]);
        return { success: true, data: json.data };
      }
      return { success: false, error: json.error || 'Failed to create user' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Admin: Update user role, scope, or credential details
  const updateUserCredential = async (userId, updatedFields) => {
    try {
      const res = await fetch(`/api/etmf/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updatedFields, adminUser: currentUser })
      });
      const json = await res.json();
      if (json.success && json.data) {
        setUsersList(prev => prev.map(u => (u.id === userId ? json.data : u)));
        if (currentUser.id === userId) {
          setCurrentUser(json.data);
          setActiveRoleId(json.data.roleId);
          setSelectedStudyScope(json.data.studyScope);
          setSelectedCountryScope(json.data.countryScope);
          setSelectedSiteScope(json.data.siteScope);
        }
        return { success: true, data: json.data };
      }
      return { success: false, error: json.error || 'Failed to update user' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Admin: Activate / Deactivate user account
  const toggleUserActiveStatus = async (userId) => {
    try {
      const res = await fetch(`/api/etmf/users/${userId}/toggle-active`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminUser: currentUser })
      });
      const json = await res.json();
      if (json.success && json.data) {
        setUsersList(prev => prev.map(u => (u.id === userId ? json.data : u)));
        return { success: true, data: json.data };
      }
      return { success: false, error: json.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Admin: Delete user credential
  const deleteUserCredential = async (userId) => {
    try {
      const res = await fetch(`/api/etmf/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminUser: currentUser })
      });
      const json = await res.json();
      if (json.success) {
        setUsersList(prev => prev.filter(u => u.id !== userId));
        return { success: true };
      }
      return { success: false, error: json.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Admin / Mentor: Apply Rotation 1 to 6 across all 6 students
  const applyStudentRotation = async (rotationName) => {
    try {
      const res = await fetch('/api/etmf/users/apply-rotation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rotationName, adminUser: currentUser })
      });
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setUsersList(json.data);
        const updatedCurrent = json.data.find(u => u.id === currentUser.id);
        if (updatedCurrent) {
          setCurrentUser(updatedCurrent);
          setActiveRoleId(updatedCurrent.roleId);
          setSelectedSiteScope(updatedCurrent.siteScope);
        }
        return { success: true, message: json.message };
      }
      return { success: false, error: json.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Check action permissions (View, Download, Upload, Edit, Review, Approve, Delete, Admin)
  const hasPermission = (permissionKey) => {
    if (activeRoleId === 'system_admin') return true; // Admin (Tushar Patil) has full access to everything
    if (isInspectorMode || activeRoleId === 'auditor') {
      if (permissionKey === 'view' || permissionKey === 'download' || permissionKey === 'comment' || permissionKey === 'inspectorView' || permissionKey === 'review') return true;
      return false;
    }
    return !!currentRole?.permissions?.[permissionKey];
  };

  // Verify if document is accessible under 4D scope (Role x Study x Country x Site)
  const isDocumentInScope = (doc) => {
    if (!doc) return false;
    if (activeRoleId === 'system_admin' || activeRoleId === 'tmf_manager') return true;

    if (selectedStudyScope !== 'ALL' && doc.study_id !== selectedStudyScope) return false;
    if (selectedCountryScope !== 'ALL' && doc.country_code !== selectedCountryScope && doc.country_code !== 'GLOBAL' && doc.country_code !== 'IND') return false;
    if (selectedSiteScope !== 'ALL' && doc.site_id !== selectedSiteScope && doc.site_id !== 'CENTRAL' && doc.site_id !== 'GLOBAL') return false;
    return true;
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isAuthLoading,
      currentUser,
      currentRole,
      rolesList: ROLES_DEFINITION,
      demoUsers: usersList,
      usersList,
      rotationSchedule: ROTATION_SCHEDULE,
      setupChecklist,
      setSetupChecklist,
      loginWithCredentials,
      logout,
      switchUserPersona,
      switchRole,
      createUserCredential,
      updateUserCredential,
      toggleUserActiveStatus,
      deleteUserCredential,
      applyStudentRotation,
      fetchUsers,
      selectedStudyScope,
      setSelectedStudyScope,
      selectedCountryScope,
      setSelectedCountryScope,
      selectedSiteScope,
      setSelectedSiteScope,
      isInspectorMode,
      setIsInspectorMode,
      hasPermission,
      isDocumentInScope
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
