namespace DreamService.Domain.Entities;

public class Dream
{
    public int Id { get; set; }
    public int UserId { get; set; }         // İlgili kullanıcı
    public string Text { get; set; } = null!;
    public string? Analysis { get; set; }   // GPT analizi opsiyonel
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
