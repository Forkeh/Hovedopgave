using Microsoft.AspNetCore.Identity;

namespace Hovedopgave.Features.Account.Models;

public class User : IdentityUser
{
    public string? DisplayName { get; set; }
}