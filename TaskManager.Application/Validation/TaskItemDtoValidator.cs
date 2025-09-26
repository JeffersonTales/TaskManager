using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Application.DTOs;

namespace TaskManager.Application.Validation
{
    public class TaskItemDtoValidator : AbstractValidator<TaskItemDto>
    {
        public TaskItemDtoValidator()
        {
            RuleFor(t => t.Id).NotEmpty();
            
            RuleFor(t => t.Title).NotEmpty()
                                 .WithMessage("Título é obrigatório.")
                                 .MaximumLength(100);

            RuleFor(t => t.Description).MaximumLength(500);
            
            RuleFor(t => t.CreatedAt).NotEmpty();
            
            RuleFor(t => t.CompletedAt).Must((dto, completedAt) => !dto.IsCompleted || completedAt != null)
                                       .WithMessage("Se a tarefa estiver concluída, a data de conclusão deve estar preenchida.");
        }
    }

}
