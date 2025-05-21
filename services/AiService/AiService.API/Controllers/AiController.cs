using AiService.Application.Dtos;
using AiService.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AiService.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AiController : ControllerBase
{
    private readonly IAiService _aiService;

    public AiController(IAiService aiService)
    {
        _aiService = aiService;
    }

    [HttpPost("analyze")]
    public async Task<IActionResult> AnalyzeDream([FromBody] AnalyzeDreamDto dto)
    {
        var result = await _aiService.AnalyzeAsync(dto);
        return Ok(result);
    }
}
