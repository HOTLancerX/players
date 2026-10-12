import { addHook, addPostType, addCatType, addBuilderElement, type PluginMeta } from "@/hook";
import { CategoryHierarchicalSelect } from "@/components/ui";

// UI Form Components
import PlayerBasicInfoFields from "./ui/PlayerBasicInfoFields";
import PlayerSportsStatsFields from "./ui/PlayerSportsStatsFields";
import PlayerCareerMilestones from "./ui/PlayerCareerMilestones";
import PlayerMediaHighlights from "./ui/PlayerMediaHighlights";

// Presentation Layouts & Box Components
import PlayerProfileLayout1 from "./details/PlayerProfileLayout1";
import PlayerProfileLayout2 from "./details/PlayerProfileLayout2";
import PlayerCategoryLayout1 from "./category/PlayerCategoryLayout1";
import PlayerCategoryLayout2 from "./category/PlayerCategoryLayout2";
import PlayerBox1 from "./box/PlayerBox1";
import PlayerBox2 from "./box/PlayerBox2";

// Builder Elements
import playerSpotlightHeroElement from "./elements/PlayerSpotlightHero";
import playerCardGridElement from "./elements/PlayerCardGrid";
import playerElement from "./elements/Player";

// ─── 1. Plugin Metadata ───────────────────────────────────────────────────────
export const PLUGINS: PluginMeta = {
    nx: "players",
    name: "Athletes & Players Roster",
    version: "1.0.0",
    description: "Complete Athlete & Player Profile Management plugin with cricket/football statistics, match highlights, video channel reels, team timelines, and trophies.",
    author: "HOTLancerX",
    path: "https://github.com/HOTLancerX/players.git",
    icon: "solar:users-group-rounded-bold",
    color: "from-emerald-500 to-teal-600",
};

/**
 * Register all hooks for the Players plugin.
 */
export function register(): void {
    // ─── 2. Post & Category Types ─────────────────────────────────────────────
    addPostType(
        [
            {
                key: "player",
                label: "Players",
                icon: "solar:user-bold",
                color: "from-emerald-500 to-teal-600",
                position: 28,
                hasCategory: true,
            },
        ],
        PLUGINS.nx
    );

    addCatType(
        [
            {
                key: "player-category",
                label: "Categories",
                postType: "player",
                icon: "solar:folder-with-files-bold",
                color: "from-emerald-500 to-teal-600",
                position: 28,
            },
        ],
        PLUGINS.nx
    );

    // ─── 3. Admin Navigation ─────────────────────────────────────────────────
    addHook(
        "admin.nav",
        [
            {
                key: "players",
                label: "Players",
                icon: "solar:users-group-rounded-bold",
                slug: "posts/player",
                parent: "",
                position: 19,
            },
            {
                key: "player-add",
                label: "Add Player",
                icon: "solar:add-circle-bold",
                slug: "posts/player/new",
                parent: "players",
                position: 2,
            },
            {
                key: "player-category",
                label: "Categories",
                icon: "solar:folder-with-files-bold",
                slug: "category/player-category",
                parent: "players",
                position: 3,
            },
        ],
        PLUGINS.nx
    );

    // ─── 4. Post Form Fields (type="player") ──────────────────────────────────
    addHook(
        "post.form",
        [
            // Left Column
            {
                key: "description",
                label: "Player Biography & Story",
                type: "player",
                style: "left",
                position: 10,
                fieldType: "content",
            },
            {
                key: "player_basic",
                label: "Personal & Bio Information",
                type: "player",
                style: "left",
                position: 20,
                component: PlayerBasicInfoFields,
            },
            {
                key: "player_stats",
                label: "Match & Career Statistics (Football / Cricket)",
                type: "player",
                style: "left",
                position: 30,
                component: PlayerSportsStatsFields,
            },
            {
                key: "player_milestones",
                label: "Career Journey, Trophies & Records",
                type: "player",
                style: "left",
                position: 40,
                component: PlayerCareerMilestones,
            },
            {
                key: "player_media",
                label: "Media, Videos & YouTube Channel",
                type: "player",
                style: "left",
                position: 50,
                component: PlayerMediaHighlights,
            },
            // Right Column
            {
                key: "category",
                label: "Category",
                type: "player",
                style: "right",
                position: 5,
                component: CategoryHierarchicalSelect,
                hierarchicalCatType: "player-category",
            },
        ],
        PLUGINS.nx
    );

    // ─── 5. Root Page Templates & Card Boxes ─────────────────────────────────
    addHook(
        "root.pages",
        [
            // Single Player Detail Layouts
            {
                key: "player-layout-1",
                label: "Player Profile Layout 1 (Pro Broadcast & Stats)",
                type: "player",
                slug: "dynamic",
                style: "left",
                position: 1,
                active: true,
                component: PlayerProfileLayout1,
            },
            {
                key: "player-layout-2",
                label: "Player Profile Layout 2 (Editorial & Minimalist)",
                type: "player",
                slug: "dynamic",
                style: "left",
                position: 2,
                component: PlayerProfileLayout2,
            },
            // Category Archive Layouts
            {
                key: "player-category-layout-1",
                label: "Player Roster Grid (Filters & Search)",
                type: "player-category",
                slug: "dynamic",
                style: "left",
                position: 1,
                active: true,
                component: PlayerCategoryLayout1,
            },
            {
                key: "player-category-layout-2",
                label: "Player Squad List Table",
                type: "player-category",
                slug: "dynamic",
                style: "left",
                position: 2,
                component: PlayerCategoryLayout2,
            },
            // Card Box Templates
            {
                key: "player-box-1",
                label: "Player Box 1 (Pro Card with Jersey Pill)",
                type: "player-box",
                slug: "dynamic",
                style: "left",
                position: 1,
                active: true,
                component: PlayerBox1,
            },
            {
                key: "player-box-2",
                label: "Player Box 2 (Horizontal Squad Row)",
                type: "player-box",
                slug: "dynamic",
                style: "left",
                position: 2,
                component: PlayerBox2,
            },
        ],
        PLUGINS.nx
    );

    // ─── 6. Builder Elements ─────────────────────────────────────────────────
    addBuilderElement(playerSpotlightHeroElement as any, PLUGINS.nx);
    addBuilderElement(playerCardGridElement as any, PLUGINS.nx);
    addBuilderElement(playerElement as any, PLUGINS.nx);
}

export default register;
