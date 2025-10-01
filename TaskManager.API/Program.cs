using FluentValidation;
using Microsoft.EntityFrameworkCore;
using TaskManager.Application.Validation;
using TaskManager.Infra.Data.Context;
using TaskManager.Infra.IoC;

namespace TaskManager.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            // Caminho persistente para o SQLite no Azure
            var dbPath = "/home/data/taskmanager.db";

            // Registro de serviços
            builder.Services.AddControllers();
            builder.Services.AddValidatorsFromAssemblyContaining<TaskItemDtoValidator>();
            builder.Services.AddDbContext<TaskDbContext>(options =>
                options.UseSqlite($"Data Source={dbPath}"));
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddInfrastructure();

            var app = builder.Build();

            // Aplica migrations automaticamente com tratamento de erro
            try
            {
                using var scope = app.Services.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<TaskDbContext>();
                db.Database.Migrate();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao aplicar migração: {ex.Message}");
                // Aqui você pode logar em um arquivo ou serviço externo se quiser
            }

            // Pipeline de middleware
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}