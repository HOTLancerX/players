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
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-emerald-500/40 hover:shadow-md transition group shadow-2xs">
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img src={photo} alt={item.title || "Player"} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black font-mono px-1 rounded-tl">
                        #{basic.jerseyNumber || "10"}
                    </span>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-600">{basic.position || "Forward"}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs text-slate-500">{basic.currentTeam || "Club"}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition">
                        <Link href={targetUrl}>{item.title || "Player"}</Link>
                    </h4>
                </div>
            </div>

            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                {!isCricket ? (
                    <div className="flex gap-4 font-mono text-xs">
                        <div className="text-center">
                            <span className="text-[10px] text-slate-400 block font-bold">GOALS</span>
                            <span className="font-bold text-slate-900">{stats.football?.goals ?? 0}</span>
                        </div>
                        <div className="text-center">
                            <span className="text-[10px] text-slate-400 block font-bold">ASSISTS</span>
                            <span className="font-bold text-slate-900">{stats.football?.assists ?? 0}</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-4 font-mono text-xs">
                        <div className="text-center">
                            <span className="text-[10px] text-slate-400 block font-bold">RUNS</span>
                            <span className="font-bold text-slate-900">{stats.cricket?.runsScored ?? 0}</span>
                        </div>
                        <div className="text-center">
                            <span className="text-[10px] text-slate-400 block font-bold">AVG</span>
                            <span className="font-bold text-slate-900">{stats.cricket?.battingAverage ?? 0}</span>
                        </div>
                    </div>
                )}

                <Link
                    href={targetUrl}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-500 hover:text-slate-950 text-xs font-bold transition flex items-center gap-1 border border-emerald-200"
                >
                    Profile
                    <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
                </Link>
            </div>
        </div>
    );
}
