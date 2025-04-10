using Hovedopgave.Features.Account.Models;
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
        
        await context.SaveChangesAsync();
    }
}