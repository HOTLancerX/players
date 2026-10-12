"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { xFetch } from "@/lib/express";
import {
  NumberControl,
  ColorPickerPopup,
  Typography,
} from "@/components/builder/controls";

import { type PlayerItem, type PlayerUIProps, parsePlayerPost } from "../lib/parsePlayer";
export { type PlayerItem, type PlayerUIProps, parsePlayerPost };

function getTypographyStyles(value: any): React.CSSProperties {
  if (!value || typeof value !== "object") return {};
  const styles: React.CSSProperties = {};
  if (value.fontFamily) styles.fontFamily = value.fontFamily;
  if (value.fontSize) styles.fontSize = `${value.fontSize}${value.fontSizeUnit || "px"}`;
  if (value.fontWeight) styles.fontWeight = value.fontWeight;
  if (value.textTransform) styles.textTransform = value.textTransform;
  if (value.fontStyle) styles.fontStyle = value.fontStyle;
  if (value.textDecoration) styles.textDecoration = value.textDecoration;
  if (value.lineHeight && value.lineHeight > 0)
    styles.lineHeight = `${value.lineHeight}${value.lineHeightUnit || "px"}`;
  if (value.letterSpacing !== undefined && value.letterSpacing !== 0)
    styles.letterSpacing = `${value.letterSpacing}${value.letterSpacingUnit || "px"}`;
  return styles;
}

const DESKTOP_COL_CLASSES: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

const TABLET_COL_CLASSES: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

const MOBILE_COL_CLASSES: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

export function PlayerUI({
  categoryTitle = "",
  players = [],
  columnsDesktop = 3,
  columnsTablet = 2,
  columnsMobile = 1,
  stat1Label = "SENIOR CAPS",
  stat2Label = "CLEAN SHEETS",
  showLegacyNo = true,
  showUnderline = true,
  colors = {},
  titleTypography,
  nameTypography,
}: PlayerUIProps) {
  const displayTitle = (categoryTitle && categoryTitle.trim().length > 0)
    ? categoryTitle.toUpperCase()
    : "PLAYERS";

  const headingColor = colors.headingColor || "#0e3b6e";
  const headingLineColor = colors.headingLineColor || "#cbd5e1";
  const cardBgColor = colors.cardBgColor || "#ffffff";
  const nameColor = colors.nameColor || "#0e3b6e";
  const underlineColor = colors.underlineColor || "#dc2626";
  const overlayBgColor = colors.overlayBgColor || "rgba(15, 23, 42, 0.72)";
  const statNumberColor = colors.statNumberColor || "#ffffff";
  const statLabelColor = colors.statLabelColor || "#cbd5e1";
  const legacyBadgeBg = colors.legacyBadgeBg || "rgba(0, 0, 0, 0.4)";
  const legacyBadgeText = colors.legacyBadgeText || "#ffffff";

  const titleTypo = getTypographyStyles(titleTypography);
  const nameTypo = getTypographyStyles(nameTypography);

  const deskColClass = DESKTOP_COL_CLASSES[Number(columnsDesktop)] || "lg:grid-cols-3";
  const tabColClass = TABLET_COL_CLASSES[Number(columnsTablet)] || "md:grid-cols-2";
  const mobColClass = MOBILE_COL_CLASSES[Number(columnsMobile)] || "grid-cols-1";

  return (
    <section>
      <div>
        {/* Section Header with Athletic Category Title & Extended Line */}
        <div className="flex items-center gap-4 w-full mb-4">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight shrink-0 font-heading"
            style={{ color: headingColor, ...titleTypo }}
          >
            {displayTitle}
          </h2>
          <div
            className="h-0.5 flex-1 rounded-full"
            style={{ backgroundColor: headingLineColor }}
          />
        </div>

        {/* Dynamic List Posts in Category Ratio */}
        {players.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-sm font-semibold border border-dashed border-slate-200 rounded-2xl bg-white shadow-2xs">
            No players found in this category.
          </div>
        ) : (
          <div className={`grid ${mobColClass} ${tabColClass} ${deskColClass} gap-6 sm:gap-8 items-start w-full`}>
            {players.map((p, idx) => (
              <div key={p.id || idx} className="group flex flex-col items-center w-full">
                {/* Photo Box Container (Direct Profile Link) */}
                <a
                  href={p.profileUrl || "#"}
                  className="relative aspect-3/4 w-full rounded-2xl overflow-hidden block transition-all duration-300 group-hover:-translate-y-1.5 shadow-xs border border-slate-200 group-hover:shadow-xl cursor-pointer text-left bg-white"
                  style={{ backgroundColor: cardBgColor }}
                >
                  {/* Player Cutout Photo */}
                  {p.photo ? (
                    <img
                      src={p.photo}
                      alt={`${p.firstName || ""} ${p.lastName || ""}`.trim() || "Player"}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <Icon icon="solar:user-bold" width={64} />
                    </div>
                  )}

                  {/* Hover Overlay with Senior Caps, Clean Sheets, and Legacy No. */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5 text-white"
                    style={{ backgroundColor: overlayBgColor }}
                  >
                    <div className="w-full flex justify-end">
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 bg-white/10 px-2 py-0.5 rounded-full">
                        PROFILE
                      </span>
                    </div>

                    {/* Key Stats in Two Columns */}
                    <div className="grid grid-cols-2 gap-2 text-center my-auto w-full px-1">
                      {/* Stat 1: Senior Caps */}
                      <div className="flex flex-col items-center justify-center">
                        <span
                          className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 line-clamp-1"
                          style={{ color: statLabelColor }}
                        >
                          {stat1Label}
                        </span>
                        <span
                          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-mono leading-none"
                          style={{ color: statNumberColor }}
                        >
                          {p.stat1Value || "0"}
                        </span>
                      </div>

                      {/* Stat 2: Clean Sheets */}
                      <div className="flex flex-col items-center justify-center">
                        <span
                          className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 line-clamp-1"
                          style={{ color: statLabelColor }}
                        >
                          {stat2Label}
                        </span>
                        <span
                          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-mono leading-none"
                          style={{ color: statNumberColor }}
                        >
                          {p.stat2Value || "0"}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Left Pill Badge: Legacy No. */}
                    <div className="flex items-center justify-between w-full">
                      {showLegacyNo && p.legacyNo ? (
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/20 backdrop-blur-md"
                          style={{
                            backgroundColor: legacyBadgeBg,
                            color: legacyBadgeText,
                          }}
                        >
                          LEGACY NO. {p.legacyNo}
                        </span>
                      ) : (
                        <span />
                      )}

                      <Icon
                        icon="solar:arrow-right-linear"
                        width={20}
                        className="text-white/80 group-hover:scale-110 transition-transform"
                      />
                    </div>
                  </div>
                </a>

                {/* Bottom Player Name Block with Bold Condensed Athletic Style */}
                <div className="mt-3.5 text-center flex flex-col items-center w-full">
                  {p.firstName && (
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 block leading-tight">
                      {p.firstName}
                    </span>
                  )}
                  <h3
                    className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight mt-0.5"
                    style={{ color: nameColor, ...nameTypo }}
                  >
                    {p.lastName || p.firstName || "ATHLETE"}
                  </h3>

                  {/* Red Accent Underline */}
                  {showUnderline && (
                    <div
                      className="w-6 h-1 rounded-full mt-2 transition-all duration-300 group-hover:w-10"
                      style={{ backgroundColor: underlineColor }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

interface PlayerCategoryOption {
  _id: string;
  title: string;
}

// ── Category Selector Control for Builder Sidebar ─────────────────────────────
function PlayerCategoryControl({
  value = "",
  onChange,
}: {
  value: string;
  onChange: (cat: { id: string; title: string }) => void;
}) {
  const [categories, setCategories] = useState<PlayerCategoryOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    xFetch("/builder-post/cats?type=player-category")
      .then((r) => r.json())
      .then((catData) => {
        if (!isMounted) return;
        setCategories(catData.cats ?? []);
        setLoading(false);
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-700">Category</label>
      {loading ? (
        <div className="flex items-center gap-2 text-xs text-gray-400 py-1.5">
          <Icon icon="svg-spinners:ring-resize" width={14} /> Loading categories...
        </div>
      ) : (
        <select
          value={value || ""}
          onChange={(e) => {
            const selectedId = e.target.value;
            const match = categories.find((c) => c._id === selectedId);
            onChange({
              id: selectedId,
              title: match ? match.title : "",
            });
          }}
          className="w-full text-xs border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

// ── Canvas Preview Component (Client-Side) ────────────────────────────────────
export function PlayerCanvasPreview({ element }: { element: any }) {
  const c = { ...element?.schema?.content, ...element?.content };
  const s = { ...element?.schema?.style, ...element?.style };

  const categoryId: string = c.categoryId ?? "";
  const limit: number = Number(c.limit) || 6;

  const [players, setPlayers] = useState<PlayerItem[]>([]);
  const [categoryTitle, setCategoryTitle] = useState<string>(c.categoryTitle ?? "");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const safeLimit = Math.min(Math.max(1, limit), 36);
    const params = new URLSearchParams({
      type: "player",
      limit: String(safeLimit),
    });

    if (categoryId) {
      params.set("cats", categoryId);
    }

    xFetch(`/builder-post?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (!isMounted) return;
        const rawPosts = data.posts ?? [];
        const parsed = rawPosts.map((p: any) => parsePlayerPost(p));
        setPlayers(parsed);
        if (rawPosts[0]?.categoryTitle && !c.categoryTitle) {
          setCategoryTitle(rawPosts[0].categoryTitle);
        } else if (c.categoryTitle) {
          setCategoryTitle(c.categoryTitle);
        } else if (!categoryId) {
          setCategoryTitle("All Players");
        }
        setLoading(false);
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [categoryId, limit, c.categoryTitle]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 gap-2 text-gray-400">
        <Icon icon="svg-spinners:ring-resize" width={22} />
        <span className="text-xs font-medium">Loading players...</span>
      </div>
    );
  }

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
        cardBgColor: s.cardBgColor || "#ffffff",
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
}

// ── Builder Element Definition ────────────────────────────────────────────────
const playerElement = {
  type: "player",
  category: "players",
  label: "Player Roster",
  icon: "solar:users-group-rounded-bold",

  schema: {
    content: {
      type: "player",
      postType: "player",
      categoryId: "",
      categoryTitle: "",
      limit: 6,
      columnsDesktop: 3,
      columnsTablet: 2,
      columnsMobile: 1,
      stat1Label: "SENIOR CAPS",
      stat2Label: "CLEAN SHEETS",
      showLegacyNo: "true",
      showUnderline: "true",
    },
    style: {
      headingColor: "#0e3b6e",
      headingLineColor: "#cbd5e1",
      cardBgColor: "#ffffff",
      nameColor: "#0e3b6e",
      underlineColor: "#dc2626",
      overlayBgColor: "rgba(15, 23, 42, 0.72)",
      statNumberColor: "#ffffff",
      statLabelColor: "#cbd5e1",
      legacyBadgeBg: "rgba(0, 0, 0, 0.4)",
      legacyBadgeText: "#ffffff",
      sectionBg: "",
    },
  },

  controls: [
    {
      tab: "Layout",
      section: "Category",
      controls: [
        {
          name: "categoryId",
          responsive: false,
          render: (value: any, onChange: any, item: any) => (
            <PlayerCategoryControl
              value={value ?? ""}
              onChange={(cat) => {
                onChange(cat.id);
                if (item?.onChange) {
                  item.onChange({
                    ...item.schema?.content,
                    categoryId: cat.id,
                    categoryTitle: cat.title,
                  });
                }
              }}
            />
          ),
        },
        {
          name: "limit",
          responsive: false,
          render: (value: any, onChange: any) => (
            <NumberControl
              label="Player Limit"
              value={value ?? 6}
              onChange={onChange}
              min={1}
              max={36}
            />
          ),
        },
      ],
    },
    {
      tab: "Layout",
      section: "Proportional Responsive Grid (One Line)",
      controls: [
        {
          name: "columnsDesktop",
          responsive: false,
          render: (value: any, onChange: any) => (
            <NumberControl
              label="Desktop Columns (1-6 in one line)"
              value={value ?? 3}
              onChange={onChange}
              min={1}
              max={6}
            />
          ),
        },
        {
          name: "columnsTablet",
          responsive: false,
          render: (value: any, onChange: any) => (
            <NumberControl
              label="Tablet Columns (1-4 in one line)"
              value={value ?? 2}
              onChange={onChange}
              min={1}
              max={4}
            />
          ),
        },
        {
          name: "columnsMobile",
          responsive: false,
          render: (value: any, onChange: any) => (
            <NumberControl
              label="Mobile Columns (1-2 in one line)"
              value={value ?? 1}
              onChange={onChange}
              min={1}
              max={2}
            />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Colors",
      controls: [
        {
          name: "headingColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Heading Title Color" value={value ?? "#0e3b6e"} onChange={onChange} />
          ),
        },
        {
          name: "headingLineColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Heading Line Color" value={value ?? "#cbd5e1"} onChange={onChange} />
          ),
        },
        {
          name: "cardBgColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Card Box Backdrop Color" value={value ?? "#dbe7f2"} onChange={onChange} />
          ),
        },
        {
          name: "nameColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Player Name Color" value={value ?? "#0e3b6e"} onChange={onChange} />
          ),
        },
        {
          name: "underlineColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Accent Underline Color" value={value ?? "#dc2626"} onChange={onChange} />
          ),
        },
        {
          name: "overlayBgColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Hover Overlay Background" value={value ?? "rgba(15, 23, 42, 0.72)"} onChange={onChange} />
          ),
        },
        {
          name: "statNumberColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Hover Stat Number Color" value={value ?? "#ffffff"} onChange={onChange} />
          ),
        },
        {
          name: "statLabelColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Hover Stat Label Color" value={value ?? "#cbd5e1"} onChange={onChange} />
          ),
        },
        {
          name: "sectionBg",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Section Background" value={value ?? ""} onChange={onChange} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Typography",
      controls: [
        {
          name: "titleTypography",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Typography label="Heading Typography" value={value} onChange={onChange} />
          ),
        },
        {
          name: "nameTypography",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Typography label="Player Name Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },
  ],

  render: (element: any) => <PlayerCanvasPreview element={element} />,
};

export default playerElement;
