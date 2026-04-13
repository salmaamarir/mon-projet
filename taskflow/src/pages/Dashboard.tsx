import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../features/auth/authSlice';

// On importe le hook que tu as créé (assure-toi du chemin du fichier)
import useProjects from '../hooks/useProjects';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ProjectForm from '../components/ProjectForm';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  // 1. On utilise le hook personnalisé pour gérer toute la logique data
  const { 
    projects, 
    columns, 
    loading, 
    addProject, 
    renameProject, 
    deleteProject 
  } = useProjects();

  // 2. On ne garde ici que l'état local de l'interface (UI)
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // 3. Fonctions de l'interface mémoisées
  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  if (loading) return <div className={styles.loading}>Chargement...</div>;

  return (
    <div className={styles.layout}>
      <Header 
        title="TaskFlow" 
        onMenuClick={toggleSidebar} 
        userName={user?.name} 
        onLogout={handleLogout} 
      />
      
      <div className={styles.body}>
        <Sidebar 
          projects={projects} 
          isOpen={sidebarOpen} 
          onRenameProject={renameProject} // Vient du hook
          onDeleteProject={deleteProject} // Vient du hook
        />
        
        <div className={styles.content}>
          <div className={styles.toolbar}> 
            {!showForm ? ( 
              <button 
                className={styles.addBtn} 
                onClick={() => setShowForm(true)}
              > 
                + Nouveau projet 
              </button> 
            ) : ( 
              <ProjectForm 
                submitLabel="Créer" 
                onSubmit={(name, color) => { 
                  addProject(name, color); // Vient du hook
                  setShowForm(false); 
                }} 
                onCancel={() => setShowForm(false)} 
              /> 
            )} 
          </div>

          <MainContent columns={columns} />
        </div>
      </div>
    </div>
  );
}