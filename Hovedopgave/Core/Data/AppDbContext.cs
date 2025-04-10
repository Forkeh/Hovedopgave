using Hovedopgave.Features.Account.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Hovedopgave.Core.Data;

// TODO Custom identity class in IdentityDbContext?
public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    
}