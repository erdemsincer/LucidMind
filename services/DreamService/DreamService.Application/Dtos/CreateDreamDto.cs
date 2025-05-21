namespace DreamService.Application.Dtos;

public class CreateDreamDto
{    public string Text { get; set; } = null!;
    public string? Analysis { get; set; }
    public string Mode { get; set; } = "freud";// Opsiyonel: AI'dan gelen analiz
}
