using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hovedopgave.Migrations
{
    /// <inheritdoc />
    public partial class RequiredCampaignIdOnMapPin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MapPins_Campaigns_CampaignId",
                table: "MapPins");

            migrationBuilder.AlterColumn<string>(
                name: "CampaignId",
                table: "MapPins",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MapPins_Campaigns_CampaignId",
                table: "MapPins",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MapPins_Campaigns_CampaignId",
                table: "MapPins");

            migrationBuilder.AlterColumn<string>(
                name: "CampaignId",
                table: "MapPins",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_MapPins_Campaigns_CampaignId",
                table: "MapPins",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id");
        }
    }
}
