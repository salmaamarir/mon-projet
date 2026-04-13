import { memo } from 'react'; // 1. Import de memo
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

interface Project { id: string; name: string; color: string; }

interface SidebarProps { 
  projects: Project[]; 
  isOpen: boolean; 
  onRenameProject?: (project: Project) => void;
  onDeleteProject?: (id: string) => void;
}

function Sidebar({ projects, isOpen, onRenameProject, onDeleteProject }: SidebarProps) {
  // 2. Ajout du log pour surveiller les re-renders
  console.log('Sidebar re-render 📁');

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <h2 className={styles.title}>Mes Projets</h2>
      <ul className={styles.list}>
        {projects.map(p => (
          <li key={p.id} style={{ display: 'flex', alignItems: 'center' }}>
            <NavLink
              to={`/projects/${p.id}`}
              style={{ flex: 1 }}
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ''}`
              }
            >
              <span className={styles.dot} style={{ background: p.color }} />
              {p.name}
            </NavLink>
            
            <div style={{ display: 'flex', gap: '4px', marginLeft: '8px' }}>
              {onRenameProject && (
                <button 
                  onClick={() => onRenameProject(p)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                  title="Renommer"
                >
                  ✎
                </button>
              )}
              {onDeleteProject && (
                <button 
                  onClick={() => onDeleteProject(p.id)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#e74c3c', fontSize: '1rem' }}
                  title="Supprimer"
                >
                  ×
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// 3. Exportation avec memo
export default memo(Sidebar);