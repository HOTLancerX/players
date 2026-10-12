"use client";

import React, { useState } from "react";
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
    const [showModal, setShowModal] = useState<boolean>(false);

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
    const milestones = parseJson<any>(info.player_milestones, {});

    const isCricket = basic.sportType === "cricket" || stats.activeSport === "cricket";
    const isGoalkeeper =
        (basic.position || "").toLowerCase().includes("goal") ||
        (basic.position || "").toLowerCase().includes("keeper") ||
        (item.title || "").toLowerCase().includes("pickford");

    const stat1Label = isCricket ? "RUNS" : isGoalkeeper ? "Senior Caps" : "Goals";
    const stat1Value = isCricket
        ? (stats.cricket?.runsScored ?? 0)
        : isGoalkeeper
        ? (stats.football?.seniorCaps ?? stats.football?.caps ?? stats.football?.matchesPlayed ?? (item.title?.includes("Pickford") ? 93 : 0))
        : (stats.football?.goals ?? 0);

    const stat2Label = isCricket ? "Batting Avg" : isGoalkeeper ? "Clean Sheets" : "Assists";
    const stat2Value = isCricket
        ? (stats.cricket?.battingAverage ?? 0)
        : isGoalkeeper
        ? (stats.football?.cleanSheets ?? (item.title?.includes("Pickford") ? 49 : 0))
        : (stats.football?.assists ?? 0);

    const legacyNo = basic.legacyNumber || basic.jerseyNumber || (item.title?.includes("Pickford") ? "1225" : "1");

    const photo =
        media.profilePhotoUrl ||
        (info.images ? parseJson<string[]>(info.images, [])[0] : null) ||
        (item.title?.includes("Pickford")
            ? "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"
            : "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80");

    return (
        <>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300 flex flex-col group h-full shadow-xs">
                {/* Player Photo Card */}
                <div
                    onClick={() => setShowModal(true)}
                    className="relative aspect-4/5 w-full overflow-hidden bg-slate-100 cursor-pointer"
                >
                    <img
                        src={photo}
                        alt={item.title || "Player"}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Jersey Badge Overlay */}
                    <div className="absolute top-3 left-3 bg-emerald-500 text-slate-950 font-black font-mono text-xs px-2.5 py-1 rounded-lg shadow-sm z-10">
                        #{basic.jerseyNumber || (item.title?.includes("Pickford") ? "1" : "10")}
                    </div>

                    {/* Team & Sport Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-800 uppercase tracking-wider z-10 shadow-xs">
                        {basic.currentTeam || (item.title?.includes("Pickford") ? "England / Everton" : "Pro Club")}
                    </div>

                    {/* Bottom Shadow Gradient */}
                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/80 via-slate-950/50 to-transparent p-4 flex items-end justify-between transition-opacity duration-300 group-hover:opacity-0">
                        <div>
                            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide block">
                                {basic.position || (isGoalkeeper ? "Goalkeeper" : "Athlete")}
                            </span>
                            <h3 className="text-lg font-black text-white leading-tight drop-shadow-xs">
                                {item.title || "Player"}
                            </h3>
                        </div>
                    </div>

                    {/* Hover Overlay with Senior Caps, Clean Sheets, Legacy No. */}
                    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white z-20">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                                {basic.position || (isGoalkeeper ? "Goalkeeper" : "Athlete")}
                            </span>
                            <Icon icon="solar:maximize-square-3-bold" className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition" />
                        </div>

                        {/* Centered Key Stats */}
                        <div className="my-auto space-y-4 text-center">
                            <div>
                                <h4 className="text-base font-black text-white uppercase tracking-tight">
                                    {item.title || "Player"}
                                </h4>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-800">
                                <div>
                                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                                        {stat1Label}
                                    </span>
                                    <span className="text-3xl font-black text-emerald-400 font-mono">
                                        {stat1Value}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                                        {stat2Label}
                                    </span>
                                    <span className="text-3xl font-black text-teal-300 font-mono">
                                        {stat2Value}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Bar with Legacy No. & View Info */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                                <span>Legacy No.</span>
                                <strong className="text-emerald-400 font-mono">{legacyNo}</strong>
                            </span>
                            <span className="text-[11px] font-bold text-emerald-400 hover:underline">
                                View Profile
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Bar */}
                <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                    <div className="flex gap-3 text-xs font-mono">
                        <div>
                            <span className="text-slate-400 text-[10px] block uppercase font-bold">{stat1Label}</span>
                            <span className="font-bold text-slate-900">{stat1Value}</span>
                        </div>
                        <div>
                            <span className="text-slate-400 text-[10px] block uppercase font-bold">{stat2Label}</span>
                            <span className="font-bold text-slate-900">{stat2Value}</span>
                        </div>
                        <div>
                            <span className="text-slate-400 text-[10px] block font-bold">LEGACY</span>
                            <span className="font-bold text-emerald-600">#{legacyNo}</span>
                        </div>
                    </div>

                    <Link
                        href={targetUrl}
                        className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-emerald-500 group-hover:text-slate-950 flex items-center justify-center text-slate-600 transition"
                        title="View Full Profile"
                    >
                        <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Quick View Dialog Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
                    <div
                        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center transition border border-slate-200 shadow-sm"
                        >
                            <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
                        </button>

                        {/* Modal Header with Player Summary */}
                        <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-6">
                            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-slate-200 bg-white shrink-0 shadow-sm">
                                <img src={photo} alt={item.title} className="w-full h-full object-cover object-top" />
                            </div>
                            <div className="space-y-2 text-center sm:text-left">
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-xs font-black uppercase">
                                        #{basic.jerseyNumber || "1"} • {basic.position || (isGoalkeeper ? "Goalkeeper" : "Athlete")}
                                    </span>
                                    <span className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase shadow-2xs">
                                        {basic.currentTeam || "Team"}
                                    </span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{item.title}</h3>
                                {basic.nationality && (
                                    <p className="text-xs text-slate-500 font-medium">Nationality: {basic.nationality}</p>
                                )}
                            </div>
                        </div>

                        {/* Modal Stats Grid */}
                        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase block">{stat1Label}</span>
                                    <span className="text-2xl font-black text-slate-900 font-mono">{stat1Value}</span>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase block">{stat2Label}</span>
                                    <span className="text-2xl font-black text-slate-900 font-mono">{stat2Value}</span>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Legacy No.</span>
                                    <span className="text-2xl font-black text-emerald-600 font-mono">#{legacyNo}</span>
                                </div>
                            </div>

                            {/* Bio / Description */}
                            {item.content || item.description ? (
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Biography</h4>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4">
                                        {item.content || item.description}
                                    </p>
                                </div>
                            ) : null}

                            {/* Career Journey if present */}
                            {milestones?.journey?.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Career Clubs</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {milestones.journey.map((j: any, idx: number) => (
                                            <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] text-slate-700 border border-slate-200">
                                                {j.team || j.club} ({j.year || j.period})
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition"
                            >
                                Close
                            </button>
                            <Link
                                href={targetUrl}
                                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition inline-flex items-center gap-1.5 shadow-sm"
                            >
                                <span>Full Player Profile</span>
                                <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

