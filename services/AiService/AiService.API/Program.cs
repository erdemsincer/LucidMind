using AiService.Application.Interfaces;
using AiService.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Add HttpClient + DI
builder.Services.AddHttpClient<IAiService, AiService.Infrastructure.Services.AiService>();

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger UI
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
