import TaskForm from './components/taskForm.js';
import TaskTable from './components/taskTable.js';
import ValidationSummary from './components/validationSummary.js';

const app = Vue.createApp({
    data() {
        return {
            newTask: {
                title: '',
                description: '',
                isCompleted: false,
                createdAt: new Date().toISOString(),
                completedAt: null
            },
            tasks: [],           // Lista de tarefas carregadas da API
            editingTask: null,   // Tarefa que está sendo editada
            filter: 'all',       // Filtro ativo: 'all', 'pending', 'completed'
            validationErrors: {} // ← Objeto para armazenar erros de validação

        };
    },
    computed: {
        filteredTasks() {
            if (this.filter === 'completed') return this.tasks.filter(t => t.isCompleted);
            if (this.filter === 'pending') return this.tasks.filter(t => !t.isCompleted);
            return this.tasks;
        },
        sortedTasks() {
            return this.filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        },
        formattedCreatedAt() {
            const date = new Date(this.newTask.createdAt);
            return date.toLocaleDateString('pt-BR');
        }
    },
    methods: {
        apiUrl(path) {
            const isDocker = window.location.port === "5001";
            const base = isDocker
                ? "http://localhost:5000" // Docker: API sem SSL
                : "https://localhost:7112"; // Local: API com SSL

            return base + path;
        },
        async fetchTasks() {
            const res = await fetch(this.apiUrl("/api/task"));
            this.tasks = await res.json();
        },
        async addTask() {
            if (!this.newTask.title.trim()) return;

            const response = await fetch(this.apiUrl("/api/task"), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.newTask)
            });

            if (!response.ok) {
                const errorData = await response.json();
                this.validationErrors = errorData.errors || {};

                setTimeout(() => {
                    this.validationErrors = {};
                }, 3000);

                return;
            }

            this.newTask = {
                title: '',
                description: '',
                isCompleted: false,
                createdAt: new Date().toISOString(),
                completedAt: null
            };
            this.validationErrors = {};
            this.fetchTasks();
        },
        editTask(task) {
            this.editingTask = { ...task };
            this.validationErrors = {};
        },
        async saveTask() {
            await fetch(this.apiUrl(`/api/task/${this.editingTask.id}`), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.editingTask)
            });

            this.editingTask = null;
            this.fetchTasks();
        },
        async deleteTask(id) {
            await fetch(this.apiUrl(`/api/task/${id}`), { method: 'DELETE' });
            this.fetchTasks();
        },
        async completeTask(task) {
            const updatedTask = {
                ...task,
                isCompleted: !task.isCompleted,
                completedAt: !task.isCompleted ? new Date().toISOString() : null
            };

            await fetch(this.apiUrl(`/api/task/${task.id}`), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask)
            });

            this.fetchTasks();
        }
    },
    mounted() {
        this.fetchTasks();
    }
});

app.component('validation-summary', ValidationSummary);
app.component('task-form', TaskForm);
app.component('task-table', TaskTable);

app.mount('#app');