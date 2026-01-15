namespace bandung.Models;

public class LandingPageConfig
{
    public CommunityInfo Community { get; set; } = new();
    public ContactInfo Contact { get; set; } = new();
    public List<Event> UpcomingEvents { get; set; } = new();
    public ThemeSettings Theme { get; set; } = new();
}

public class ThemeSettings
{
    public string PrimaryColor { get; set; } = "#FF9900"; // AWS Orange
    public string SecondaryColor { get; set; } = "#232F3E"; // AWS Dark Blue
    public string AccentColor { get; set; } = "#146EB4"; // AWS Blue
}