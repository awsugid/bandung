namespace bandung.Models;

public class Event
{
    public string Title { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Location { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string RegistrationUrl { get; set; } = string.Empty;
    public List<string> Topics { get; set; } = new();
}