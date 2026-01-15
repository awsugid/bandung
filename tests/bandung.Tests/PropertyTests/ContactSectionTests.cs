using bandung.Models;
using bandung.Components;
using FsCheck;
using FsCheck.Xunit;
using FluentAssertions;
using Bunit;
using Xunit;

namespace bandung.Tests.PropertyTests;

public class ContactSectionTests
{
    // **Feature: aws-user-group-landing, Property 6: Contact information rendering**
    // **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**
    [Property]
    public Property ContactInformationRendering()
    {
        // Create generator for valid email addresses
        var alphanumericGen = Gen.Elements("abcdefghijklmnopqrstuvwxyz0123456789".ToCharArray());
        var emailGen = from localLength in Gen.Choose(3, 10)
                      from localChars in Gen.Sequence(Enumerable.Repeat(alphanumericGen, localLength))
                      from domainLength in Gen.Choose(3, 10)
                      from domainChars in Gen.Sequence(Enumerable.Repeat(alphanumericGen, domainLength))
                      let localPart = new string(localChars.ToArray())
                      let domain = new string(domainChars.ToArray())
                      select $"{localPart}@{domain}.com";

        // Create generator for social media platforms
        var socialPlatforms = new[] { "LinkedIn", "Twitter", "Telegram", "Discord", "GitHub", "YouTube" };
        var urlPathGen = from length in Gen.Choose(3, 10)
                        from chars in Gen.Sequence(Enumerable.Repeat(alphanumericGen, length))
                        select new string(chars.ToArray());
        
        var socialMediaGen = from platformCount in Gen.Choose(1, 4)
                            from platforms in Gen.Sequence(Enumerable.Range(0, platformCount).Select(i =>
                                from platform in Gen.Elements(socialPlatforms)
                                from urlPath in urlPathGen
                                select new KeyValuePair<string, string>(platform, $"https://{platform.ToLower()}.com/{urlPath}")
                            ))
                            select platforms.DistinctBy(p => p.Key).ToDictionary(p => p.Key, p => p.Value);

        // Create generator for community platforms
        var nonEmptyStringGen = from length in Gen.Choose(5, 20)
                               from chars in Gen.Sequence(Enumerable.Repeat(Gen.Elements("abcdefghijklmnopqrstuvwxyz ".ToCharArray()), length))
                               let str = new string(chars.ToArray()).Trim()
                               where !string.IsNullOrWhiteSpace(str)
                               select str;
        
        var communityPlatformGen = from name in nonEmptyStringGen
                                  from purpose in nonEmptyStringGen
                                  from urlPath in urlPathGen
                                  select new CommunityPlatform
                                  {
                                      Name = name,
                                      Purpose = purpose,
                                      Url = $"https://community.example.com/{urlPath}"
                                  };

        var communityPlatformsGen = from platformCount in Gen.Choose(1, 3)
                                   from platforms in Gen.Sequence(Enumerable.Repeat(communityPlatformGen, platformCount))
                                   select platforms.ToList();

        // Combine all generators
        var contactInfoGen = from email in emailGen
                            from socialMedia in socialMediaGen
                            from communityPlatforms in communityPlatformsGen
                            select new ContactInfo
                            {
                                PrimaryEmail = email,
                                SocialMediaLinks = socialMedia,
                                OnlinePlatforms = communityPlatforms
                            };

        return Prop.ForAll(Arb.From(contactInfoGen), contactInfo =>
        {
            // Arrange & Act
            using var ctx = new TestContext();
            var component = ctx.RenderComponent<ContactSection>(parameters => parameters
                .Add(p => p.ContactInfo, contactInfo));

            var renderedMarkup = component.Markup;

            // Assert - Verify email address is rendered
            var emailRendered = !string.IsNullOrEmpty(contactInfo.PrimaryEmail) &&
                               renderedMarkup.Contains($"mailto:{contactInfo.PrimaryEmail}") &&
                               renderedMarkup.Contains(contactInfo.PrimaryEmail);

            // Assert - Verify all social media links are rendered
            var allSocialLinksRendered = contactInfo.SocialMediaLinks.All(social =>
                renderedMarkup.Contains($"href=\"{social.Value}\"") &&
                renderedMarkup.Contains(social.Key)
            );

            // Assert - Verify all community platforms are rendered with their purposes
            var allPlatformsRendered = contactInfo.OnlinePlatforms.All(platform =>
                renderedMarkup.Contains(platform.Name) &&
                renderedMarkup.Contains(platform.Purpose) &&
                renderedMarkup.Contains($"href=\"{platform.Url}\"") &&
                renderedMarkup.Contains("Join Now")
            );

            return (emailRendered && allSocialLinksRendered && allPlatformsRendered)
                .Label($"Contact section should display email ({contactInfo.PrimaryEmail}), " +
                       $"{contactInfo.SocialMediaLinks.Count} social media links, " +
                       $"and {contactInfo.OnlinePlatforms.Count} community platforms with purposes");
        });
    }
}
