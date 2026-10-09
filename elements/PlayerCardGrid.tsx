"use client";

import React, { useState } from "react";
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

export interface FeaturedPlayerCard {
  name: string;
  jersey: string;
  role: string;
  team: string;
  photo: string;
  primaryStat: string; // e.g. "24 Goals" or "680 Runs"
  secondaryStat: string; // e.g. "12 Assists" or "22 Wickets"
  profileUrl: string;
}

export function PlayerCardGridFrontend({ element }: { element: any }) {
  const s = element?.schema || {};

  const badgeText: string = s.content?.badgeText || "PRO ATHLETES";
  const title: string = s.content?.title || "Featured Squad & Stars";
  const subtitle: string =
    s.content?.subtitle || "Explore top performers, captains, and rising champions across all sports categories.";

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

  return (
    <section className="py-16 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-block">
            {badgeText}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">{subtitle}</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {players.map((p, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/40 hover:shadow-xl transition group flex flex-col"
            >
              <div className="relative aspect-4/5 w-full bg-slate-950 overflow-hidden">
                <img
                  src={p.photo}
                  alt={p.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-emerald-500 text-slate-950 text-xs font-black font-mono px-2.5 py-1 rounded-lg">
                  #{p.jersey}
                </div>
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-slate-300">
                  {p.team}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-4">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide block">
                    {p.role}
                  </span>
                  <h3 className="text-lg font-black text-white leading-tight">{p.name}</h3>
                </div>
              </div>

              <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between mt-auto">
                <div className="flex gap-3 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block">PRIMARY</span>
                    <span className="font-bold text-emerald-400">{p.primaryStat}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">SECONDARY</span>
                    <span className="font-bold text-teal-300">{p.secondaryStat}</span>
                  </div>
                </div>

                <Link
                  href={p.profileUrl || "#"}
                  className="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 flex items-center justify-center text-slate-300 transition"
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

const playerCardGridElement = {
  type: "player-card-grid",
  title: "Player Card Grid",
  icon: "solar:users-group-rounded-bold",
  category: "players",
  schema: {
    content: [
      {
        type: "section",
        label: "Header Settings",
        fields: [
          {
            name: "badgeText",
            label: "Badge Text",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Text value={value ?? "PRO ATHLETES"} onChange={onChange} />
            ),
          },
          {
            name: "title",
            label: "Section Title",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Text value={value ?? "Featured Squad & Stars"} onChange={onChange} />
            ),
          },
          {
            name: "subtitle",
            label: "Subtitle",
            responsive: false,
            render: (value: any, onChange: any) => (
              <Textarea value={value ?? ""} onChange={onChange} />
            ),
          },
        ],
      },
    ],
    style: [
      {
        type: "section",
        label: "Appearance",
        fields: [
          {
            name: "badgeColor",
            label: "Badge Accent Color",
            responsive: false,
            render: (value: any, onChange: any) => (
              <ColorPickerPopup label="Badge Accent Color" value={value ?? "#10b981"} onChange={onChange} />
            ),
          },
        ],
      },
    ],
  },
  component: PlayerCardGridFrontend,
};

export default playerCardGridElement;
