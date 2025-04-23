using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hovedopgave.Migrations
{
    /// <inheritdoc />
    public partial class MapPinEntityAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MapPins",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    positionX = table.Column<double>(type: "double precision", nullable: false),
                    positionY = table.Column<double>(type: "double precision", nullable: false),
                    CampaignId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MapPins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MapPins_Campaigns_CampaignId",
                        column: x => x.CampaignId,
                        principalTable: "Campaigns",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_MapPins_CampaignId",
                table: "MapPins",
                column: "CampaignId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MapPins");
        }
    }
}
