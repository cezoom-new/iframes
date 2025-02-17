import { title } from "process";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Base")
    .items([
      S.documentTypeListItem("campaign").title("Campaign"),
      S.documentTypeListItem("viewport").title("View Port"),
      S.documentTypeListItem("banner").title("Banner"),
      S.documentTypeListItem("cookiePreference").title("Cookie Preference"),
      S.documentTypeListItem("backgroundLinearGradient").title("Background Color"),
      S.documentTypeListItem("audienceList").title("Audience List"),
    ]);
