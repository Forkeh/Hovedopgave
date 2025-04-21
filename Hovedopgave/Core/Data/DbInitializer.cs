using Hovedopgave.Features.Account.Models;
using Hovedopgave.Features.Campaign.Models;
using Microsoft.AspNetCore.Identity;

namespace Hovedopgave.Core.Data;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context, UserManager<User> userManager)
    {
        var users = new List<User>
        {
            new() { DisplayName = "Bob", UserName = "bob@test.com", Email = "bob@test.com" },
            new() { DisplayName = "Tom", UserName = "tom@test.com", Email = "tom@test.com" },
            new() { DisplayName = "Jane", UserName = "jane@test.com", Email = "jane@test.com" }
        };

        if (!userManager.Users.Any())
        {
            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }

        if (!context.Campaigns.Any())
        {
            var campaigns = new List<Campaign>
            {
                new()
                {
                    DungeonMaster = users[0],
                    Name = "Campaign 1",
                    Users = [users[1], users[2]]
                    
                },
                new()
                {
                    DungeonMaster = users[1],
                    Name = "Campaign 2",
                    Users = [users[0]]
                    
                },
                new()
                {
                    DungeonMaster = users[2],
                    Name = "Campaign 3",
                }
            };
            
            await context.Campaigns.AddRangeAsync(campaigns);
        }
        
       
        
        
        
        await context.SaveChangesAsync();
    }
}