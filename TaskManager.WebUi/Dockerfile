# Etapa base: runtime ASP.NET
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

# Etapa build: SDK para compilar o projeto
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia apenas o csproj e restaura dependências
COPY ["TaskManager.WebUi/TaskManager.WebUi.csproj", "TaskManager.WebUi/"]
RUN dotnet restore "TaskManager.WebUi/TaskManager.WebUi.csproj"

# Copia o restante do código
COPY . .

# Compila o projeto
WORKDIR "/src/TaskManager.WebUi"
RUN dotnet build "TaskManager.WebUi.csproj" -c Release -o /app/build

# Etapa publish: gera artefatos para produção
FROM build AS publish
RUN dotnet publish "TaskManager.WebUi.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Etapa final: imagem leve com app publicado
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Define porta de escuta para o Azure
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "TaskManager.WebUi.dll"]