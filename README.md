Todo Manager Fullstack
Полноценный менеджер задач с бэкендом на FastAPI + PostgreSQL и фронтендом на React. Поддерживает регистрацию и авторизацию пользователей, создание задач, категории, шаблоны задач, поиск, фильтрацию и закрепление задач.
ЗАМЕЧАНИЕ: категории и фильтры по ним временно не работают - требуется доработака, остальное, начиная с аутентификации и заканчивая добавлением задач, работает в штатном режиме.

Стек
Backend: FastAPI, SQLAlchemy, Pydantic, Uvicorn
​

Frontend: React, axios, custom hooks (useTasks, useAuth).
​

БД: PostgreSQL 
​

Возможности
Регистрация и вход пользователя (сессионные куки).
![Todo Manager Screenshot](https://github.com/migranovdiniar-max/ToDo_Manager_Fullstack/blob/main/image.png?raw=true)


Создание, редактирование, удаление задач.

Флаги выполнения и закрепления задачи.

Категории задач: - временно не работает

выбор категории при создании;

фильтрация задач по категории;

создание новых категорий.

Шаблоны задач (task templates) с предустановленным заголовком, описанием и категорией.

Поиск по заголовку и описанию задачи.

Фильтры: все / активные / выполненные.

Пагинация списка задач.

Структура проекта
text
project-root/
  backend/
    app/
      main.py
      models.py
      schemas.py
      database.py
      routers/
        auth.py
        tasks.py
        categories.py
        templates.py
    venv/
    requirements.txt
  frontend/
    src/
      pages/
        Dashboard.jsx
      components/
        layout/
          PageLayout.jsx
          Sidebar.jsx
        tasks/
          NewTaskForm.jsx
          TaskList.jsx
          TaskModal.jsx
      hooks/
        useTasks.js
        useAuth.js
      context/
        AuthContext.js
    package.json

Запуск backend

bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/macOS

pip install -r requirements.txt

text
DATABASE_URL=postgresql://todo_user:todo_password@localhost:5432/todo_db
Применить миграции / создать таблицы (через Alembic или Base.metadata.create_all).

Запустить сервер:

bash
uvicorn app.main:app --reload
Бэкенд будет доступен по http://localhost:8000.

Запуск frontend
Установить зависимости:

bash
cd frontend
npm install
Убедиться, что в API‑клиенте используются URL вида:

http://localhost:8000/tasks/

http://localhost:8000/categories/

http://localhost:8000/task-templates/

http://localhost:8000/auth/login

http://localhost:8000/auth/register

и в запросах включены withCredentials / credentials: 'include' для работы с сессионными куки.
​

Запустить dev‑сервер:

bash
npm run dev
Фронт будет доступен по http://localhost:5173 

Основные эндпоинты
POST /auth/register — регистрация пользователя.

POST /auth/login — вход, установка сессионной куки.

POST /auth/logout — выход.

GET /tasks/ — список задач текущего пользователя.

POST /tasks/ — создать задачу.

PATCH /tasks/{id} — переключить статус выполнения.

PATCH /tasks/{id}/update — обновить поля задачи (описание, дедлайн, категория, флаг закрепления).

DELETE /tasks/{id} — удалить задачу.

GET /categories/ — список категорий пользователя.

POST /categories/ — создать категорию.

GET /task-templates/ — список шаблонов задач.

Все защищённые маршруты требуют авторизованного пользователя (сессия по кукам).

Как использовать
Зарегистрировать пользователя через форму регистрации на фронте.

Войти под этим пользователем.


Вывод: 
Задача проекта — типичное веб‑приложение с авторизацией и CRUD‑операциями над связанными сущностями.

FastAPI + PostgreSQL дают надёжный, понятный и продакшн‑ориентированный backend для такого рода задач.

React обеспечивает современный, реактивный интерфейс с удобной реализацией фильтров, поиска, пагинации и модалок.

Такой стек хорошо документирован и поддерживается сообществом, поэтому легко найти примеры и решения типичных проблем

Создавать задачи

Использовать поиск.

При необходимости редактировать задачи или менять их статус/закрепление.

Вывод:
Задача проекта — типичное веб‑приложение с авторизацией и CRUD‑операциями над связанными сущностями.

FastAPI + PostgreSQL дают надёжный, понятный и продакшн‑ориентированный backend для такого рода задач.

React обеспечивает современный, реактивный интерфейс с удобной реализацией фильтров, поиска, пагинации и модалок.

Такой стек хорошо документирован и поддерживается сообществом, поэтому легко найти примеры и решения типичных проблем
