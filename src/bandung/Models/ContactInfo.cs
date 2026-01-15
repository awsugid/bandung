namespace bandung.Models;

public class ContactInfo
{
    public string PrimaryEmail { get; set; } = string.Empty;
    public Dictionary<string, string> SocialMediaLinks { get; set; } = new();
    public List<CommunityPlatform> OnlinePlatforms { get; set; } = new();
}

public class CommunityPlatform
{
    public string Name { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Purpose { get; set; } = string.Empty;
}