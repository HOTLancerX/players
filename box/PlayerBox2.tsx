"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import type { PlayerBoxProps } from "./PlayerBox1";

function parseJson<T>(raw: string | undefined, fallback: T): T {
    if (!raw) return fallback;
    try {
        return JSON.parse(raw) as T;
    } catch {
        return fallback;
    }
}

export default function PlayerBox2(props: PlayerBoxProps) {
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
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-emerald-500/40 transition group">
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-950 shrink-0">
                    <img src={photo} alt={item.title || "Player"} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black font-mono px-1 rounded-tl">
                        #{basic.jerseyNumber || "10"}
                    </span>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-400">{basic.position || "Forward"}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs text-slate-400">{basic.currentTeam || "Club"}</span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                        <Link href={targetUrl}>{item.title || "Player"}</Link>
                    </h4>
                </div>
            </div>

            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                {!isCricket ? (
                    <div className="flex gap-4 font-mono text-xs">
                        <div className="text-center">
                            <span className="text-[10px] text-slate-500 block">GOALS</span>
                            <span className="font-bold text-emerald-400">{stats.football?.goals ?? 0}</span>
                        </div>
                        <div className="text-center">
                            <span className="text-[10px] text-slate-500 block">ASSISTS</span>
                            <span className="font-bold text-teal-300">{stats.football?.assists ?? 0}</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-4 font-mono text-xs">
                        <div className="text-center">
                            <span className="text-[10px] text-slate-500 block">RUNS</span>
                            <span className="font-bold text-amber-400">{stats.cricket?.runsScored ?? 0}</span>
                        </div>
                        <div className="text-center">
                            <span className="text-[10px] text-slate-500 block">AVG</span>
                            <span className="font-bold text-emerald-400">{stats.cricket?.battingAverage ?? 0}</span>
                        </div>
                    </div>
                )}

                <Link
                    href={targetUrl}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 text-xs font-bold transition flex items-center gap-1"
                >
                    Profile
                    <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
                </Link>
            </div>
        </div>
    );
}
