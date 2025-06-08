using Microsoft.EntityFrameworkCore;
using SimulationProjectEShop.Catalog.API.Infrastructure;
using Test.Coupon.Api.Web.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();

// Redis cache
builder.AddRedisOutputCache("cache");

// Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Razor Components
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

// DbContext + Seed Data
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("CouponDemo"));
});
builder.Services.AddMigration<ApplicationDbContext, ApplicationDbContextSeed>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
var app = builder.Build();
app.UseCors("AllowFrontend");

// Middleware và môi trường
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
}

app.UseHttpsRedirection();

// Swagger UI
app.UseSwagger();
app.UseSwaggerUI();

// Antiforgery + Cache
app.UseAntiforgery();
app.UseOutputCache();

// Static files + Razor + Controller
app.MapStaticAssets();
//app.MapRazorComponents<App>()
//    .AddInteractiveServerRenderMode();

app.MapControllers();
app.MapDefaultEndpoints();

app.Run();
