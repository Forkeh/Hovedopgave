using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hovedopgave.Migrations
{
    /// <inheritdoc />
    public partial class PhotoToCampaignEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MapUrl",
                table: "Campaigns",
                newName: "PhotoId");

            migrationBuilder.CreateIndex(
                name: "IX_Campaigns_PhotoId",
                table: "Campaigns",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Campaigns_Photos_PhotoId",
                table: "Campaigns",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Campaigns_Photos_PhotoId",
                table: "Campaigns");

            migrationBuilder.DropIndex(
                name: "IX_Campaigns_PhotoId",
                table: "Campaigns");

            migrationBuilder.RenameColumn(
                name: "PhotoId",
                table: "Campaigns",
                newName: "MapUrl");
        }
    }
}
