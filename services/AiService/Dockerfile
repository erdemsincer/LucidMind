# 🔹 RUNTIME
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

# 🔹 BUILD
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# ✅ SLN ve tüm projeleri (tam yapısıyla) kopyala
COPY ./LucidMind.sln .
COPY ./services/ ./services/
COPY ./shared/ ./shared/

# ✅ Restore
RUN dotnet restore LucidMind.sln

# ✅ Publish
WORKDIR /src/services/AiService/AiService.API
RUN dotnet publish -c Release -o /app/publish

# 🔹 FINAL IMAGE
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "AiService.API.dll"]
