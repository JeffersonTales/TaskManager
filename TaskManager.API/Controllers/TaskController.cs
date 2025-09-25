using Microsoft.AspNetCore.Mvc;
using TaskManager.Application.DTOs;
using TaskManager.Application.Interfaces;

namespace TaskManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        #region Atributo de Injeção de Dependência
        private readonly ITaskService _service;
        #endregion

        #region Construtor com Injeção de Dependência
        public TaskController(ITaskService service)
        {
            _service = service;
        }
        #endregion

        #region Endpoints Consulta

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItemDto>>> GetAll()
        {
            var tasks = await _service.GetAllAsync();
            return Ok(tasks);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<TaskItemDto>> GetById(Guid id)
        {
            var task = await _service.GetByIdAsync(id);
            if (task is null)
                return NotFound();
            return Ok(task);
        }
        #endregion

        #region Endpoints CRUD
        [HttpPost]
        public async Task<ActionResult> Create(TaskItemDto taskDto)
        {
            await _service.AddAsync(taskDto);
            return CreatedAtAction(actionName: nameof(GetById),
                                   routeValues: new { id = taskDto.Id },
                                   value: taskDto);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult> Update(Guid id, TaskItemDto taskDto)
        {
            if (id != taskDto.Id)
                return BadRequest("ID mismatch");

            var existingTask = await _service.GetByIdAsync(id);

            if (existingTask is null)
                return NotFound();

            await _service.UpdateAsync(taskDto);

            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var existingTask = await _service.GetByIdAsync(id);

            if (existingTask is null)
                return NotFound();

            await _service.DeleteAsync(id);

            return NoContent();
        }
        #endregion
    }
}
