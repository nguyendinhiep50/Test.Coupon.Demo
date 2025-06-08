using Microsoft.EntityFrameworkCore;
using Npgsql;
using Test.Coupon.Api.Web.Infrastructure;

namespace SimulationProjectEShop.Catalog.API.Infrastructure;

public partial class ApplicationDbContextSeed(
    IWebHostEnvironment env,
    ILogger<ApplicationDbContextSeed> logger) : IDbSeeder<ApplicationDbContext>
{
    public async Task SeedAsync(ApplicationDbContext context)
    {
        var contentRootPath = env.ContentRootPath;
        var picturePath = env.WebRootPath;

        // Workaround from https://github.com/npgsql/efcore.pg/issues/292#issuecomment-388608426
        context.Database.OpenConnection();
        ((NpgsqlConnection)context.Database.GetDbConnection()).ReloadTypes();

        if (!context.Products.Any())
        {
            var products = new List<Product>
            {
                new Product { Name = "Sản phẩm A" },
                new Product { Name = "Sản phẩm B" },
                new Product { Name = "Sản phẩm C" }
            };

            if (products.Any())
            {
                await context.Products.AddRangeAsync(products);
            }
            logger.LogInformation("Seeded catalog with {NumItems} items", context.Products.Count());
            await context.SaveChangesAsync();
        }
    }
}
