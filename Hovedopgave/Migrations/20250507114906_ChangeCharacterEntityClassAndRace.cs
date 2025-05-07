using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hovedopgave.Migrations
{
    /// <inheritdoc />
    public partial class ChangeCharacterEntityClassAndRace : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CharacterRace",
                table: "Characters",
                newName: "Race");

            migrationBuilder.RenameColumn(
                name: "CharacterClass",
                table: "Characters",
                newName: "Class");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Race",
                table: "Characters",
                newName: "CharacterRace");

            migrationBuilder.RenameColumn(
                name: "Class",
                table: "Characters",
                newName: "CharacterClass");
        }
    }
}
