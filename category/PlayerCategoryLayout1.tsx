"use client";

import React, { useState } from "react";
import PlayerBox1 from "../box/PlayerBox1";
import { Icon } from "@iconify/react";

export interface PlayerCategoryLayoutProps {
    data?: any;
    cat?: any;
    posts?: any[];
    items?: any[];
    pageData?: any;
    settings?: any;
    permalinkMap?: any;
}

export default function PlayerCategoryLayout1(props: PlayerCategoryLayoutProps) {
    const cat = props.cat || props.data || {};
    const players = props.posts || props.items || props.pageData?.posts || [];

    const [filterRole, setFilterRole] = useState<string>("all");
    const [search, setSearch] = useState<string>("");

    const filtered = players.filter((item) => {
        const matchesSearch = (item.title || "").toLowerCase().includes(search.toLowerCase());
        if (!matchesSearch) return false;
        if (filterRole === "all") return true;

        let info: any = {};
        try {
            info = item.info || {};
            const basic = typeof info.player_basic === "string" ? JSON.parse(info.player_basic) : info.player_basic || {};
            const pos = (basic.position || "").toLowerCase();
            const catTitle = (cat.title || "").toLowerCase();
            const catSlug = (cat.slug || "").toLowerCase();
            const matchesRole = (r: string) => pos.includes(r) || catTitle.includes(r) || catSlug.includes(r);

            if (filterRole === "forward" && (matchesRole("forward") || matchesRole("striker") || matchesRole("winger"))) return true;
            if (filterRole === "midfield" && matchesRole("midfield")) return true;
            if (filterRole === "defender" && (matchesRole("defend") || matchesRole("back"))) return true;
            if (filterRole === "goalkeeper" && (matchesRole("goal") || matchesRole("keeper"))) return true;
            if (filterRole === "batsman" && (matchesRole("bat") || matchesRole("opener"))) return true;
            if (filterRole === "bowler" && (matchesRole("bowl") || matchesRole("spinner") || matchesRole("pacer"))) return true;
            if (filterRole === "allrounder" && matchesRole("all-round")) return true;
        } catch {
            return false;
        }
        return false;
    });

    return (
        <div className="bg-slate-50 text-slate-900 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header Banner */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-linear-to-l from-emerald-500/10 to-transparent pointer-events-none" />
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-600">
                        <Icon icon="solar:users-group-rounded-bold" className="w-4 h-4" />
                        <span>Athletes & Player Roster</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">
                        {cat.title || "Squad & Players"}
                    </h1>
                    {cat.description && (
                        <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">{cat.description}</p>
                    )}

                    {/* Filter & Search Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
                        <div className="flex flex-wrap items-center gap-2">
                            {[
                                { id: "all", label: "All Players" },
                                { id: "forward", label: "Forwards" },
                                { id: "midfield", label: "Midfielders" },
                                { id: "defender", label: "Defenders" },
                                { id: "goalkeeper", label: "Goalkeepers" },
                                { id: "batsman", label: "Batsmen" },
                                { id: "bowler", label: "Bowlers" },
                                { id: "allrounder", label: "All-Rounders" },
                            ].map((f) => (
                                <button
                                    key={f.id}
                                    type="button"
                                    onClick={() => setFilterRole(f.id)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition border ${
                                        filterRole === f.id
                                            ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-sm font-extrabold"
                                            : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200 shadow-2xs"
                                    }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full sm:w-72">
                            <Icon icon="solar:magnifer-linear" className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by player name..."
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-500 shadow-2xs"
                            />
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {filtered.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200 shadow-sm">
                        <Icon icon="solar:user-block-bold" className="w-12 h-12 mx-auto mb-2 text-slate-400" />
                        <p className="text-sm font-semibold">No athletes found matching the active criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filtered.map((pl, i) => (
                            <PlayerBox1 key={pl._id || i} item={pl} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
