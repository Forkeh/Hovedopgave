namespace Hovedopgave.Features.Characters.Models;

/// <summary>
/// Handles character level and experience progression based on D&D 5e rules.
/// </summary>
public class CharacterProgression
{
    /// <summary>
    /// Experience points required for each level (index = level, value = cumulative XP needed)
    /// Based on D&D 5e progression table
    /// </summary>
    private static readonly int[] XpThresholds =
    [
        0,      // Level 1
        300,    // Level 2
        900,    // Level 3
        2700,   // Level 4
        6500,   // Level 5
        14000,  // Level 6
        23000,  // Level 7
        34000,  // Level 8
        48000,  // Level 9
        64000,  // Level 10
        85000,  // Level 11
        100000, // Level 12
        120000, // Level 13
        140000, // Level 14
        165000, // Level 15
        195000, // Level 16
        225000, // Level 17
        265000, // Level 18
        305000, // Level 19
        355000  // Level 20
    ];

    public const int MaxLevel = 20;
    public const int MinLevel = 1;

    public int Level { get; private set; }
    public int ExperiencePoints { get; private set; }

    public CharacterProgression(int level = MinLevel, int experiencePoints = 0)
    {
        if (level < MinLevel || level > MaxLevel)
        {
            throw new ArgumentException($"Level must be between {MinLevel} and {MaxLevel}", nameof(level));
        }

        if (experiencePoints < 0)
        {
            throw new ArgumentException("Experience points cannot be negative", nameof(experiencePoints));
        }

        Level = level;
        ExperiencePoints = experiencePoints;
    }

    /// <summary>
    /// Adds experience points and automatically handles level ups.
    /// </summary>
    /// <param name="xp">Amount of experience to add</param>
    /// <returns>The number of levels gained</returns>
    public int AddExperience(int xp)
    {
        if (xp < 0)
        {
            throw new ArgumentException("Cannot add negative experience", nameof(xp));
        }

        if (Level >= MaxLevel)
        {
            return 0; // Already max level, no XP gain matters
        }

        ExperiencePoints += xp;
        
        int levelsGained = 0;
        while (CanLevelUp())
        {
            LevelUp();
            levelsGained++;
        }

        return levelsGained;
    }

    /// <summary>
    /// Checks if the character has enough XP to level up.
    /// </summary>
    public bool CanLevelUp()
    {
        if (Level >= MaxLevel)
        {
            return false;
        }

        return ExperiencePoints >= XpThresholds[Level];
    }

    /// <summary>
    /// Increases the character level by 1 if requirements are met.
    /// </summary>
    /// <returns>True if level up was successful</returns>
    public bool LevelUp()
    {
        if (!CanLevelUp())
        {
            return false;
        }

        Level++;
        return true;
    }

    /// <summary>
    /// Gets the XP required for the next level.
    /// </summary>
    public int GetXpForNextLevel()
    {
        if (Level >= MaxLevel)
        {
            return 0;
        }

        return XpThresholds[Level];
    }

    /// <summary>
    /// Gets the XP remaining until the next level.
    /// </summary>
    public int GetXpToNextLevel()
    {
        if (Level >= MaxLevel)
        {
            return 0;
        }

        return XpThresholds[Level] - ExperiencePoints;
    }

    /// <summary>
    /// Gets the progress percentage towards the next level.
    /// </summary>
    public double GetProgressToNextLevel()
    {
        if (Level >= MaxLevel)
        {
            return 100.0;
        }

        int currentLevelXp = Level > 1 ? XpThresholds[Level - 1] : 0;
        int nextLevelXp = XpThresholds[Level];
        int xpInCurrentLevel = ExperiencePoints - currentLevelXp;
        int xpNeededForLevel = nextLevelXp - currentLevelXp;

        return (double)xpInCurrentLevel / xpNeededForLevel * 100.0;
    }
}

