const { createApp } = Vue;

createApp({
    data() {
        return {
            newTask: '',
            tasks: [],
            editingTask: null,
            filter: 'all'
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
        }
    },
    methods: {
        apiUrl(path) {
            return (window.location.hostname === "localhost"
                ? "https://localhost:7112"
                : "http://taskmanager-api:8080") + path;
        },
        async fetchTasks() {
            const res = await fetch(this.apiUrl("/api/task"));
            this.tasks = await res.json();
        },
        async addTask() {
            if (!this.newTask.trim()) return;

            await fetch(this.apiUrl("/api/task"), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: crypto.randomUUID(),
                    title: this.newTask,
                    description: '',
                    isCompleted: false,
                    createdAt: new Date().toISOString(),
                    completedAt: null
                })
            });

            this.newTask = '';
            this.fetchTasks();
        },
        editTask(task) {
            this.editingTask = { ...task };
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
            await fetch(this.apiUrl(`/api/task/${task.id}/complete`), { method: 'PATCH' });
            this.fetchTasks();
        }
    },
    mounted() {
        this.fetchTasks();
    }
}).mount('#app');