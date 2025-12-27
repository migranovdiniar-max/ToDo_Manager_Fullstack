import { useState, useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import NewTaskForm from '../components/tasks/NewTaskForm';
import TaskList from '../components/tasks/TaskList';
import { useTasks } from '../hooks/useTasks';
import { useDebounce } from '../hooks/useDebounce'; 

const ITEMS_PER_PAGE = 5;

function Dashboard() {
  const {
    allTasks,
    loading,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
  } = useTasks();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  // Фильтрация и пагинация
  const filteredTasks = allTasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                          (t.description || '').toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesFilter = filter === 'all' ||
                          (filter === 'active' && !t.completed) ||
                          (filter === 'completed' && t.completed);
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Сброс на 1-ю страницу при изменении фильтра/поиска
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, debouncedSearch]);

  // Если на последней странице удалили задачу и нечего показывать — перейти на предыдущую
  useEffect(() => {
    if (currentPage > 1 && paginatedTasks.length === 0) {
      setCurrentPage(prev => prev - 1);
    }
  }, [paginatedTasks.length, currentPage]);

  return (
    <PageLayout
      filter={filter}
      setFilter={setFilter}
      total={allTasks.length}
      active={allTasks.filter(t => !t.completed).length}
    >
      <NewTaskForm onAdd={addTask} />

      {/* Поиск */}
      <div className="tm-form-row">
        <input
          type="text"
          className="tm-input"
          placeholder="Поиск по заголовку или описанию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <TaskList
        tasks={paginatedTasks}
        loading={loading}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />

      {totalPages > 1 && (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '16px', flexWrap: 'wrap' }}>
        {/* Кнопка "В начало" и "Назад" */}
        <button
        className="tm-btn tm-btn-primary tm-btn-sm"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(1)}
        style={{ minWidth: '36px' }}
        aria-label="First page"
        >
        «
        </button>
        <button
        className="tm-btn tm-btn-primary tm-btn-sm"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => prev - 1)}
        style={{ minWidth: '36px' }}
        aria-label="Previous page"
        >
        ‹
        </button>

        {/* Первые страницы */}
        {currentPage > 3 && (
        <>
            <button
            className="tm-btn tm-btn-sm"
            onClick={() => setCurrentPage(1)}
            style={{ minWidth: '36px' }}
            >
            1
            </button>
            <span className="tm-text-muted" style={{ alignSelf: 'center', padding: '0 6px' }}>
            ...
            </span>
        </>
        )}

        {/* Основные страницы: текущая ±1 */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        let pageNum;
        if (totalPages <= 5) {
            pageNum = i + 1;
        } else if (currentPage <= 3) {
            pageNum = i + 1; // 1,2,3,4,5
        } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i; // 96,97,98,99,100
        } else {
            pageNum = currentPage - 2 + i; // 4,5,6,7,8
        }
        return pageNum;
        }).map((pageNum) => (
        <button
            key={pageNum}
            className={`tm-btn tm-btn-sm ${currentPage === pageNum ? 'tm-btn-primary' : 'tm-btn'}`}
            onClick={() => setCurrentPage(pageNum)}
            style={{ minWidth: '36px' }}
            aria-current={currentPage === pageNum ? 'page' : undefined}
        >
            {pageNum}
        </button>
        ))}

        {/* Последние страницы */}
        {currentPage < totalPages - 2 && (
        <>
            <span className="tm-text-muted" style={{ alignSelf: 'center', padding: '0 6px' }}>
            ...
            </span>
            <button
            className="tm-btn tm-btn-sm"
            onClick={() => setCurrentPage(totalPages)}
            style={{ minWidth: '36px' }}
            >
            {totalPages}
            </button>
        </>
        )}

        {/* Кнопка "Вперёд" и "В конец" */}
        <button
        className="tm-btn tm-btn-primary tm-btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(prev => prev + 1)}
        style={{ minWidth: '36px' }}
        aria-label="Next page"
        >
        ›
        </button>
        <button
        className="tm-btn tm-btn-primary tm-btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(totalPages)}
        style={{ minWidth: '36px' }}
        aria-label="Last page"
        >
        »
        </button>
    </div>
    )}
    </PageLayout>
  );
}

export default Dashboard;
