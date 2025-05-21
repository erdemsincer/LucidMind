using DreamService.Application.Dtos;

namespace DreamService.Application.Interfaces;

public interface IDreamService
{
    Task<string> CreateAsync(CreateDreamDto dto, int userId);

    Task<List<ResultDreamDto>> GetAllAsync(int userId);
    Task<ResultDreamDto?> GetByIdAsync(int id);
}
