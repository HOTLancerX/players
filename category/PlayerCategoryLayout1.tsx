"use client";

import React, { useState } from "react";
import PlayerBox1 from "../box/PlayerBox1";
import { Icon } from "@iconify/react";

export interface PlayerCategoryLayoutProps {
    data?: any;
    cat?: any;
    posts?: any[];
    items?: any[];
}

export default function PlayerCategoryLayout1(props: PlayerCategoryLayoutProps) {
    const cat = props.cat || props.data || {};
    const players = props.posts || props.items || [];

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
            if (filterRole === "forward" && (pos.includes("forward") || pos.includes("striker") || pos.includes("winger"))) return true;
            if (filterRole === "midfield" && pos.includes("midfield")) return true;
            if (filterRole === "defender" && (pos.includes("defend") || pos.includes("back"))) return true;
            if (filterRole === "goalkeeper" && (pos.includes("goal") || pos.includes("keeper"))) return true;
            if (filterRole === "batsman" && (pos.includes("bat") || pos.includes("opener"))) return true;
            if (filterRole === "bowler" && (pos.includes("bowl") || pos.includes("spinner") || pos.includes("pacer"))) return true;
            if (filterRole === "allrounder" && pos.includes("all-round")) return true;
        } catch {
            return false;
        }
        return false;
    });

    return (
        <div className="bg-slate-950 text-slate-100 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header Banner */}
                <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-800 space-y-4 relative overflow-hidden">
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-linear-to-l from-emerald-500/10 to-transparent pointer-events-none" />
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-400">
                        <Icon icon="solar:users-group-rounded-bold" className="w-4 h-4" />
                        <span>Athletes & Player Roster</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                        {cat.title || "Squad & Players"}
                    </h1>
                    {cat.description && (
                        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">{cat.description}</p>
                    )}

                    {/* Filter & Search Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800">
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
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                                        filterRole === f.id
                                            ? "bg-emerald-500 text-slate-950 shadow-md font-extrabold"
                                            : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
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
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {filtered.length === 0 ? (
                    <div className="bg-slate-900 rounded-3xl p-12 text-center text-slate-500 border border-slate-800">
                        <Icon icon="solar:user-block-bold" className="w-12 h-12 mx-auto mb-2 text-slate-600" />
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
