using DreamService.Application.Dtos;
using DreamService.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text;
using System.Text.Json;

namespace DreamService.Infrastructure.Clients;

public class AiClient : IAiClient
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public AiClient(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }

    public async Task<string> AnalyzeAsync(string text, string mode)
    {
        var request = new AnalyzeDreamDto
        {
            DreamText = text,
            Mode = mode
        };

        var content = new StringContent(
            JsonSerializer.Serialize(request),
            Encoding.UTF8,
            "application/json"
        );

        var response = await _httpClient.PostAsync(
            $"{_config["AiService:Url"]}/api/ai/analyze", content
        );

        response.EnsureSuccessStatusCode();

        var responseContent = await response.Content.ReadAsStringAsync();
        var doc = JsonDocument.Parse(responseContent);

        return doc.RootElement.GetProperty("analysis").GetString()!;
    }
}
