// taskForm.js
export default {
    props: ['newTask', 'validationErrors', 'addTask', 'formattedCreatedAt'],
    template: `
    <div class="card mb-4">
      <div class="card-header">Nova Tarefa</div>
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label">Título</label>
          <input v-model="newTask.title" class="form-control" placeholder="Título da tarefa" />
          <div v-if="validationErrors.Title" class="text-danger mt-1">
            <ul class="mb-0">
              <li v-for="(msg, index) in validationErrors.Title" :key="index">{{ msg }}</li>
            </ul>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Descrição</label>
          <textarea v-model="newTask.description" class="form-control" rows="2" placeholder="Descrição da tarefa"></textarea>
          <div v-if="validationErrors.Description" class="text-danger mt-1">
            <ul class="mb-0">
              <li v-for="(msg, index) in validationErrors.Description" :key="index">{{ msg }}</li>
            </ul>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Data de criação</label>
          <input type="text" class="form-control" :value="formattedCreatedAt" readonly />
        </div>

        <button class="btn btn-primary" @click="addTask">Adicionar</button>
      </div>
    </div>
  `
};