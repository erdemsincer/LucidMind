using DreamService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace DreamService.Infrastructure.Data;

public class DreamDbContext : DbContext
{
    public DreamDbContext(DbContextOptions<DreamDbContext> options)
        : base(options) { }
    public DbSet<Dream> Dreams => Set<Dream>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Dream>(entity =>
        {
            entity.HasKey(d => d.Id);
            entity.Property(d => d.Text).IsRequired();
            
        });

        base.OnModelCreating(modelBuilder);
    }
}
