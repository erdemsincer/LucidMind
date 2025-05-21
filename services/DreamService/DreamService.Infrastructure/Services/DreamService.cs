using DreamService.Application.Dtos;
using DreamService.Application.Interfaces;
using DreamService.Domain.Entities;
using DreamService.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DreamService.Infrastructure.Services;

public class DreamService : IDreamService
{
    private readonly DreamDbContext _context;
    private readonly IAiClient _aiClient;

    public DreamService(DreamDbContext context, IAiClient aiClient)
    {
        _context = context;
        _aiClient = aiClient;
    }

    public async Task<string> CreateAsync(CreateDreamDto dto, int userId)
    {
        // 💡 GPT analiz al (varsayılan: freud)
        var analysis = await _aiClient.AnalyzeAsync(dto.Text, dto.Mode);

        var dream = new Dream
        {
            UserId = userId,
            Text = dto.Text,
            Analysis = analysis
        };

        _context.Dreams.Add(dream);
        await _context.SaveChangesAsync();

        return analysis; // 🟢 dream.Id yerine direkt analiz sonucu dönülüyor
    }


    public async Task<List<ResultDreamDto>> GetAllAsync(int userId)
    {
        return await _context.Dreams
            .Where(d => d.UserId == userId)
            .OrderByDescending(d => d.CreatedAt)
            .Select(d => new ResultDreamDto
            {
                Id = d.Id,
                UserId = d.UserId,
                Text = d.Text,
                Analysis = d.Analysis,
                CreatedAt = d.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<ResultDreamDto?> GetByIdAsync(int id)
    {
        return await _context.Dreams
            .Where(d => d.Id == id)
            .Select(d => new ResultDreamDto
            {
                Id = d.Id,
                UserId = d.UserId,
                Text = d.Text,
                Analysis = d.Analysis,
                CreatedAt = d.CreatedAt
            })
            .FirstOrDefaultAsync();
    }
}
