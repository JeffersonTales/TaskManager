using TaskManager.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
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

            // Services
            builder.Services.AddControllers();
            builder.Services.AddDbContext<TaskDbContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddInfrastructure();

            var app = builder.Build();

            // Middleware
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseRouting(); // 👈 Adicionado

            app.UseCors(); // ✅ CORS aplicado

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}