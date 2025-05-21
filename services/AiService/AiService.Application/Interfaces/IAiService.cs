using AiService.Application.Dtos;

namespace AiService.Application.Interfaces;

public interface IAiService
{
    Task<AnalyzeResponseDto> AnalyzeAsync(AnalyzeDreamDto dto);
}
