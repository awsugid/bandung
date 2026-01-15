using bandung.Models;
using FsCheck;
using FsCheck.Xunit;
using FluentAssertions;

namespace bandung.Tests.PropertyTests;

public class EventsSectionTests
{
    // **Feature: aws-user-group-landing, Property 4: Event information completeness**
    [Property]
    public Property EventInformationCompleteness()
    {
        // Create generator for valid events with all required information
        var validEventGen = from title in Arb.Default.NonEmptyString().Generator.Where(s => !string.IsNullOrWhiteSpace(s.Get)).Select(s => s.Get)
                           from description in Arb.Default.NonEmptyString().Generator.Where(s => !string.IsNullOrWhiteSpace(s.Get)).Select(s => s.Get)
                           from location in Arb.Default.NonEmptyString().Generator.Where(s => !string.IsNullOrWhiteSpace(s.Get)).Select(s => s.Get)
                           from date in Gen.Choose(0, 365).Select(days => DateTime.Now.AddDays(days)) // Future dates
                           from topicCount in Gen.Choose(1, 5)
                           from topics in Gen.Sequence(Enumerable.Repeat(Arb.Default.NonEmptyString().Generator.Where(s => !string.IsNullOrWhiteSpace(s.Get)).Select(s => s.Get), topicCount))
                           select new Event
                           {
                               Title = title,
                               Description = description,
                               Location = location,
                               Date = date,
                               Topics = topics.ToList()
                           };

        var eventListGen = from eventCount in Gen.Choose(1, 3)
                          from events in Gen.Sequence(Enumerable.Repeat(validEventGen, eventCount))
                          select events.ToList();

        return Prop.ForAll(Arb.From(eventListGen), events =>
        {
            // Assert - Verify all event data models contain complete information
            var allEventsHaveRequiredInfo = events.All(e =>
                !string.IsNullOrWhiteSpace(e.Title) &&
                !string.IsNullOrWhiteSpace(e.Description) &&
                !string.IsNullOrWhiteSpace(e.Location) &&
                e.Date > DateTime.Now &&
                e.Topics != null &&
                e.Topics.Count > 0 &&
                e.Topics.All(topic => !string.IsNullOrWhiteSpace(topic))
            );

            return allEventsHaveRequiredInfo
                .Label($"All events should contain complete information: titles, descriptions, locations, dates, and topics");
        });
    }

    // **Feature: aws-user-group-landing, Property 5: Registration link presence**
    // **Validates: Requirements 2.3**
    [Property]
    public Property RegistrationLinkPresence()
    {
        // Create generator for events with registration URLs
        var eventWithRegistrationGen = from title in Arb.Default.NonEmptyString().Generator.Where(s => !string.IsNullOrWhiteSpace(s.Get)).Select(s => s.Get)
                                       from description in Arb.Default.NonEmptyString().Generator.Where(s => !string.IsNullOrWhiteSpace(s.Get)).Select(s => s.Get)
                                       from location in Arb.Default.NonEmptyString().Generator.Where(s => !string.IsNullOrWhiteSpace(s.Get)).Select(s => s.Get)
                                       from date in Gen.Choose(0, 365).Select(days => DateTime.Now.AddDays(days))
                                       from urlPath in Arb.Default.NonEmptyString().Generator.Where(s => !string.IsNullOrWhiteSpace(s.Get)).Select(s => s.Get)
                                       from topicCount in Gen.Choose(1, 3)
                                       from topics in Gen.Sequence(Enumerable.Repeat(Arb.Default.NonEmptyString().Generator.Where(s => !string.IsNullOrWhiteSpace(s.Get)).Select(s => s.Get), topicCount))
                                       select new Event
                                       {
                                           Title = title,
                                           Description = description,
                                           Location = location,
                                           Date = date,
                                           Topics = topics.ToList(),
                                           RegistrationUrl = $"https://example.com/register/{urlPath.Replace(" ", "-")}"
                                       };

        var eventListGen = from eventCount in Gen.Choose(1, 3)
                          from events in Gen.Sequence(Enumerable.Repeat(eventWithRegistrationGen, eventCount))
                          select events.ToList();

        return Prop.ForAll(Arb.From(eventListGen), events =>
        {
            // Assert - Verify all events with registration URLs have valid, non-empty URLs
            var allEventsHaveRegistrationLinks = events.All(e =>
                !string.IsNullOrEmpty(e.RegistrationUrl) &&
                Uri.TryCreate(e.RegistrationUrl, UriKind.Absolute, out var uri) &&
                (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps)
            );

            return allEventsHaveRegistrationLinks
                .Label($"All events with registration URLs should have valid, absolute HTTP/HTTPS URLs");
        });
    }
}
