import { useState, useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import NewTaskForm from '../components/tasks/NewTaskForm';
import TaskList from '../components/tasks/TaskList';
import TaskModal from '../components/tasks/TaskModal';
import { useTasks } from '../hooks/useTasks';
import { useDebounce } from '../hooks/useDebounce';

const ITEMS_PER_PAGE = 5;

function Dashboard() {
  const {
    allTasks = [],
    loading,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
  } = useTasks();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);

  const debouncedSearch = useDebounce(search, 500);

  // Фильтрация
  const filteredTasks = allTasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      (t.description || '').toLowerCase().includes(debouncedSearch.toLowerCase());

    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !t.completed) ||
      (filter === 'completed' && t.completed);

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.max(Math.ceil(filteredTasks.length / ITEMS_PER_PAGE), 1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Сброс на 1-ю страницу при изменении фильтра/поиска/задач
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, debouncedSearch, allTasks]);

  // Если на последней странице удалили задачу — перейти на предыдущую
  useEffect(() => {
    if (currentPage > 1 && paginatedTasks.length === 0) {
      setCurrentPage(prev => prev - 1);
    }
  }, [paginatedTasks.length, currentPage]);

  // Открытие модалки
  const openModal = (task) => setSelectedTask(task);
  const closeModal = () => setSelectedTask(null);

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
        openModal={openModal}
      />

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '16px', flexWrap: 'wrap' }}>
          {/* В начало и Назад */}
          <button
            className="tm-btn tm-btn-primary tm-btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            style={{ minWidth: '36px' }}
          >
            «
          </button>
          <button
            className="tm-btn tm-btn-primary tm-btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            style={{ minWidth: '36px' }}
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

          {/* Основные страницы */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) pageNum = i + 1;
            else if (currentPage <= 3) pageNum = i + 1;
            else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
            else pageNum = currentPage - 2 + i;
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

          {/* Вперёд и В конец */}
          <button
            className="tm-btn tm-btn-primary tm-btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            style={{ minWidth: '36px' }}
          >
            ›
          </button>
          <button
            className="tm-btn tm-btn-primary tm-btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            style={{ minWidth: '36px' }}
          >
            »
          </button>
        </div>
      )}

      {/* Модалка */}
      {selectedTask && <TaskModal task={selectedTask} onClose={closeModal} />}
    </PageLayout>
  );
}

export default Dashboard;
