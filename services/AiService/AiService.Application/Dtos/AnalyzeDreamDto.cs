namespace AiService.Application.Dtos;

public class AnalyzeDreamDto
{
    public string DreamText { get; set; } = null!;
    public string Mode { get; set; } = "freud"; // freud | jung | default
}
