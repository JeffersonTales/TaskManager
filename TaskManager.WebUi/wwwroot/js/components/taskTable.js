// taskTable.js
export default {
    props: ['sortedTasks', 'editingTask', 'validationErrors', 'editTask', 'saveTask', 'deleteTask', 'completeTask'],
    template: `
    <table class="table table-bordered table-hover">
      <thead class="table-light">
        <tr>
          <th>Status</th>
          <th>Título</th>
          <th>Descrição</th>
          <th>Criada em</th>
          <th>Concluída em</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in sortedTasks" :key="task.id">
          <td>
            <input type="checkbox" class="form-check-input"
                   :checked="task.isCompleted"
                   @change="completeTask(task)" />
          </td>
          <td>
            <span v-if="editingTask?.id !== task.id"
                  :class="{ 'text-decoration-line-through text-muted': task.isCompleted }">
              {{ task.title }}
            </span>
            <div v-else>
              <input v-model="editingTask.title" class="form-control form-control-sm" />
              <div v-if="validationErrors.Title && editingTask?.id" class="text-danger mt-1">
                <ul class="mb-0">
                  <li v-for="(msg, index) in validationErrors.Title" :key="index">{{ msg }}</li>
                </ul>
              </div>
            </div>
          </td>
          <td>
             <span v-if="editingTask?.id !== task.id">
               {{ task.description }}
             </span>
             <div v-else>
               <textarea v-model="editingTask.description" class="form-control form-control-sm" rows="2"></textarea>
               <div v-if="validationErrors.Description && editingTask?.id" class="text-danger mt-1">
                 <ul class="mb-0">
                   <li v-for="(msg, index) in validationErrors.Description" :key="index">{{ msg }}</li>
                 </ul>
               </div>
             </div>
          </td>
          <td>{{ new Date(task.createdAt).toLocaleDateString('pt-BR') }}</td>
          <td>
            <span v-if="task.completedAt">{{ new Date(task.completedAt).toLocaleDateString('pt-BR') }}</span>
            <span v-else class="text-muted">—</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-sm btn-outline-info" @click="editTask(task)">Editar</button>
              <button class="btn btn-sm btn-outline-success" v-if="editingTask?.id === task.id" @click="saveTask">Salvar</button>
              <button class="btn btn-sm btn-outline-danger" @click="deleteTask(task.id)">Excluir</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  `
};