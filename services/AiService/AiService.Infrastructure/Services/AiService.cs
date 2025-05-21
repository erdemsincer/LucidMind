using AiService.Application.Dtos;
using AiService.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace AiService.Infrastructure.Services;

public class AiService : IAiService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public AiService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }

    public async Task<AnalyzeResponseDto> AnalyzeAsync(AnalyzeDreamDto dto)
    {
        var prompt = GeneratePrompt(dto.DreamText, dto.Mode);
        var requestBody = new
        {
            model = "gpt-3.5-turbo",
            messages = new[]
            {
                new { role = "user", content = prompt }
            }
        };

        var json = JsonSerializer.Serialize(requestBody);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", _config["OpenAI:ApiKey"]);

        var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
        var responseContent = await response.Content.ReadAsStringAsync();

        using var doc = JsonDocument.Parse(responseContent);
        var analysis = doc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();

        return new AnalyzeResponseDto { Analysis = analysis ?? "GPT yanıt veremedi." };
    }

    private string GeneratePrompt(string dreamText, string mode)
    {
        string prefix = mode.ToLower() switch
        {
            "freud" => "Lütfen bu rüyayı Sigmund Freud'un psikanalitik kuramına göre detaylı şekilde yorumla:",
            "jung" => "Lütfen bu rüyayı Carl Jung'un arketipsel semboller ve kolektif bilinçdışı kuramına göre analiz et:",
            _ => "Lütfen bu rüyayı psikolojik ve sembolik yönleriyle yorumla:"
        };

        return $"{prefix}\n\n{dreamText}";
    }

}
