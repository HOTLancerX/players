/**
 * plugin/players/lib/builderData.tsx
 *
 * SERVER-ONLY. Registers server-side renderers for players builder elements.
 * Auto-discovered by hook/builderDataHooks.ts via require.context.
 */

import React from "react";
import { registerBuilderElement } from "@/hook/builderDataHooks";
import { fetchEnrichedBuilderData } from "@/lib/builderDataEngine";
import { PlayerSpotlightHeroFrontend } from "../elements/PlayerSpotlightHero";
import { PlayerCardGridFrontend } from "../elements/PlayerCardGrid";
import { PlayerUI } from "../elements/Player";
import { parsePlayerPost } from "./parsePlayer";

registerBuilderElement("player-spotlight-hero", (schema) => (
  <PlayerSpotlightHeroFrontend element={{ schema, id: "server" }} />
));

registerBuilderElement("player-card-grid", (schema) => (
  <PlayerCardGridFrontend element={{ schema, id: "server" }} />
));

registerBuilderElement("player", async (schema, data) => {
  const c = { ...schema?.schema?.content, ...schema?.content };
  const s = { ...schema?.schema?.style, ...schema?.style };
  const limit = c.limit ? Number(c.limit) : 6;
  const postType = c.postType || c.type || "player";
  const categoryId = c.categoryId ?? "";

  let players: any[] = [];
  let categoryTitle = c.categoryTitle ?? "";

  try {
    const rawData =
      data?.builderContext ??
      (await fetchEnrichedBuilderData({
        categoryIds: categoryId ? [categoryId] : [],
        limit,
        postType,
        categoryType: "player-category",
      }));

    const rawPostsByCat = rawData.postsByCategory ?? {};
    const flatPosts = Object.values(rawPostsByCat).flat();
    players = flatPosts.slice(0, limit).map((p: any) => parsePlayerPost(p));

    if (rawData.tabs && rawData.tabs.length > 0 && !categoryTitle) {
      const match = rawData.tabs.find((t: any) => t._id === categoryId);
      if (match) categoryTitle = match.title;
    }
  } catch (_) {}

  return (
    <PlayerUI
      categoryId={categoryId}
      categoryTitle={categoryTitle}
      players={players}
      columnsDesktop={Number(c.columnsDesktop) || 3}
      columnsTablet={Number(c.columnsTablet) || 2}
      columnsMobile={Number(c.columnsMobile) || 1}
      stat1Label={c.stat1Label || "SENIOR CAPS"}
      stat2Label={c.stat2Label || "CLEAN SHEETS"}
      showLegacyNo={c.showLegacyNo !== "false" && c.showLegacyNo !== false}
      showUnderline={c.showUnderline !== "false" && c.showUnderline !== false}
      colors={{
        headingColor: s.headingColor || "#0e3b6e",
        headingLineColor: s.headingLineColor || "#cbd5e1",
        cardBgColor: s.cardBgColor || "#dbe7f2",
        nameColor: s.nameColor || "#0e3b6e",
        underlineColor: s.underlineColor || "#dc2626",
        overlayBgColor: s.overlayBgColor || "rgba(15, 23, 42, 0.72)",
        statNumberColor: s.statNumberColor || "#ffffff",
        statLabelColor: s.statLabelColor || "#cbd5e1",
        legacyBadgeBg: s.legacyBadgeBg || "rgba(0, 0, 0, 0.4)",
        legacyBadgeText: s.legacyBadgeText || "#ffffff",
        sectionBg: s.sectionBg || "",
      }}
      titleTypography={s.titleTypography}
      nameTypography={s.nameTypography}
    />
  );
});
