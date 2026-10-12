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

export function PlayerSpotlightHeroFrontend({ element }: { element: any }) {
  const s = element?.schema || {};

  const badgeText: string = s.content?.badgeText ?? "ATHLETE SPOTLIGHT";
  const playerName: string = s.content?.playerName ?? "Marcus Vance";
  const nickname: string = s.content?.nickname ?? "The Maestro";
  const jerseyNumber: string = s.content?.jerseyNumber ?? "10";
  const teamName: string = s.content?.teamName ?? "Camden Tigers FC";
  const position: string = s.content?.position ?? "Forward / Striker";
  const nationality: string = s.content?.nationality ?? "United Kingdom";
  const bio: string =
    s.content?.bio ??
    "Prolific top-tier athlete with record-breaking goal conversion rates and clinical playmaking prowess.";
  const profileImage: string =
    s.content?.profileImage ??
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80";
  const bgImage: string =
    s.content?.bgImage ??
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80";
  const profileUrl: string = s.content?.profileUrl ?? "/player/marcus-vance";
  const videoUrl: string = s.content?.videoUrl ?? "https://www.youtube.com";

  const stat1Label: string = s.content?.stat1Label ?? "Goals Scored";
  const stat1Value: string = s.content?.stat1Value ?? "142";
  const stat2Label: string = s.content?.stat2Label ?? "Assists";
  const stat2Value: string = s.content?.stat2Value ?? "68";
  const stat3Label: string = s.content?.stat3Label ?? "Matches";
  const stat3Value: string = s.content?.stat3Value ?? "248";
  const stat4Label: string = s.content?.stat4Label ?? "Trophies";
  const stat4Value: string = s.content?.stat4Value ?? "5";

  // Dynamic Styles
  const badgeColor = s.style?.badgeColor || "#10b981";
  const titleColor = s.style?.titleColor || "#ffffff";
  const accentColor = s.style?.accentColor || "#10b981";
  const textColor = s.style?.textColor || "#cbd5e1";
  const cardBgColor = s.style?.cardBgColor || "#0f172a";
  const sectionBg = s.style?.sectionBg || "#020617";

  const titleTypo = getTypographyStyles(s.style?.titleTypography);
  const bodyTypo = getTypographyStyles(s.style?.bodyTypography);

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24 text-white"
      style={{ backgroundColor: sectionBg }}
    >
      {/* Ambient background with overlay */}
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-xs mix-blend-luminosity scale-105 pointer-events-none"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/80 to-slate-950 pointer-events-none" />

      {/* Watermarked Jersey Number */}
      <div className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 text-slate-800/15 font-black text-[180px] sm:text-[280px] font-mono select-none pointer-events-none">
        #{jerseyNumber}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Player Info & Narrative */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              {badgeText && (
                <span
                  className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border"
                  style={{
                    color: badgeColor,
                    borderColor: `${badgeColor}40`,
                    backgroundColor: `${badgeColor}15`,
                  }}
                >
                  {badgeText}
                </span>
              )}
              {teamName && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {teamName}
                </span>
              )}
              {position && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {position}
                </span>
              )}
            </div>

            <div>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none"
                style={{ color: titleColor, ...titleTypo }}
              >
                {playerName}
              </h2>
              {nickname && (
                <p
                  className="text-lg font-semibold italic mt-2"
                  style={{ color: accentColor }}
                >
                  &ldquo;{nickname}&rdquo;
                </p>
              )}
            </div>

            <p
              className="text-sm sm:text-base max-w-2xl leading-relaxed mx-auto lg:mx-0"
              style={{ color: textColor, ...bodyTypo }}
            >
              {bio}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 max-w-xl mx-auto lg:mx-0">
              <div
                className="border border-slate-800 p-3.5 rounded-xl text-center"
                style={{ backgroundColor: cardBgColor }}
              >
                <div className="text-2xl sm:text-3xl font-black font-mono" style={{ color: accentColor }}>
                  {stat1Value}
                </div>
                <div className="text-[11px] font-bold text-slate-400 uppercase">{stat1Label}</div>
              </div>
              <div
                className="border border-slate-800 p-3.5 rounded-xl text-center"
                style={{ backgroundColor: cardBgColor }}
              >
                <div className="text-2xl sm:text-3xl font-black font-mono text-teal-300">
                  {stat2Value}
                </div>
                <div className="text-[11px] font-bold text-slate-400 uppercase">{stat2Label}</div>
              </div>
              <div
                className="border border-slate-800 p-3.5 rounded-xl text-center"
                style={{ backgroundColor: cardBgColor }}
              >
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                  {stat3Value}
                </div>
                <div className="text-[11px] font-bold text-slate-400 uppercase">{stat3Label}</div>
              </div>
              <div
                className="border border-slate-800 p-3.5 rounded-xl text-center"
                style={{ backgroundColor: cardBgColor }}
              >
                <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
                  {stat4Value}
                </div>
                <div className="text-[11px] font-bold text-slate-400 uppercase">{stat4Label}</div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href={profileUrl}
                className="px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 transition-all shadow-lg flex items-center gap-2 hover:opacity-90 active:scale-95"
                style={{ backgroundColor: accentColor }}
              >
                <span>View Full Profile & Stats</span>
                <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
              </Link>
              {videoUrl && (
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white transition-all flex items-center gap-2 hover:opacity-90 active:scale-95"
                >
                  <Icon icon="solar:play-circle-bold" className="w-4 h-4 text-red-500" />
                  <span>Watch Highlights</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Player Photo with Jersey Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              <div className="aspect-4/5 rounded-3xl overflow-hidden ring-4 ring-emerald-500/20 shadow-2xl bg-slate-900">
                <img
                  src={profileImage}
                  alt={playerName}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div
                className="absolute -bottom-4 -left-4 text-slate-950 font-black font-mono text-xl px-5 py-2 rounded-2xl shadow-xl border-4 border-slate-950"
                style={{ backgroundColor: accentColor }}
              >
                #{jerseyNumber}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Builder Definition Object ─────────────────────────────────────────────────
const playerSpotlightHeroElement = {
  type: "player-spotlight-hero",
  category: "players",
  label: "Player Spotlight Hero",
  icon: "solar:star-fall-bold",

  schema: {
    content: {
      badgeText: "ATHLETE SPOTLIGHT",
      playerName: "Marcus Vance",
      nickname: "The Maestro",
      jerseyNumber: "10",
      teamName: "Camden Tigers FC",
      position: "Forward / Striker",
      nationality: "United Kingdom",
      bio: "Prolific top-tier athlete with record-breaking goal conversion rates and clinical playmaking prowess.",
      profileImage:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
      bgImage:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80",
      profileUrl: "/player/marcus-vance",
      videoUrl: "https://www.youtube.com",
      stat1Label: "Goals Scored",
      stat1Value: "142",
      stat2Label: "Assists",
      stat2Value: "68",
      stat3Label: "Matches",
      stat3Value: "248",
      stat4Label: "Trophies",
      stat4Value: "5",
    },

    style: {
      badgeColor: "#10b981",
      titleColor: "#ffffff",
      accentColor: "#10b981",
      textColor: "#cbd5e1",
      cardBgColor: "#0f172a",
      sectionBg: "#020617",
    },
  },

  controls: [
    {
      tab: "Content",
      section: "Player Identity",
      controls: [
        {
          name: "badgeText",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Badge Pill" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "playerName",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Player Name" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "nickname",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Nickname" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "jerseyNumber",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Jersey #" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "teamName",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Team / Club" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "position",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Position / Role" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "bio",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Textarea label="Biography Narrative" value={value || ""} onChange={onChange} rows={3} />
          ),
        },
      ],
    },
    {
      tab: "Content",
      section: "Media & Links",
      controls: [
        {
          name: "profileImage",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ImageGallery label="Profile Portrait Image" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "bgImage",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ImageGallery label="Background Backdrop Image" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "profileUrl",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Profile Page URL" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "videoUrl",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Highlights Video URL" value={value || ""} onChange={onChange} />
          ),
        },
      ],
    },
    {
      tab: "Content",
      section: "Key Stats Counter",
      controls: [
        {
          name: "stat1Label",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Stat 1 Label" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "stat1Value",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Stat 1 Value" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "stat2Label",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Stat 2 Label" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "stat2Value",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Stat 2 Value" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "stat3Label",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Stat 3 Label" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "stat3Value",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Stat 3 Value" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "stat4Label",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Stat 4 Label" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "stat4Value",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Stat 4 Value" value={value || ""} onChange={onChange} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Theme & Colors",
      controls: [
        {
          name: "badgeColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Badge Accent" value={value ?? "#10b981"} onChange={onChange} />
          ),
        },
        {
          name: "accentColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Primary Accent Color" value={value ?? "#10b981"} onChange={onChange} />
          ),
        },
        {
          name: "titleColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Title Color" value={value ?? "#ffffff"} onChange={onChange} />
          ),
        },
        {
          name: "textColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Narrative Text Color" value={value ?? "#cbd5e1"} onChange={onChange} />
          ),
        },
        {
          name: "cardBgColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Stats Tile Background" value={value ?? "#0f172a"} onChange={onChange} />
          ),
        },
        {
          name: "sectionBg",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Section Background" value={value ?? "#020617"} onChange={onChange} />
          ),
        },
        {
          name: "titleTypography",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Typography label="Name Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },
  ],

  render: (element: any) => <PlayerSpotlightHeroFrontend element={element} />,
};

export default playerSpotlightHeroElement;
