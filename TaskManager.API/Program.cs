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

            // Caminho seguro para o SQLite no Azure
            var dbPath = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
                "taskmanager.db"
            );

            // Registro de serviços
            builder.Services.AddControllers();
            builder.Services.AddValidatorsFromAssemblyContaining<TaskItemDtoValidator>();
            builder.Services.AddDbContext<TaskDbContext>(options =>
                options.UseSqlite($"Data Source={dbPath}"));
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddInfrastructure();

            var app = builder.Build();

            //Aplica migrations automaticamente
            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<TaskDbContext>();
                db.Database.Migrate();
            }

            // Pipeline de middleware
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}