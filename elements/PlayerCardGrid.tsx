"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import {
  Text,
  Textarea,
  Url,
  NumberControl,
  Select,
  Toggle,
  ColorPickerPopup,
  ImageGallery,
  Typography,
} from "@/components/builder/controls";

function getTypographyStyles(value: any) {
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

export interface FeaturedPlayerCard {
  name: string;
  jersey: string;
  role: string;
  team: string;
  photo: string;
  primaryStat: string; // e.g. "142 Goals" or "7,420 Runs"
  secondaryStat: string; // e.g. "68 Assists" or "52.8 Avg"
  profileUrl: string;
}

export function PlayerCardGridFrontend({ element }: { element: any }) {
  const s = element?.schema || {};

  const badgeText: string = s.content?.badgeText ?? "PRO ATHLETES";
  const title: string = s.content?.title ?? "Featured Squad & Stars";
  const subtitle: string =
    s.content?.subtitle ?? "Explore top performers, captains, and rising champions across all sports categories.";

  const players: FeaturedPlayerCard[] = s.content?.players || [
    {
      name: "Marcus Vance",
      jersey: "10",
      role: "Forward / Striker",
      team: "Camden Tigers FC",
      photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
      primaryStat: "142 Goals",
      secondaryStat: "68 Assists",
      profileUrl: "/player/marcus-vance",
    },
    {
      name: "Virat Sharma",
      jersey: "18",
      role: "Top-Order Batsman",
      team: "Tigers Cricket Club",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      primaryStat: "7,420 Runs",
      secondaryStat: "52.8 Avg",
      profileUrl: "/player/virat-sharma",
    },
    {
      name: "Liam O'Connor",
      jersey: "4",
      role: "Central Defender",
      team: "Camden Tigers FC",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      primaryStat: "48 Clean Sheets",
      secondaryStat: "94% Tackles",
      profileUrl: "/player/liam-oconnor",
    },
    {
      name: "Rashid Tariq",
      jersey: "19",
      role: "Leg Spinner / All-Rounder",
      team: "Tigers Cricket Club",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      primaryStat: "124 Wickets",
      secondaryStat: "6.8 Econ",
      profileUrl: "/player/rashid-tariq",
    },
  ];

  // Dynamic Styles
  const badgeColor = s.style?.badgeColor || "#10b981";
  const titleColor = s.style?.titleColor || "#0f172a";
  const subtitleColor = s.style?.subtitleColor || "#64748b";
  const cardBgColor = s.style?.cardBgColor || "#ffffff";
  const accentColor = s.style?.accentColor || "#10b981";
  const sectionBg = s.style?.sectionBg || "";

  const titleTypo = getTypographyStyles(s.style?.titleTypography);
  const bodyTypo = getTypographyStyles(s.style?.bodyTypography);

  return (
    <section
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 w-full transition-colors"
      style={{ ...(sectionBg ? { backgroundColor: sectionBg } : {}) }}
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          {badgeText && (
            <span
              className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border inline-block"
              style={{
                color: badgeColor,
                borderColor: `${badgeColor}35`,
                backgroundColor: `${badgeColor}12`,
              }}
            >
              {badgeText}
            </span>
          )}
          <h2
            className="text-3xl sm:text-4xl font-black uppercase tracking-tight"
            style={{ color: titleColor, ...titleTypo }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="text-sm leading-relaxed max-w-xl mx-auto"
              style={{ color: subtitleColor, ...bodyTypo }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {players.map((p, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col bg-white"
              style={{ backgroundColor: cardBgColor }}
            >
              <div className="relative aspect-4/5 w-full bg-slate-100 overflow-hidden">
                <img
                  src={p.photo}
                  alt={p.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                />
                <div
                  className="absolute top-3 left-3 text-slate-950 text-xs font-black font-mono px-2.5 py-1 rounded-lg shadow-md"
                  style={{ backgroundColor: accentColor }}
                >
                  #{p.jersey}
                </div>
                {p.team && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-800 border border-slate-200 shadow-2xs">
                    {p.team}
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950 via-slate-950/70 to-transparent p-4">
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider block text-emerald-400"
                    style={{ color: accentColor }}
                  >
                    {p.role}
                  </span>
                  <h3 className="text-lg font-black text-white leading-tight mt-0.5">
                    {p.name}
                  </h3>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 flex items-center justify-between mt-auto bg-white">
                <div className="flex gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-sans font-bold block">
                      Primary
                    </span>
                    <span className="font-bold text-slate-900" style={{ color: accentColor }}>
                      {p.primaryStat}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-sans font-bold block">
                      Secondary
                    </span>
                    <span className="font-bold text-teal-600">
                      {p.secondaryStat}
                    </span>
                  </div>
                </div>

                <Link
                  href={p.profileUrl || "#"}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-emerald-500 hover:text-slate-950 flex items-center justify-center text-slate-600 transition-all shrink-0 cursor-pointer"
                  title="View Profile"
                >
                  <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Repeater Control for Player Cards in Builder Sidebar ───────────────────────
function PlayerCardsControl({
  value,
  onChange,
}: {
  value: FeaturedPlayerCard[];
  onChange: (items: FeaturedPlayerCard[]) => void;
}) {
  const items: FeaturedPlayerCard[] = Array.isArray(value) ? value : [];

  const update = (index: number, field: keyof FeaturedPlayerCard, val: any) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  };

  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));

  const add = () =>
    onChange([
      ...items,
      {
        name: "New Athlete",
        jersey: "99",
        role: "Player Role",
        team: "Club Team",
        photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
        primaryStat: "0",
        secondaryStat: "0",
        profileUrl: "/player/new-athlete",
      },
    ]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...items];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };

  const moveDown = (index: number) => {
    if (index >= items.length - 1) return;
    const next = [...items];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-gray-50 rounded-xl p-3 border border-gray-200 space-y-2 text-xs"
        >
          <div className="flex items-center justify-between font-bold text-gray-700 pb-1 border-b border-gray-200">
            <span>Card #{idx + 1} — {item.name || "Player"}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => moveUp(idx)}
                className="p-1 text-gray-400 hover:text-gray-700 cursor-pointer"
                title="Move up"
              >
                <Icon icon="solar:arrow-up-linear" width={14} />
              </button>
              <button
                type="button"
                onClick={() => moveDown(idx)}
                className="p-1 text-gray-400 hover:text-gray-700 cursor-pointer"
                title="Move down"
              >
                <Icon icon="solar:arrow-down-linear" width={14} />
              </button>
              <button
                type="button"
                onClick={() => remove(idx)}
                className="p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer"
                title="Remove"
              >
                <Icon icon="solar:trash-bin-trash-bold" width={14} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Text label="Player Name" value={item.name || ""} onChange={(v) => update(idx, "name", v)} />
            <Text label="Jersey #" value={item.jersey || ""} onChange={(v) => update(idx, "jersey", v)} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Text label="Role" value={item.role || ""} onChange={(v) => update(idx, "role", v)} />
            <Text label="Team / Club" value={item.team || ""} onChange={(v) => update(idx, "team", v)} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Text label="Primary Stat" value={item.primaryStat || ""} onChange={(v) => update(idx, "primaryStat", v)} />
            <Text label="Secondary Stat" value={item.secondaryStat || ""} onChange={(v) => update(idx, "secondaryStat", v)} />
          </div>

          <ImageGallery label="Player Photo" value={item.photo || ""} onChange={(v) => update(idx, "photo", v)} />
          <Text label="Profile Link" value={item.profileUrl || ""} onChange={(v) => update(idx, "profileUrl", v)} />
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="w-full py-2.5 rounded-xl border-2 border-dashed border-gray-300 hover:border-emerald-500 text-gray-600 hover:text-emerald-700 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer bg-white"
      >
        <Icon icon="solar:add-circle-bold" width={16} />
        <span>Add Player Card</span>
      </button>
    </div>
  );
}

// ── Builder Definition Object ─────────────────────────────────────────────────
const playerCardGridElement = {
  type: "player-card-grid",
  category: "players",
  label: "Player Card Grid",
  icon: "solar:users-group-rounded-bold",

  schema: {
    content: {
      badgeText: "PRO ATHLETES",
      title: "Featured Squad & Stars",
      subtitle: "Explore top performers, captains, and rising champions across all sports categories.",
      players: [
        {
          name: "Marcus Vance",
          jersey: "10",
          role: "Forward / Striker",
          team: "Camden Tigers FC",
          photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
          primaryStat: "142 Goals",
          secondaryStat: "68 Assists",
          profileUrl: "/player/marcus-vance",
        },
        {
          name: "Virat Sharma",
          jersey: "18",
          role: "Top-Order Batsman",
          team: "Tigers Cricket Club",
          photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
          primaryStat: "7,420 Runs",
          secondaryStat: "52.8 Avg",
          profileUrl: "/player/virat-sharma",
        },
        {
          name: "Liam O'Connor",
          jersey: "4",
          role: "Central Defender",
          team: "Camden Tigers FC",
          photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
          primaryStat: "48 Clean Sheets",
          secondaryStat: "94% Tackles",
          profileUrl: "/player/liam-oconnor",
        },
        {
          name: "Rashid Tariq",
          jersey: "19",
          role: "Leg Spinner / All-Rounder",
          team: "Tigers Cricket Club",
          photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
          primaryStat: "124 Wickets",
          secondaryStat: "6.8 Econ",
          profileUrl: "/player/rashid-tariq",
        },
      ],
    },

    style: {
      badgeColor: "#10b981",
      titleColor: "#0f172a",
      subtitleColor: "#64748b",
      cardBgColor: "#ffffff",
      accentColor: "#10b981",
      sectionBg: "",
    },
  },

  controls: [
    {
      tab: "Content",
      section: "Header Settings",
      controls: [
        {
          name: "badgeText",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Badge Pill" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "title",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Section Title" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "subtitle",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Textarea label="Subtitle" value={value || ""} onChange={onChange} rows={2} />
          ),
        },
      ],
    },
    {
      tab: "Content",
      section: "Player Cards List",
      controls: [
        {
          name: "players",
          responsive: false,
          render: (value: any, onChange: any) => (
            <PlayerCardsControl value={value || []} onChange={onChange} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Colors & Appearance",
      controls: [
        {
          name: "badgeColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Badge Color" value={value ?? "#10b981"} onChange={onChange} />
          ),
        },
        {
          name: "titleColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Title Color" value={value ?? "#0f172a"} onChange={onChange} />
          ),
        },
        {
          name: "subtitleColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Subtitle Color" value={value ?? "#64748b"} onChange={onChange} />
          ),
        },
        {
          name: "cardBgColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Card Background" value={value ?? "#0f172a"} onChange={onChange} />
          ),
        },
        {
          name: "accentColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Accent Pill Color" value={value ?? "#10b981"} onChange={onChange} />
          ),
        },
        {
          name: "sectionBg",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Section Background" value={value ?? ""} onChange={onChange} />
          ),
        },
        {
          name: "titleTypography",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Typography label="Title Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },
  ],

  render: (element: any) => <PlayerCardGridFrontend element={element} />,
};

export default playerCardGridElement;
