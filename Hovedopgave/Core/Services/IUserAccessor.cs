using Microsoft.AspNetCore.Identity;

namespace Hovedopgave.Core.Services;

public interface IUserAccessor
{
    string GetUserId();
    Task<IdentityUser> GetUserAsync();
}