'use client';

import React, { useState, useEffect } from 'react';
import { getData, sendData, deleteData } from '../../../api/getData';
import styles from './page.module.scss';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to: string;
  created_by: string;
  due_date: string | null;
  created_at: string;
  completed_at: string | null;
  estimated_hours: number | null;
  actual_hours: number | null;
  category: string;
}

interface TaskFilters {
  status: string;
  priority: string;
  search: string;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<TaskFilters>({
    status: 'all',
    priority: 'all',
    search: ''
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createInStatus, setCreateInStatus] = useState<string>('pending');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const statusColumns = [
    { key: 'pending', title: 'Ожидает', color: '#6c757d' },
    { key: 'in_progress', title: 'В работе', color: '#ffc107' },
    { key: 'completed', title: 'Завершена', color: '#28a745' },
    { key: 'cancelled', title: 'Отменена', color: '#dc3545' }
  ];

  const priorityColors = {
    low: '#28a745',
    medium: '#ffc107',
    high: '#fd7e14',
    urgent: '#dc3545'
  };

  const priorityLabels = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
    urgent: 'Срочный'
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await getData('api/v1/seller/tasks/');
      setTasks(response || []);
    } catch (error) {
      console.error('Error loading tasks:', error);
      // Mock data for development
      setTasks([
        {
          id: 1,
          title: 'Обновить каталог товаров',
          description: 'Добавить новые товары и обновить цены',
          status: 'pending',
          priority: 'high',
          assigned_to: 'Иван Иванов',
          created_by: 'Петр Петров',
          due_date: '2024-01-15T10:00:00Z',
          created_at: '2024-01-10T09:00:00Z',
          completed_at: null,
          estimated_hours: 4,
          actual_hours: null,
          category: 'Каталог'
        },
        {
          id: 2,
          title: 'Проверить заказы',
          description: 'Обработать новые заказы клиентов',
          status: 'in_progress',
          priority: 'urgent',
          assigned_to: 'Анна Сидорова',
          created_by: 'Петр Петров',
          due_date: '2024-01-12T15:00:00Z',
          created_at: '2024-01-11T08:00:00Z',
          completed_at: null,
          estimated_hours: 2,
          actual_hours: 1.5,
          category: 'Заказы'
        },
        {
          id: 3,
          title: 'Настроить склад',
          description: 'Провести инвентаризацию склада',
          status: 'completed',
          priority: 'medium',
          assigned_to: 'Сергей Козлов',
          created_by: 'Петр Петров',
          due_date: '2024-01-10T12:00:00Z',
          created_at: '2024-01-08T10:00:00Z',
          completed_at: '2024-01-10T11:30:00Z',
          estimated_hours: 6,
          actual_hours: 5.5,
          category: 'Склад'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filters.status !== 'all' && task.status !== filters.status) return false;
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !task.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const handleCreateTask = (status: string) => {
    setCreateInStatus(status);
    setShowCreateModal(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleSaveTask = async (taskData: Partial<Task>) => {
    try {
      if (editingTask) {
        // Update existing task
        const updatedTask = { ...editingTask, ...taskData };
        await sendData(`api/v1/seller/tasks/${editingTask.id}/`, updatedTask);
        setTasks(tasks.map(t => t.id === editingTask.id ? updatedTask : t));
        setEditingTask(null);
      } else {
        // Create new task
        const taskPayload = {
          ...taskData,
          status: createInStatus
        };
        
        // Send to backend and get response with real ID
        const createdTask = await sendData('api/v1/seller/tasks/', taskPayload);
        
        // Use the task returned from backend (with real ID)
        if (createdTask && createdTask.id) {
          setTasks([...tasks, createdTask as Task]);
        } else {
          // Fallback: create with temporary ID if backend fails
          const fallbackTask = {
            ...taskData,
            status: createInStatus,
            id: Date.now(),
            created_at: new Date().toISOString(),
            created_by: 'Текущий пользователь',
            assigned_to: 'Текущий пользователь'
          };
          setTasks([...tasks, fallbackTask as Task]);
        }
        
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error('Error saving task:', error);
      // For development, just update local state
      if (editingTask) {
        const updatedTask = { ...editingTask, ...taskData };
        setTasks(tasks.map(t => t.id === editingTask.id ? updatedTask : t));
        setEditingTask(null);
      } else {
        const newTask = {
          ...taskData,
          status: createInStatus,
          id: Date.now(),
          created_at: new Date().toISOString(),
          created_by: 'Текущий пользователь',
          assigned_to: 'Текущий пользователь',
          completed_at: null,
          due_date: null,
          estimated_hours: null,
          actual_hours: null,
          category: 'Без категории'
        };
        setTasks([...tasks, newTask as Task]);
        setShowCreateModal(false);
      }
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteData(`seller/tasks/${taskId}/`, {});
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      // For development, just update local state
      setTasks(tasks.filter(t => t.id !== taskId));
    }
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(task));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    
    let taskData;
    try {
      const dragData = e.dataTransfer.getData('text/plain');
      if (!dragData) {
        console.error('No drag data available');
        return;
      }
      taskData = JSON.parse(dragData);
    } catch (parseError) {
      console.error('Error parsing drag data:', parseError);
      return;
    }
    
    const updatedTask = { ...taskData, status: newStatus };
    
    if (newStatus === 'completed' && !updatedTask.completed_at) {
      updatedTask.completed_at = new Date().toISOString();
    } else if (newStatus !== 'completed') {
      updatedTask.completed_at = null;
    }
    
    try {
      // Update local state immediately for better UX
      setTasks(tasks.map(t => t.id === taskData.id ? updatedTask : t));
      
      // Try to update on backend
      await sendData(`api/v1/seller/tasks/${taskData.id}/`, updatedTask);
      
      console.log(`Task ${taskData.id} status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating task status on backend:', error);
      
      // Revert local state if backend update failed
      setTasks(tasks.map(t => t.id === taskData.id ? taskData : t));
      
      // Show error message to user
      alert('Ошибка при сохранении изменений. Попробуйте еще раз.');
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка задач...</div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Задачи</h1>
        
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <input
              type="text"
              placeholder="Поиск задач..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filterGroup}>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className={styles.filterSelect}
            >
              <option value="all">Все статусы</option>
              {statusColumns.map(col => (
                <option key={col.key} value={col.key}>{col.title}</option>
              ))}
            </select>
          </div>
          
          <div className={styles.filterGroup}>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className={styles.filterSelect}
            >
              <option value="all">Все приоритеты</option>
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
              <option value="urgent">Срочный</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.kanban}>
        {statusColumns.map(column => {
          const columnTasks = getTasksByStatus(column.key);
          return (
            <div
              key={column.key}
              className={styles.column}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.key)}
            >
              <div className={styles.columnHeader} style={{ borderTopColor: column.color }}>
                <h3 className={styles.columnTitle}>{column.title}</h3>
                <span className={styles.taskCount}>{columnTasks.length}</span>
                <button
                  className={styles.addTaskBtn}
                  onClick={() => handleCreateTask(column.key)}
                  title={`Создать задачу в статусе "${column.title}"`}
                >
                  +
                </button>
              </div>
              
              <div className={styles.columnContent}>
                {columnTasks.map(task => (
                  <div
                    key={task.id}
                    className={styles.taskCard}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onClick={() => handleEditTask(task)}
                  >
                    <div className={styles.taskHeader}>
                      <h4 className={styles.taskTitle}>{task.title}</h4>
                      <div
                        className={styles.priorityBadge}
                        style={{ backgroundColor: priorityColors[task.priority] }}
                      >
                        {priorityLabels[task.priority]}
                      </div>
                    </div>
                    
                    <p className={styles.taskDescription}>{task.description}</p>
                    
                    <div className={styles.taskMeta}>
                      <div className={styles.taskInfo}>
                        <span className={styles.category}>{task.category}</span>
                        {task.due_date && (
                          <span className={styles.dueDate}>
                            📅 {formatDate(task.due_date)}
                          </span>
                        )}
                      </div>
                      
                      <div className={styles.taskActions}>
                        <button
                          className={styles.deleteBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTask(task.id);
                          }}
                          title="Удалить задачу"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    
                    <div className={styles.taskFooter}>
                      <span className={styles.assignee}>👤 {task.assigned_to}</span>
                      {task.estimated_hours && (
                        <span className={styles.hours}>
                          ⏱️ {task.estimated_hours}ч
                          {task.actual_hours && ` / ${task.actual_hours}ч`}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                
                {columnTasks.length === 0 && (
                  <div className={styles.emptyColumn}>
                    <p>Нет задач</p>
                    <button
                      className={styles.createFirstTask}
                      onClick={() => handleCreateTask(column.key)}
                    >
                      Создать первую задачу
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

        {/* Task Creation/Edit Modal */}
        {(showCreateModal || editingTask) && (
          <TaskModal
            task={editingTask}
            isOpen={showCreateModal || !!editingTask}
            onClose={() => {
              setShowCreateModal(false);
              setEditingTask(null);
            }}
            onSave={handleSaveTask}
            defaultStatus={createInStatus}
          />
        )}
      </div>
    </div>
  );
};

// Task Modal Component
interface TaskModalProps {
  task?: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Partial<Task>) => void;
  defaultStatus: string;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose, onSave, defaultStatus }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: (task?.priority || 'medium') as 'low' | 'medium' | 'high' | 'urgent',
    assigned_to: task?.assigned_to || '',
    due_date: task?.due_date ? task.due_date.split('T')[0] : '',
    estimated_hours: task?.estimated_hours || '',
    category: task?.category || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      estimated_hours: formData.estimated_hours ? Number(formData.estimated_hours) : null,
      due_date: formData.due_date ? `${formData.due_date}T00:00:00Z` : null
    });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{task ? 'Редактировать задачу' : 'Создать задачу'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label>Название задачи *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className={styles.formInput}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Описание</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={styles.formTextarea}
              rows={3}
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Приоритет</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' | 'urgent' })}
                className={styles.formSelect}
              >
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
                <option value="urgent">Срочный</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Категория</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={styles.formInput}
                placeholder="Например: Каталог, Заказы"
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Исполнитель</label>
              <input
                type="text"
                value={formData.assigned_to}
                onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                className={styles.formInput}
                placeholder="Имя исполнителя"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Срок выполнения</label>
              <input
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                className={styles.formInput}
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label>Оценка времени (часы)</label>
            <input
              type="number"
              step="0.5"
              min="0"
              value={formData.estimated_hours}
              onChange={(e) => setFormData({ ...formData, estimated_hours: e.target.value })}
              className={styles.formInput}
              placeholder="Например: 2.5"
            />
          </div>
          
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Отмена
            </button>
            <button type="submit" className={styles.saveBtn}>
              {task ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TasksPage;
