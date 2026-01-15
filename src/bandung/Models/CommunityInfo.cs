namespace bandung.Models;

public class CommunityInfo
{
    public string Name { get; set; } = "AWS User Group Bandung";
    public string Mission { get; set; } = string.Empty;
    public List<string> Activities { get; set; } = new();
    public List<string> Benefits { get; set; } = new();
    public CommunityStats Stats { get; set; } = new();
}

public class CommunityStats
{
    public int MemberCount { get; set; }
    public int EventsHeld { get; set; }
    public DateTime EstablishedDate { get; set; }
}