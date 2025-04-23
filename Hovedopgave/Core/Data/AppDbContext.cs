using Hovedopgave.Features.Account.Models;
using Hovedopgave.Features.Campaign.Models;
using Hovedopgave.Features.Photos.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Hovedopgave.Core.Data;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Campaign> Campaigns { get; set; }
    public required DbSet<Photo> Photos { get; set; }
    public required DbSet<MapPin> MapPins { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Campaign>()
            .HasOne(c => c.DungeonMaster)
            .WithMany()
            .HasForeignKey("DungeonMasterId")
            .IsRequired();

        // TODO: Rename columns to be singular?
        builder.Entity<Campaign>()
            .HasMany(c => c.Users)
            .WithMany(u => u.Campaigns)
            .UsingEntity(j => j.ToTable("CampaignUsers"));
    }
}