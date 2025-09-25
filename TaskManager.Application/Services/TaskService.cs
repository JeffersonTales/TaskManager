using Mapster;
using TaskManager.Application.DTOs;
using TaskManager.Application.Interfaces;
using TaskManager.Domain.Entities;
using TaskManager.Domain.Interfaces;

namespace TaskManager.Application.Services
{
    public class TaskService : ITaskService
    {

        #region Atributo de Injeção de Dependência
        private readonly ITaskRepository _repository;
        #endregion

        #region Construtor com Injeção de Dependência
        public TaskService(ITaskRepository repository)
        {
            _repository = repository;
        }
        #endregion

        #region Métodos de Contrato

        #region CRUD
        public async Task AddAsync(TaskItemDto taskDto)
        {
            taskDto.Id = await EnsureUniqueIdAsync(taskDto.Id);

            var task = taskDto.Adapt<TaskItem>();

            await _repository.AddAsync(task);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task UpdateAsync(TaskItemDto taskDto)
        {
            var task = taskDto.Adapt<TaskItem>();
            await _repository.UpdateAsync(task);
        }
        #endregion

        #region Consultas
        public async Task<IEnumerable<TaskItemDto>> GetAllAsync()
        {
            var tasks = await _repository.GetAllAsync();
            return tasks.Adapt<IEnumerable<TaskItemDto>>();
        }

        public async Task<TaskItemDto?> GetByIdAsync(Guid id)
        {
            var task = await _repository.GetByIdAsync(id);
            return task?.Adapt<TaskItemDto>();
        }
        #endregion

        #endregion

        private async Task<Guid> EnsureUniqueIdAsync(Guid id)
        {
            if (id == Guid.Empty || await _repository.ExistsAsync(id))
            {
                return Guid.NewGuid();
            }

            return id;
        }

    }
}
