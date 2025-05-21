FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# ✔ Doğru .sln dosyasını kopyala
COPY ./LucidMind.sln .

COPY ./services/ ./services/
COPY ./shared/ ./shared/
COPY ./services/AuthService/AuthService.API/AuthService.API.csproj ./AuthService.API/
COPY ./services/AuthService/AuthService.Application/AuthService.Application.csproj ./AuthService.Application/
COPY ./services/AuthService/AuthService.Domain/AuthService.Domain.csproj ./AuthService.Domain/
COPY ./services/AuthService/AuthService.Infrastructure/AuthService.Infrastructure.csproj ./AuthService.Infrastructure/
COPY ./shared/LucidMind.Shared/LucidMind.Shared.csproj ./LucidMind.Shared/

# ✔ Restore
RUN dotnet restore LucidMind.sln


COPY ./services/AuthService/AuthService.API/ ./AuthService.API/
COPY ./services/AuthService/AuthService.Application/ ./AuthService.Application/
COPY ./services/AuthService/AuthService.Domain/ ./AuthService.Domain/
COPY ./services/AuthService/AuthService.Infrastructure/ ./AuthService.Infrastructure/
COPY ./shared/LucidMind.Shared/ ./LucidMind.Shared/

WORKDIR /src/AuthService.API
RUN dotnet build -c Release -o /app/build
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "AuthService.API.dll"]
