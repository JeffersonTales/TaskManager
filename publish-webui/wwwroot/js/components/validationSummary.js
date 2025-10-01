export default {
    props: ['errors'],
    computed: {
        hasErrors() {
            return Object.keys(this.errors).length > 0;
        }
    },
    methods: {
        formatField(field) {
            const labels = {
                Title: 'Título',
                Description: 'Descrição',
                CreatedAt: 'Data de criação',
                CompletedAt: 'Data de conclusão',
                Id: 'Identificador'
            };
            return labels[field] || field;
        }
    },
    template: `
    <div v-if="hasErrors" class="alert alert-danger mt-3">
      <ul class="mb-0">
        <li v-for="(messages, field) in errors" :key="field">
          <strong>{{ formatField(field) }}:</strong>
          <ul class="mb-0">
            <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
          </ul>
        </li>
      </ul>
    </div>
  `
};