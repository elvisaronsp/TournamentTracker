using TournamentTracker.Models;

namespace TournamentTracker.Services.Interfaces
{
    public interface IApplicationUserService
    {
            ApplicationUser GetUserById(string id);
    }
}