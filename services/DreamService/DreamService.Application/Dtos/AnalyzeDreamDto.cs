namespace DreamService.Application.Dtos;

public class AnalyzeDreamDto
{
    public string DreamText { get; set; } = null!;
    public string Mode { get; set; } = "default"; // freud | jung | default
}
