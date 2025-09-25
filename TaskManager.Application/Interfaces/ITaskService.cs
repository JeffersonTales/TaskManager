using TaskManager.Application.DTOs;

namespace TaskManager.Application.Interfaces
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItemDto>> GetAllAsync();
        Task<TaskItemDto?> GetByIdAsync(Guid id);
        Task AddAsync(TaskItemDto taskDto);
        Task UpdateAsync(TaskItemDto taskDto);
        Task DeleteAsync(Guid id);
    }
}
