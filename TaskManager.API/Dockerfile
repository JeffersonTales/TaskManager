# Etapa base: runtime ASP.NET
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

# Etapa build: SDK para compilar o projeto
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia apenas o csproj e restaura dependências
COPY ["TaskManager.API/TaskManager.API.csproj", "TaskManager.API/"]
RUN dotnet restore "TaskManager.API/TaskManager.API.csproj"

# Copia o restante do código
COPY . .

# Compila o projeto
WORKDIR "/src/TaskManager.API"
RUN dotnet build "TaskManager.API.csproj" -c Release -o /app/build

# Etapa publish: gera artefatos para produção
FROM build AS publish
RUN dotnet publish "TaskManager.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Etapa final: imagem leve com app publicado
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# SQLite: garante que o banco seja criado se não existir
VOLUME ["/app"]
ENTRYPOINT ["dotnet", "TaskManager.API.dll"]