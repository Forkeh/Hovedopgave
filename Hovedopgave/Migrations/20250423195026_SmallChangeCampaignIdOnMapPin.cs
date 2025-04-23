using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hovedopgave.Migrations
{
    /// <inheritdoc />
    public partial class SmallChangeCampaignIdOnMapPin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "positionY",
                table: "MapPins",
                newName: "PositionY");

            migrationBuilder.RenameColumn(
                name: "positionX",
                table: "MapPins",
                newName: "PositionX");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PositionY",
                table: "MapPins",
                newName: "positionY");

            migrationBuilder.RenameColumn(
                name: "PositionX",
                table: "MapPins",
                newName: "positionX");
        }
    }
}
