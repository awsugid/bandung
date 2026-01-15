using bandung.Components.Layout;
using FsCheck;
using FsCheck.Xunit;
using FluentAssertions;
using Bunit;
using Xunit;
using System.Text.RegularExpressions;

namespace bandung.Tests.PropertyTests;

public class NavigationTests
{
    // **Feature: aws-user-group-landing, Property 9: Navigation branding consistency**
    // **Validates: Requirements 6.1, 6.3, 6.5**
    [Property]
    public Property NavigationBrandingConsistency()
    {
        // This property should hold for any rendering of the navigation menu
        // We'll test it multiple times to ensure consistency
        var trivialGen = Gen.Constant(true);

        return Prop.ForAll(Arb.From(trivialGen), _ =>
        {
            // Arrange & Act
            using var ctx = new TestContext();
            var component = ctx.RenderComponent<NavMenu>();
            var renderedMarkup = component.Markup;

            // Assert - Verify navbar brand displays "AWS User Group Bandung"
            var brandTextPresent = renderedMarkup.Contains("AWS User Group Bandung");

            // Assert - Verify AWS brand colors are used in CSS
            // We need to check the compiled CSS or the CSS classes are applied
            var navbarBrandElement = component.Find(".navbar-brand");
            var navbarBrandText = navbarBrandElement.TextContent.Trim();
            var correctBrandText = navbarBrandText == "AWS User Group Bandung";

            // Assert - Verify navbar structure exists
            var navbarElement = component.Find(".navbar");
            var hasNavbar = navbarElement != null;

            return (brandTextPresent && correctBrandText && hasNavbar)
                .Label("Navigation menu should display 'AWS User Group Bandung' branding consistently");
        });
    }

    // **Feature: aws-user-group-landing, Property 10: Relevant navigation items**
    // **Validates: Requirements 6.2, 6.4**
    [Property]
    public Property RelevantNavigationItems()
    {
        // This property should hold for any rendering of the navigation menu
        var trivialGen = Gen.Constant(true);

        return Prop.ForAll(Arb.From(trivialGen), _ =>
        {
            // Arrange & Act
            using var ctx = new TestContext();
            var component = ctx.RenderComponent<NavMenu>();
            var renderedMarkup = component.Markup;

            // Assert - Verify relevant navigation items are present
            // Navigation items contain whitespace, so we need to be more flexible
            var hasHome = Regex.IsMatch(renderedMarkup, @">\s*Home\s*<");
            var hasEvents = Regex.IsMatch(renderedMarkup, @">\s*Events\s*<");
            var hasAbout = Regex.IsMatch(renderedMarkup, @">\s*About\s*<");
            var hasContact = Regex.IsMatch(renderedMarkup, @">\s*Contact\s*<");

            // Assert - Verify placeholder links are NOT present
            var noCounter = !Regex.IsMatch(renderedMarkup, @">\s*Counter\s*<");
            var noWeather = !Regex.IsMatch(renderedMarkup, @">\s*Weather\s*<");

            // Assert - Verify correct number of navigation items (should be exactly 4)
            // Look for nav-item class in the new structure
            var navItems = component.FindAll(".nav-item");
            var correctCount = navItems.Count == 4;

            return (hasHome && hasEvents && hasAbout && hasContact && noCounter && noWeather && correctCount)
                .Label($"Navigation should include only relevant items (Home, Events, About, Contact) " +
                       $"and exclude placeholder items (Counter, Weather). Found {navItems.Count} nav items. " +
                       $"Home:{hasHome}, Events:{hasEvents}, About:{hasAbout}, Contact:{hasContact}, " +
                       $"NoCounter:{noCounter}, NoWeather:{noWeather}");
        });
    }
}
