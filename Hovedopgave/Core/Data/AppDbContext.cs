using Hovedopgave.Features.Account.Models;
using Hovedopgave.Features.Campaign.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Hovedopgave.Core.Data;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Campaign> Campaigns { get; set; }

   protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        // TODO: Rename columns to be singular?
        builder.Entity<Campaign>()
            .HasMany(c => c.Users)
            .WithMany(u => u.Campaigns)
            .UsingEntity(j => j.ToTable("CampaignUsers"));
    }
}