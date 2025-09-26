using System.ComponentModel.DataAnnotations;

namespace TaskManager.Application.DTOs
{
    public class TaskItemDto
    {
        [Required(ErrorMessage = "O ID é obrigatório.")]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "O título é obrigatório.")]
        [MaxLength(100, ErrorMessage = "O título deve ter no máximo 100 caracteres.")]
        public string Title { get; set; } = string.Empty;

        [MaxLength(500, ErrorMessage = "A descrição deve ter no máximo 500 caracteres.")]
        public string Description { get; set; } = string.Empty;

        public bool IsCompleted { get; set; }

        [Required(ErrorMessage = "A data de criação é obrigatória.")]
        public DateTime CreatedAt { get; set; }

        public DateTime? CompletedAt { get; set; }

    }
}
