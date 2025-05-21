using DreamService.Application.Dtos;

namespace DreamService.Application.Interfaces;

public interface IAiClient
{
    Task<string> AnalyzeAsync(string text, string mode);
}
