namespace DreamService.Application.Dtos;

public class ResultDreamDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Text { get; set; } = null!;
    public string? Analysis { get; set; }
    public DateTime CreatedAt { get; set; }
}
