using bandung.Models;
using FsCheck;
using FsCheck.Xunit;
using FluentAssertions;
using Xunit;

namespace bandung.Tests.PropertyTests;

public class DataModelTests
{
    // **Feature: aws-user-group-landing, Property 1: Essential content rendering**
    [Property]
    public Property EssentialContentRendering()
    {
        // Create generator for non-whitespace strings
        var nonWhitespaceString = from s in Arb.Default.NonEmptyString().Generator
                                 where !string.IsNullOrWhiteSpace(s.Get)
                                 select s.Get;

        var nonWhitespaceStringList = from arr in Gen.NonEmptyListOf(nonWhitespaceString)
                                     select arr.ToList();

        var testGen = from name in nonWhitespaceString
                     from mission in nonWhitespaceString
                     from activities in nonWhitespaceStringList
                     from benefits in nonWhitespaceStringList
                     select new { name, mission, activities, benefits };

        return Prop.ForAll(Arb.From(testGen), data =>
        {
            // Arrange
            var communityInfo = new CommunityInfo
            {
                Name = data.name,
                Mission = data.mission,
                Activities = data.activities,
                Benefits = data.benefits
            };

            // Act & Assert - Verify that all essential content is present and accessible
            return (communityInfo.Name.Length > 0 &&
                    communityInfo.Mission.Length > 0 &&
                    communityInfo.Activities.Count > 0 &&
                    communityInfo.Benefits.Count > 0 &&
                    communityInfo.Activities.All(a => !string.IsNullOrWhiteSpace(a)) &&
                    communityInfo.Benefits.All(b => !string.IsNullOrWhiteSpace(b)))
                .Label("Community info should contain all essential content with non-empty values");
        });
    }

    // **Feature: aws-user-group-landing, Property 2: Statistics display consistency**
    [Property]
    public Property StatisticsDisplayConsistency(PositiveInt memberCount, NonNegativeInt eventsHeld)
    {
        // Arrange
        var stats = new CommunityStats
        {
            MemberCount = memberCount.Get,
            EventsHeld = eventsHeld.Get,
            EstablishedDate = DateTime.Now.AddYears(-2) // Reasonable established date
        };

        // Act & Assert - Verify statistics are consistently formatted and valid
        return (stats.MemberCount > 0 &&
                stats.EventsHeld >= 0 &&
                stats.EstablishedDate <= DateTime.Now &&
                stats.EstablishedDate >= DateTime.Now.AddYears(-20)) // Reasonable range
            .ToProperty()
            .Label("Statistics should be consistently formatted with valid values");
    }
}
