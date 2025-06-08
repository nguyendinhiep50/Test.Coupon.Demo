using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Test.Coupon.Api.Web.Infrastructure;

public static class Extensions
{
    public static void AddApplicationServices(this IHostApplicationBuilder builder)
    {
        // Avoid loading full database config and migrations if startup
        // is being invoked from build-time OpenAPI generation
        if (builder.Environment.IsEnvironment("Build") || Assembly.GetEntryAssembly()?.GetName().Name == "GetDocument.Insider")
        {
            builder.Services.AddDbContext<ApplicationDbContext>();
            return;
        }
    }
}
