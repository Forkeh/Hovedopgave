using Hovedopgave.Features.Account.Models;
using Hovedopgave.Features.Campaigns.Models;
using Hovedopgave.Features.Characters.Models;
using Hovedopgave.Features.Notes.Models;
using Hovedopgave.Features.Photos.Models;
using Hovedopgave.Features.Wiki.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Hovedopgave.Core.Data;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Campaign> Campaigns { get; set; }
    public required DbSet<Photo> Photos { get; set; }
    public required DbSet<MapPin> MapPins { get; set; }
    public required DbSet<WikiEntry> WikiEntries { get; set; }
    public required DbSet<Character> Characters { get; set; }
    public required DbSet<Note> Notes { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Campaign>()
            .HasOne(c => c.DungeonMaster)
            .WithMany()
            .HasForeignKey("DungeonMasterId")
            .IsRequired();

        builder.Entity<Campaign>()
            .HasMany(c => c.Users)
            .WithMany(u => u.Campaigns)
            .UsingEntity(j => j.ToTable("CampaignUsers"));

        builder.Entity<WikiEntry>()
            .Property(e => e.Xmin)
            .HasColumnType("xid")
            .ValueGeneratedOnAddOrUpdate()
            .IsConcurrencyToken();
    }
}