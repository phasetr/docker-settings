using Microsoft.EntityFrameworkCore;

namespace dotnet;
public class DataContext : DbContext
{
    protected readonly IConfiguration Configuration;
    public DataContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
    }
    public DbSet<User> User { get; set; }
    public DbSet<Job> Job { get; set; }
}