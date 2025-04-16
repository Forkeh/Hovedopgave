using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hovedopgave.Migrations
{
    /// <inheritdoc />
    public partial class CampaignDMChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Campaigns_DungeonMasterId",
                table: "Campaigns",
                column: "DungeonMasterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Campaigns_AspNetUsers_DungeonMasterId",
                table: "Campaigns",
                column: "DungeonMasterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Campaigns_AspNetUsers_DungeonMasterId",
                table: "Campaigns");

            migrationBuilder.DropIndex(
                name: "IX_Campaigns_DungeonMasterId",
                table: "Campaigns");
        }
    }
}
