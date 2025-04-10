using Microsoft.AspNetCore.Identity;

namespace Hovedopgave.Core.Data;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context, UserManager<IdentityUser> userManager)
    {
        var users = new List<IdentityUser>
        {
            new() { UserName = "bob@test.com", Email = "bob@test.com" },
            new() { UserName = "tom@test.com", Email = "tom@test.com" },
            new() { UserName = "jane@test.com", Email = "jane@test.com" }
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