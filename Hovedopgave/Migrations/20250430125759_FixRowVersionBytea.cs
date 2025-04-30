using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hovedopgave.Migrations
{
    /// <inheritdoc />
    public partial class FixRowVersionBytea : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WikiEntries",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false),
                    CampaignId = table.Column<string>(type: "text", nullable: false),
                    PhotoId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WikiEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WikiEntries_Campaigns_CampaignId",
                        column: x => x.CampaignId,
                        principalTable: "Campaigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WikiEntries_Photos_PhotoId",
                        column: x => x.PhotoId,
                        principalTable: "Photos",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_WikiEntries_CampaignId",
                table: "WikiEntries",
                column: "CampaignId");

            migrationBuilder.CreateIndex(
                name: "IX_WikiEntries_PhotoId",
                table: "WikiEntries",
                column: "PhotoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WikiEntries");
        }
    }
}
