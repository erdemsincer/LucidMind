using AiService.Application.Interfaces;
using AiService.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// ✅ CORS - herkese açık
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// HTTP Client + DI
builder.Services.AddHttpClient<IAiService, AiService.Infrastructure.Services.AiService>();

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ✅ CORS Middleware aktif et
app.UseCors("AllowAll");

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
