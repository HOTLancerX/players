"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export interface PlayerBoxProps {
    item?: any;
    data?: any;
    itemUrl?: string;
    postUrl?: string;
    playerUrl?: string;
    permalinkMap?: Record<string, string>;
}

function parseJson<T>(raw: string | undefined, fallback: T): T {
    if (!raw) return fallback;
    try {
        return JSON.parse(raw) as T;
    } catch {
        return fallback;
    }
}

export default function PlayerBox1(props: PlayerBoxProps) {
    const item = props.item || props.data || {};
    const info = item.info || {};
    const slug = item.slug || (item._id ? String(item._id) : "");
    const permalinkMap = props.permalinkMap || {};
    const contentType = item.type || "player";
    const prefix = (permalinkMap[contentType] ?? permalinkMap["player"] ?? permalinkMap["players"] ?? contentType).trim().replace(/^\/+|\/+$/g, "");
    const dynamicUrl = slug ? (prefix ? `/${prefix}/${slug}` : `/${slug}`) : "#";
    const targetUrl = props.itemUrl || props.postUrl || props.playerUrl || dynamicUrl;

    const basic = parseJson<any>(info.player_basic, {});
    const stats = parseJson<any>(info.player_stats, {});
    const media = parseJson<any>(info.player_media, {});

    const isCricket = basic.sportType === "cricket" || stats.activeSport === "cricket";
    const photo = media.profilePhotoUrl || (info.images ? parseJson<string[]>(info.images, [])[0] : null) || "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80";

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-950/30 transition-all duration-300 flex flex-col group h-full">
            {/* Player Photo Card */}
            <div className="relative aspect-4/5 w-full overflow-hidden bg-slate-950">
                <img
                    src={photo}
                    alt={item.title || "Player"}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />

                {/* Jersey Badge Overlay */}
                <div className="absolute top-3 left-3 bg-linear-to-r from-emerald-500 to-teal-500 text-slate-950 font-black font-mono text-xs px-2.5 py-1 rounded-lg shadow-md">
                    #{basic.jerseyNumber || "10"}
                </div>

                {/* Team & Sport Badge */}
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    {basic.currentTeam || "Club"}
                </div>

                {/* Bottom Shadow Gradient with Nationality */}
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950 via-slate-950/70 to-transparent p-4 flex items-end justify-between">
                    <div>
                        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide block">
                            {basic.position || "Athlete"}
                        </span>
                        <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors leading-tight">
                            <Link href={targetUrl}>{item.title || "Player"}</Link>
                        </h3>
                    </div>
                </div>
            </div>

            {/* Stats Footer Bar */}
            <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between">
                {!isCricket ? (
                    <div className="flex gap-3 text-xs font-mono">
                        <div>
                            <span className="text-slate-500 text-[10px] block">GOALS</span>
                            <span className="font-bold text-emerald-400">{stats.football?.goals ?? 0}</span>
                        </div>
                        <div>
                            <span className="text-slate-500 text-[10px] block">ASSISTS</span>
                            <span className="font-bold text-teal-300">{stats.football?.assists ?? 0}</span>
                        </div>
                        <div>
                            <span className="text-slate-500 text-[10px] block">MATCHES</span>
                            <span className="font-bold text-white">{stats.football?.matchesPlayed ?? 0}</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-3 text-xs font-mono">
                        <div>
                            <span className="text-slate-500 text-[10px] block">RUNS</span>
                            <span className="font-bold text-amber-400">{stats.cricket?.runsScored ?? 0}</span>
                        </div>
                        <div>
                            <span className="text-slate-500 text-[10px] block">AVG</span>
                            <span className="font-bold text-emerald-400">{stats.cricket?.battingAverage ?? 0}</span>
                        </div>
                        <div>
                            <span className="text-slate-500 text-[10px] block">4s / 6s</span>
                            <span className="font-bold text-white">{stats.cricket?.foursCount ?? 0}/{stats.cricket?.sixesCount ?? 0}</span>
                        </div>
                    </div>
                )}

                <Link
                    href={targetUrl}
                    className="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 flex items-center justify-center text-slate-300 transition"
                >
                    <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
