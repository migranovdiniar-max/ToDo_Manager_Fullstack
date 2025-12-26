import ThemeSwitch from '../ThemeSwitch';


function Sidebar({ filter, setFilter, total, active }) {
  return (
    <aside className="tm-sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="tm-logo">TASK MANAGER</h1>
        <ThemeSwitch />
      </div>
      <h1 className="tm-logo">TASK MANAGER</h1>

      <div className="tm-filter-group">
        <button
          className={`tm-filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Все
        </button>
        <button
          className={`tm-filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Активные
        </button>
        <button
          className={`tm-filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Выполненные
        </button>
      </div>

      <p className="tm-summary">
        Всего: {total} · Активных: {active}
      </p>
    </aside>
  );
}

export default Sidebar;
