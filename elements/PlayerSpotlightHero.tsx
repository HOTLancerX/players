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
  Section,
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

  const badgeText: string = s.content?.badgeText || "ATHLETE SPOTLIGHT";
  const playerName: string = s.content?.playerName || "Marcus Vance";
  const nickname: string = s.content?.nickname || "The Maestro";
  const jerseyNumber: string = s.content?.jerseyNumber || "10";
  const teamName: string = s.content?.teamName || "Camden Tigers FC";
  const position: string = s.content?.position || "Forward / Striker";
  const nationality: string = s.content?.nationality || "United Kingdom";
  const bio: string =
    s.content?.bio ||
    "Prolific top-tier athlete with record-breaking goal conversion rates and clinical playmaking prowess.";
  const profileImage: string =
    s.content?.profileImage ||
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80";
  const bgImage: string =
    s.content?.bgImage ||
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80";
  const profileUrl: string = s.content?.profileUrl || "/player/marcus-vance";
  const videoUrl: string = s.content?.videoUrl || "https://www.youtube.com";

  const stat1Label: string = s.content?.stat1Label || "Goals Scored";
  const stat1Value: string = s.content?.stat1Value || "142";
  const stat2Label: string = s.content?.stat2Label || "Assists";
  const stat2Value: string = s.content?.stat2Value || "68";
  const stat3Label: string = s.content?.stat3Label || "Matches";
  const stat3Value: string = s.content?.stat3Value || "248";
  const stat4Label: string = s.content?.stat4Label || "Trophies";
  const stat4Value: string = s.content?.stat4Value || "5";

  // Dynamic Styles
  const badgeColor = s.style?.badgeColor || "#10b981";
  const titleColor = s.style?.titleColor || "#ffffff";
  const accentColor = s.style?.accentColor || "#10b981";
  const textColor = s.style?.textColor || "#cbd5e1";

  const titleTypo = getTypographyStyles(s.style?.titleTypography);
  const bodyTypo = getTypographyStyles(s.style?.bodyTypography);

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950 text-white">
      {/* Ambient background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-xs mix-blend-luminosity scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-radial from-transparent via-slate-950/85 to-slate-950" />

      {/* Watermarked Jersey Number */}
      <div className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 text-slate-800/20 font-black text-[180px] sm:text-[280px] font-mono select-none pointer-events-none">
        #{jerseyNumber}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Player Info & Narrative */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
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
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {teamName}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {position}
              </span>
            </div>

            <div>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none"
                style={{ color: titleColor, ...titleTypo }}
              >
                {playerName}
              </h2>
              {nickname && (
                <p className="text-lg text-emerald-400 font-semibold italic mt-2">
                  &ldquo;{nickname}&rdquo;
                </p>
              )}
            </div>

            <p
              className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0"
              style={{ color: textColor, ...bodyTypo }}
            >
              {bio}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 max-w-xl mx-auto lg:mx-0">
              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-black font-mono" style={{ color: accentColor }}>
                  {stat1Value}
                </div>
                <div className="text-[11px] font-bold text-slate-400 uppercase">{stat1Label}</div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-teal-300">
                  {stat2Value}
                </div>
                <div className="text-[11px] font-bold text-slate-400 uppercase">{stat2Label}</div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                  {stat3Value}
                </div>
                <div className="text-[11px] font-bold text-slate-400 uppercase">{stat3Label}</div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl text-center">
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
                className="px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition shadow-lg flex items-center gap-2"
              >
                <span>View Full Profile & Stats</span>
                <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
              </Link>
              {videoUrl && (
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white transition flex items-center gap-2"
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
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black font-mono text-xl px-5 py-2 rounded-2xl shadow-xl border-4 border-slate-950">
                #{jerseyNumber}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const playerSpotlightHeroElement = {
  type: "player-spotlight-hero",
  title: "Player Spotlight Hero",
  icon: "solar:star-fall-bold",
  category: "players",
  schema: {
    content: [
      {
        type: "section",
        label: "Player Information",
        fields: [
          {
            name: "badgeText",
            label: "Badge Text",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Text value={value ?? "ATHLETE SPOTLIGHT"} onChange={onChange} />
            ),
          },
          {
            name: "playerName",
            label: "Player Name",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Text value={value ?? "Marcus Vance"} onChange={onChange} />
            ),
          },
          {
            name: "nickname",
            label: "Nickname",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Text value={value ?? "The Maestro"} onChange={onChange} />
            ),
          },
          {
            name: "jerseyNumber",
            label: "Jersey Number",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Text value={value ?? "10"} onChange={onChange} />
            ),
          },
          {
            name: "teamName",
            label: "Team Name",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Text value={value ?? "Camden Tigers FC"} onChange={onChange} />
            ),
          },
          {
            name: "position",
            label: "Position / Role",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Text value={value ?? "Forward / Striker"} onChange={onChange} />
            ),
          },
          {
            name: "bio",
            label: "Short Bio",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Textarea value={value ?? ""} onChange={onChange} />
            ),
          },
          {
            name: "profileImage",
            label: "Profile Photo URL",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Text value={value ?? ""} onChange={onChange} />
            ),
          },
          {
            name: "bgImage",
            label: "Hero Background URL",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Text value={value ?? ""} onChange={onChange} />
            ),
          },
          {
            name: "profileUrl",
            label: "Profile Link URL",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Url value={value ?? "/player/marcus-vance"} onChange={onChange} />
            ),
          },
          {
            name: "videoUrl",
            label: "Video Highlights URL",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Url value={value ?? "https://youtube.com"} onChange={onChange} />
            ),
          },
        ],
      },
      {
        type: "section",
        label: "Key Metrics",
        fields: [
          {
            name: "stat1Label",
            label: "Stat 1 Label",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Text value={value ?? "Goals Scored"} onChange={onChange} />
            ),
          },
          {
            name: "stat1Value",
            label: "Stat 1 Value",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Text value={value ?? "142"} onChange={onChange} />
            ),
          },
          {
            name: "stat2Label",
            label: "Stat 2 Label",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Text value={value ?? "Assists"} onChange={onChange} />
            ),
          },
          {
            name: "stat2Value",
            label: "Stat 2 Value",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Text value={value ?? "68"} onChange={onChange} />
            ),
          },
        ],
      },
    ],
    style: [
      {
        type: "section",
        label: "Visual Styling",
        fields: [
          {
            name: "badgeColor",
            label: "Badge Color",
            responsive: false,
            render: (value: any, onChange: any) => (
              <ColorPickerPopup label="Badge Color" value={value ?? "#10b981"} onChange={onChange} />
            ),
          },
          {
            name: "titleColor",
            label: "Title Color",
            responsive: false,
            render: (value: any, onChange: any) => (
              <ColorPickerPopup label="Title Color" value={value ?? "#ffffff"} onChange={onChange} />
            ),
          },
          {
            name: "accentColor",
            label: "Accent Stat Color",
            responsive: false,
            render: (value: any, onChange: any) => (
              <ColorPickerPopup label="Accent Stat Color" value={value ?? "#10b981"} onChange={onChange} />
            ),
          },
          {
            name: "titleTypography",
            label: "Title Typography",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Typography value={value} onChange={onChange} />
            ),
          },
        ],
      },
    ],
  },
  component: PlayerSpotlightHeroFrontend,
};

export default playerSpotlightHeroElement;
