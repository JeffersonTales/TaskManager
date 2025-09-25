const { createApp } = Vue;

createApp({
    data() {
        return {
            newTask: '',
            tasks: []
        };
    },
    methods: {
        async fetchTasks() {
            const apiBaseUrl =
                window.location.hostname === "localhost"
                    ? "https://localhost:7112"
                    : "http://taskmanager-api:8080";

            const res = await fetch(`${apiBaseUrl}/api/task`);
            this.tasks = await res.json();
        },
        async addTask() {
            try {
                const apiBaseUrl =
                    window.location.hostname === "localhost"
                        ? "https://localhost:7112"
                        : "http://taskmanager-api:8080";

                await fetch(`${apiBaseUrl}/api/task`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: crypto.randomUUID(),
                        title: this.newTask,
                        description: '',
                        isCompleted: false,
                        createdAt: new Date().toISOString()
                    })
                });

                this.newTask = '';
                this.fetchTasks();
            } catch (error) {
                console.error("Erro ao adicionar tarefa:", error);
            }
        }
    },
    mounted() {
        this.fetchTasks();
    }
}).mount('#app');