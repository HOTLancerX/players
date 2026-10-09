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
                label: "Sports & Categories",
                postType: "player",
                icon: "solar:folder-with-files-bold",
                color: "from-emerald-500 to-teal-600",
                position: 28,
            },
            {
                key: "player-team",
                label: "Teams & Squads",
                postType: "player",
                icon: "solar:shield-bold",
                color: "from-cyan-500 to-blue-600",
                position: 29,
            },
            {
                key: "player-position",
                label: "Positions & Roles",
                postType: "player",
                icon: "solar:user-check-bold",
                color: "from-purple-500 to-indigo-600",
                position: 30,
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
                label: "Sports Categories",
                icon: "solar:folder-with-files-bold",
                slug: "category/player-category",
                parent: "players",
                position: 3,
            },
            {
                key: "player-team",
                label: "Teams & Clubs",
                icon: "solar:shield-bold",
                slug: "category/player-team",
                parent: "players",
                position: 4,
            },
            {
                key: "player-position",
                label: "Positions & Roles",
                icon: "solar:user-check-bold",
                slug: "category/player-position",
                parent: "players",
                position: 5,
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
                label: "Sports Category",
                type: "player",
                style: "right",
                position: 5,
                component: CategoryHierarchicalSelect,
                hierarchicalCatType: "player-category",
            },
            {
                key: "team",
                label: "Club / Team",
                type: "player",
                style: "right",
                position: 10,
                component: CategoryHierarchicalSelect,
                hierarchicalCatType: "player-team",
            },
            {
                key: "position_cat",
                label: "Position Category",
                type: "player",
                style: "right",
                position: 15,
                component: CategoryHierarchicalSelect,
                hierarchicalCatType: "player-position",
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
}

export default register;
