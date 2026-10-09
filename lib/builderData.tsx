/**
 * plugin/players/lib/builderData.tsx
 *
 * SERVER-ONLY. Registers server-side renderers for players builder elements.
 * Auto-discovered by hook/builderDataHooks.ts via require.context.
 */

import React from "react";
import { registerBuilderElement } from "@/hook/builderDataHooks";
import { PlayerSpotlightHeroFrontend } from "../elements/PlayerSpotlightHero";
import { PlayerCardGridFrontend } from "../elements/PlayerCardGrid";

registerBuilderElement("player-spotlight-hero", (schema) => (
  <PlayerSpotlightHeroFrontend element={{ schema, id: "server" }} />
));

registerBuilderElement("player-card-grid", (schema) => (
  <PlayerCardGridFrontend element={{ schema, id: "server" }} />
));
