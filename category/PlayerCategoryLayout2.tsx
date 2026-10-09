"use client";

import React, { useState } from "react";
import PlayerBox2 from "../box/PlayerBox2";
import { Icon } from "@iconify/react";
import type { PlayerCategoryLayoutProps } from "./PlayerCategoryLayout1";

export default function PlayerCategoryLayout2(props: PlayerCategoryLayoutProps) {
    const cat = props.cat || props.data || {};
    const players = props.posts || props.items || [];
    const [search, setSearch] = useState<string>("");

    const filtered = players.filter((item) => (item.title || "").toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="bg-slate-950 text-slate-100 min-h-screen py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white">{cat.title || "Squad List"}</h1>
                        <p className="text-xs text-slate-400 mt-1">{filtered.length} Athletes Registered</p>
                    </div>
                    <div className="relative w-full sm:w-64">
                        <Icon icon="solar:magnifer-linear" className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search squad..."
                            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-emerald-500"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    {filtered.map((pl, i) => (
                        <PlayerBox2 key={pl._id || i} item={pl} />
                    ))}
                </div>
            </div>
        </div>
    );
}
