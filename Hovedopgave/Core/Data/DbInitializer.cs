using Hovedopgave.Features.Account.Models;
using Hovedopgave.Features.Campaigns.Models;
using Hovedopgave.Features.Notes.Models;
using Microsoft.AspNetCore.Identity;

namespace Hovedopgave.Core.Data;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context, UserManager<User> userManager)
    {
        var users = new List<User>
        {
            new() { DisplayName = "Brian", UserName = "brian@test.com", Email = "brian@test.com" },
            new() { DisplayName = "Frederik", UserName = "frederik@test.com", Email = "frederik@test.com" },
            new() { DisplayName = "Inese", UserName = "inese@test.com", Email = "inese@test.com" },
            new() { DisplayName = "Danny", UserName = "danny@test.com", Email = "danny@test.com" },
        };

        if (!userManager.Users.Any())
        {
            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }

        var campaigns = new List<Campaign>
        {
            new()
            {
                DungeonMaster = users[0],
                Name = "Shattered Realm",
                Users = [users[1], users[2]]
            },
            new()
            {
                DungeonMaster = users[1],
                Name = "Storm Watch",
                Users = [users[0]]
            },
            new()
            {
                DungeonMaster = users[2],
                Name = "Ironbound"
            }
        };

        if (!context.Campaigns.Any())
        {
            await context.Campaigns.AddRangeAsync(campaigns);
        }

        if (!context.Notes.Any())
        {
            var notes = new List<Note>
            {
                new()
                {
                    Content = "<p>Notes for Campaign 1 - Bob</p>",
                    Campaign = campaigns[0],
                    CampaignId = campaigns[0].Id,
                    User = users[0],
                    UserId = users[0].Id
                },
                new()
                {
                    Content = "<p>Notes for Campaign 1 - Tom</p>",
                    Campaign = campaigns[0],
                    CampaignId = campaigns[0].Id,
                    User = users[1],
                    UserId = users[1].Id
                },
                new()
                {
                    Content = "<p>Notes for Campaign 1 - Jane</p>",
                    Campaign = campaigns[0],
                    CampaignId = campaigns[0].Id,
                    User = users[2],
                    UserId = users[2].Id
                },
                new()
                {
                    Content = "<p>Notes for Campaign 2 - Tom</p>",
                    Campaign = campaigns[1],
                    CampaignId = campaigns[1].Id,
                    User = users[1],
                    UserId = users[1].Id
                },
                new()
                {
                    Content = "<p>Notes for Campaign 2 - Bob</p>",
                    Campaign = campaigns[1],
                    CampaignId = campaigns[1].Id,
                    User = users[0],
                    UserId = users[0].Id
                },
                new()
                {
                    Content = "<p>Notes for Campaign 3 - Jane</p>",
                    Campaign = campaigns[2],
                    CampaignId = campaigns[2].Id,
                    User = users[2],
                    UserId = users[2].Id
                },
            };

            if (!context.Notes.Any())
            {
                await context.Notes.AddRangeAsync(notes);
            }
        }

        await context.SaveChangesAsync();
    }
}
