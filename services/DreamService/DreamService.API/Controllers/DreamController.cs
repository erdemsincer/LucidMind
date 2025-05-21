using DreamService.Application.Dtos;
using DreamService.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DreamService.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize] // 🔐 Tüm endpointler için auth zorunlu
public class DreamController : ControllerBase
{
    private readonly IDreamService _dreamService;

    public DreamController(IDreamService dreamService)
    {
        _dreamService = dreamService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateDreamDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdStr) || !int.TryParse(userIdStr, out int userId))
            return Unauthorized("Kullanıcı kimliği alınamadı veya geçersiz.");

        var analysis = await _dreamService.CreateAsync(dto, userId);
        return Ok(new { analysis });
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdStr) || !int.TryParse(userIdStr, out int userId))
            return Unauthorized("Kullanıcı kimliği alınamadı veya geçersiz.");

        var result = await _dreamService.GetByIdAsync(id);
        if (result == null) return NotFound();
        if (result.UserId != userId) return Forbid();

        return Ok(result);
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetAll()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdStr) || !int.TryParse(userIdStr, out int userId))
            return Unauthorized("Kullanıcı kimliği alınamadı veya geçersiz.");

        var result = await _dreamService.GetAllAsync(userId);
        return Ok(result);
    }

    // 🔍 Geliştirme ve debug için token claim'lerini gösterir
    [HttpGet("claims")]
    public IActionResult GetClaims()
    {
        return Ok(User.Claims.Select(c => new { c.Type, c.Value }));
    }
}
