"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import type { FieldProps } from "@/hook";

export interface FootballStats {
    matchesPlayed: number;
    minutesPlayed: number;
    goals: number;
    assists: number;
    shotsOnTarget: number;
    passAccuracy: number; // e.g. 88.5%
    cleanSheets: number;
    yellowCards: number;
    redCards: number;
    tacklesWon: number;
    penaltiesScored: number;
    hatTricks: number;
    trophies: number;
}

export interface CricketStats {
    format: "all" | "t20i" | "odi" | "test" | "franchise";
    matchesPlayed: number;
    innings: number;
    runsScored: number;
    highestScore: string;
    battingAverage: number;
    strikeRate: number;
    centuries: number; // 100s
    fifties: number; // 50s
    foursCount: number; // 4s
    sixesCount: number; // 6s
    notOuts: number;
    // Bowling
    wicketsTaken: number;
    bowlingEconomy: number;
    bowlingAverage: number;
    bestBowling: string; // e.g. "5/18"
    fiveWicketHauls: number;
    // Fielding
    catches: number;
    stumpings: number;
}

export interface SeasonStatRow {
    season: string;
    team: string;
    competition: string;
    matches: number;
    primaryStat: string; // e.g. "24 Goals" or "680 Runs"
    secondaryStat: string; // e.g. "11 Assists" or "18 Wickets"
    rating: string;
}

export interface PlayerSportsStatsData {
    activeSport: "football" | "cricket" | "custom";
    football: FootballStats;
    cricket: CricketStats;
    customStats: { label: string; value: string }[];
    seasonHistory: SeasonStatRow[];
}

export function PlayerSportsStatsFields({ name, label, value, onChange }: FieldProps) {
    const [data, setData] = useState<PlayerSportsStatsData>({
        activeSport: "football",
        football: {
            matchesPlayed: 248,
            minutesPlayed: 19840,
            goals: 142,
            assists: 68,
            shotsOnTarget: 380,
            passAccuracy: 86.4,
            cleanSheets: 0,
            yellowCards: 14,
            redCards: 1,
            tacklesWon: 92,
            penaltiesScored: 18,
            hatTricks: 6,
            trophies: 5,
        },
        cricket: {
            format: "all",
            matchesPlayed: 184,
            innings: 162,
            runsScored: 7420,
            highestScore: "183*",
            battingAverage: 52.8,
            strikeRate: 138.4,
            centuries: 18,
            fifties: 42,
            foursCount: 684,
            sixesCount: 196,
            notOuts: 24,
            wicketsTaken: 48,
            bowlingEconomy: 7.2,
            bowlingAverage: 28.5,
            bestBowling: "4/22",
            fiveWicketHauls: 1,
            catches: 88,
            stumpings: 0,
        },
        customStats: [
            { label: "Man of the Match Awards", value: "32" },
            { label: "Top Speed", value: "34.8 km/h" },
            { label: "Conversion Rate", value: "24.5%" },
        ],
        seasonHistory: [
            { season: "2024/25", team: "Camden Tigers", competition: "Premier League", matches: 28, primaryStat: "22 Goals", secondaryStat: "9 Assists", rating: "8.4" },
            { season: "2023/24", team: "Camden Tigers", competition: "Championship", matches: 34, primaryStat: "26 Goals", secondaryStat: "12 Assists", rating: "8.6" },
            { season: "2022/23", team: "London Athletics", competition: "League One", matches: 30, primaryStat: "18 Goals", secondaryStat: "7 Assists", rating: "7.9" },
        ],
    });

    useEffect(() => {
        try {
            if (value) {
                const parsed = JSON.parse(value);
                setData((prev) => ({ ...prev, ...parsed }));
            }
        } catch {
            /* ignore JSON parse errors */
        }
    }, [value]);

    const dataRef = useRef(data);
    dataRef.current = data;

    const updateRoot = (updater: (prev: PlayerSportsStatsData) => PlayerSportsStatsData) => {
        const next = updater(dataRef.current);
        dataRef.current = next;
        setData(next);
        onChange(JSON.stringify(next));
    };

    const updateFootball = (key: keyof FootballStats, val: any) => {
        updateRoot((prev) => ({
            ...prev,
            football: { ...prev.football, [key]: Number(val) || 0 },
        }));
    };

    const updateCricket = (key: keyof CricketStats, val: any) => {
        updateRoot((prev) => ({
            ...prev,
            cricket: { ...prev.cricket, [key]: isNaN(Number(val)) || key === "format" || key === "highestScore" || key === "bestBowling" ? val : Number(val) },
        }));
    };

    const addSeasonRow = () => {
        updateRoot((prev) => ({
            ...prev,
            seasonHistory: [
                ...prev.seasonHistory,
                { season: "2025/26", team: "Current Club", competition: "League", matches: 0, primaryStat: "0", secondaryStat: "0", rating: "7.0" },
            ],
        }));
    };

    const removeSeasonRow = (idx: number) => {
        updateRoot((prev) => ({
            ...prev,
            seasonHistory: prev.seasonHistory.filter((_, i) => i !== idx),
        }));
    };

    const updateSeasonRow = (idx: number, field: keyof SeasonStatRow, val: any) => {
        updateRoot((prev) => ({
            ...prev,
            seasonHistory: prev.seasonHistory.map((row, i) => (i === idx ? { ...row, [field]: val } : row)),
        }));
    };

    const addCustomStat = () => {
        updateRoot((prev) => ({
            ...prev,
            customStats: [...prev.customStats, { label: "New Metric", value: "0" }],
        }));
    };

    const removeCustomStat = (idx: number) => {
        updateRoot((prev) => ({
            ...prev,
            customStats: prev.customStats.filter((_, i) => i !== idx),
        }));
    };

    const updateCustomStat = (idx: number, field: "label" | "value", val: string) => {
        updateRoot((prev) => ({
            ...prev,
            customStats: prev.customStats.map((item, i) => (i === idx ? { ...item, [field]: val } : item)),
        }));
    };

    return (
        <div className="flex flex-col gap-4 bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-xs">
            {/* Header & Tabs */}
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-gray-100 gap-2">
                <label className="text-xs font-bold text-gray-800 flex items-center gap-2">
                    <Icon icon="solar:chart-square-bold" className="w-4 h-4 text-indigo-600" />
                    {label || "Career & Match Statistics"}
                </label>
                <div className="flex gap-1.5 p-1 bg-gray-100 rounded-lg">
                    <button
                        type="button"
                        onClick={() => updateRoot((p) => ({ ...p, activeSport: "football" }))}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition ${data.activeSport === "football" ? "bg-white text-indigo-700 shadow-xs" : "text-gray-600 hover:text-black"}`}
                    >
                        ⚽ Football Stats
                    </button>
                    <button
                        type="button"
                        onClick={() => updateRoot((p) => ({ ...p, activeSport: "cricket" }))}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition ${data.activeSport === "cricket" ? "bg-white text-indigo-700 shadow-xs" : "text-gray-600 hover:text-black"}`}
                    >
                        🏏 Cricket Stats
                    </button>
                    <button
                        type="button"
                        onClick={() => updateRoot((p) => ({ ...p, activeSport: "custom" }))}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition ${data.activeSport === "custom" ? "bg-white text-indigo-700 shadow-xs" : "text-gray-600 hover:text-black"}`}
                    >
                        ⚙️ Custom Metrics
                    </button>
                </div>
            </div>

            {/* ── Football Stats Form ── */}
            {data.activeSport === "football" && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-indigo-900">Matches Played</label>
                            <input
                                type="number"
                                value={data.football.matchesPlayed}
                                onChange={(e) => updateFootball("matchesPlayed", e.target.value)}
                                className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-xs font-mono font-bold text-gray-800 outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-indigo-900">Total Goals ⚽</label>
                            <input
                                type="number"
                                value={data.football.goals}
                                onChange={(e) => updateFootball("goals", e.target.value)}
                                className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-xs font-mono font-extrabold text-indigo-600 outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-indigo-900">Total Assists 👟</label>
                            <input
                                type="number"
                                value={data.football.assists}
                                onChange={(e) => updateFootball("assists", e.target.value)}
                                className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-xs font-mono font-bold text-emerald-600 outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-indigo-900">Minutes Played</label>
                            <input
                                type="number"
                                value={data.football.minutesPlayed}
                                onChange={(e) => updateFootball("minutesPlayed", e.target.value)}
                                className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-xs font-mono font-medium text-gray-800 outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-gray-700">Shots on Target</label>
                            <input
                                type="number"
                                value={data.football.shotsOnTarget}
                                onChange={(e) => updateFootball("shotsOnTarget", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-mono outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-gray-700">Pass Accuracy (%)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={data.football.passAccuracy}
                                onChange={(e) => updateFootball("passAccuracy", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-mono outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-gray-700">Clean Sheets</label>
                            <input
                                type="number"
                                value={data.football.cleanSheets}
                                onChange={(e) => updateFootball("cleanSheets", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-mono outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-gray-700">Tackles Won</label>
                            <input
                                type="number"
                                value={data.football.tacklesWon}
                                onChange={(e) => updateFootball("tacklesWon", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-mono outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-amber-700">🟨 Yellow Cards</label>
                            <input
                                type="number"
                                value={data.football.yellowCards}
                                onChange={(e) => updateFootball("yellowCards", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-mono outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-red-700">🟥 Red Cards</label>
                            <input
                                type="number"
                                value={data.football.redCards}
                                onChange={(e) => updateFootball("redCards", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-mono outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-gray-700">Hat-Tricks</label>
                            <input
                                type="number"
                                value={data.football.hatTricks}
                                onChange={(e) => updateFootball("hatTricks", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-mono outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-gray-700">Trophies Won 🏆</label>
                            <input
                                type="number"
                                value={data.football.trophies}
                                onChange={(e) => updateFootball("trophies", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-mono font-bold text-amber-600 outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ── Cricket Stats Form ── */}
            {data.activeSport === "cricket" && (
                <div className="space-y-4">
                    {/* Batting Highlights Banner */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/70">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-amber-900">Total Runs 🏏</label>
                            <input
                                type="number"
                                value={data.cricket.runsScored}
                                onChange={(e) => updateCricket("runsScored", e.target.value)}
                                className="w-full rounded-lg border border-amber-200 bg-white px-3 py-1.5 text-xs font-mono font-extrabold text-amber-700 outline-none focus:border-amber-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-amber-900">Batting Average</label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.cricket.battingAverage}
                                onChange={(e) => updateCricket("battingAverage", e.target.value)}
                                className="w-full rounded-lg border border-amber-200 bg-white px-3 py-1.5 text-xs font-mono font-bold text-gray-800 outline-none focus:border-amber-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-amber-900">Strike Rate (SR)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={data.cricket.strikeRate}
                                onChange={(e) => updateCricket("strikeRate", e.target.value)}
                                className="w-full rounded-lg border border-amber-200 bg-white px-3 py-1.5 text-xs font-mono font-bold text-emerald-600 outline-none focus:border-amber-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-amber-900">Highest Score (HS)</label>
                            <input
                                type="text"
                                placeholder="e.g. 183*"
                                value={data.cricket.highestScore}
                                onChange={(e) => updateCricket("highestScore", e.target.value)}
                                className="w-full rounded-lg border border-amber-200 bg-white px-3 py-1.5 text-xs font-mono font-bold text-gray-800 outline-none focus:border-amber-500"
                            />
                        </div>
                    </div>

                    {/* Fours, Sixes, 100s, 50s */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-gray-700">Fours Hit (4s) 💥</label>
                            <input
                                type="number"
                                value={data.cricket.foursCount}
                                onChange={(e) => updateCricket("foursCount", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-mono font-bold text-indigo-600 outline-none focus:border-amber-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-gray-700">Sixes Hit (6s) 🚀</label>
                            <input
                                type="number"
                                value={data.cricket.sixesCount}
                                onChange={(e) => updateCricket("sixesCount", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-mono font-bold text-rose-600 outline-none focus:border-amber-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-gray-700">Centuries (100s) 💯</label>
                            <input
                                type="number"
                                value={data.cricket.centuries}
                                onChange={(e) => updateCricket("centuries", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-mono outline-none focus:border-amber-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-gray-700">Half-Centuries (50s) 🎖️</label>
                            <input
                                type="number"
                                value={data.cricket.fifties}
                                onChange={(e) => updateCricket("fifties", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-mono outline-none focus:border-amber-500"
                            />
                        </div>
                    </div>

                    {/* Bowling & Fielding */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50/70 p-3 rounded-lg border border-gray-100">
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-gray-700">Wickets Taken 🎯</label>
                            <input
                                type="number"
                                value={data.cricket.wicketsTaken}
                                onChange={(e) => updateCricket("wicketsTaken", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-mono font-bold text-emerald-600 outline-none focus:border-amber-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-gray-700">Economy Rate (Econ)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.cricket.bowlingEconomy}
                                onChange={(e) => updateCricket("bowlingEconomy", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-mono outline-none focus:border-amber-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-gray-700">Best Bowling (BBI)</label>
                            <input
                                type="text"
                                placeholder="e.g. 5/19"
                                value={data.cricket.bestBowling}
                                onChange={(e) => updateCricket("bestBowling", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-mono outline-none focus:border-amber-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-gray-700">Catches Taken 🧤</label>
                            <input
                                type="number"
                                value={data.cricket.catches}
                                onChange={(e) => updateCricket("catches", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-mono outline-none focus:border-amber-500"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ── Custom Metric Keys ── */}
            {data.activeSport === "custom" && (
                <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-700">Custom Highlights & Metrics</span>
                        <button
                            type="button"
                            onClick={addCustomStat}
                            className="px-2.5 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition flex items-center gap-1"
                        >
                            <Icon icon="solar:add-circle-bold" className="w-3.5 h-3.5" />
                            Add Metric
                        </button>
                    </div>

                    {data.customStats.map((st, i) => (
                        <div key={i} className="flex gap-2 items-center">
                            <input
                                type="text"
                                placeholder="Metric Name"
                                value={st.label}
                                onChange={(e) => updateCustomStat(i, "label", e.target.value)}
                                className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs outline-none focus:border-indigo-500"
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={st.value}
                                onChange={(e) => updateCustomStat(i, "value", e.target.value)}
                                className="w-36 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-mono font-bold outline-none focus:border-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={() => removeCustomStat(i)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition"
                            >
                                <Icon icon="solar:trash-bin-trash-bold" className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Season History Table ── */}
            <div className="mt-2 pt-3 border-t border-gray-100 space-y-2.5">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                        <Icon icon="solar:history-bold" className="w-4 h-4 text-gray-600" />
                        Season-by-Season Log
                    </span>
                    <button
                        type="button"
                        onClick={addSeasonRow}
                        className="px-2.5 py-1 text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-md transition flex items-center gap-1"
                    >
                        <Icon icon="solar:add-circle-bold" className="w-3.5 h-3.5" />
                        Add Season
                    </button>
                </div>

                <div className="space-y-2">
                    {data.seasonHistory.map((s, idx) => (
                        <div key={idx} className="grid grid-cols-2 sm:grid-cols-7 gap-2 p-2.5 bg-gray-50 rounded-lg border border-gray-200/80 items-center">
                            <input
                                type="text"
                                placeholder="Season (2024/25)"
                                value={s.season}
                                onChange={(e) => updateSeasonRow(idx, "season", e.target.value)}
                                className="rounded border border-gray-200 bg-white px-2 py-1 text-[11px] font-mono"
                            />
                            <input
                                type="text"
                                placeholder="Club/Team"
                                value={s.team}
                                onChange={(e) => updateSeasonRow(idx, "team", e.target.value)}
                                className="rounded border border-gray-200 bg-white px-2 py-1 text-[11px]"
                            />
                            <input
                                type="text"
                                placeholder="League/Comp"
                                value={s.competition}
                                onChange={(e) => updateSeasonRow(idx, "competition", e.target.value)}
                                className="rounded border border-gray-200 bg-white px-2 py-1 text-[11px]"
                            />
                            <input
                                type="number"
                                placeholder="Matches"
                                value={s.matches}
                                onChange={(e) => updateSeasonRow(idx, "matches", Number(e.target.value))}
                                className="rounded border border-gray-200 bg-white px-2 py-1 text-[11px] font-mono"
                            />
                            <input
                                type="text"
                                placeholder="Primary (24 G / 750 R)"
                                value={s.primaryStat}
                                onChange={(e) => updateSeasonRow(idx, "primaryStat", e.target.value)}
                                className="rounded border border-gray-200 bg-white px-2 py-1 text-[11px] font-bold text-indigo-700"
                            />
                            <input
                                type="text"
                                placeholder="Secondary"
                                value={s.secondaryStat}
                                onChange={(e) => updateSeasonRow(idx, "secondaryStat", e.target.value)}
                                className="rounded border border-gray-200 bg-white px-2 py-1 text-[11px]"
                            />
                            <div className="flex items-center gap-1">
                                <input
                                    type="text"
                                    placeholder="Rating"
                                    value={s.rating}
                                    onChange={(e) => updateSeasonRow(idx, "rating", e.target.value)}
                                    className="w-14 rounded border border-gray-200 bg-white px-2 py-1 text-[11px] font-mono font-bold text-emerald-600"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeSeasonRow(idx)}
                                    className="p-1 text-red-500 hover:bg-red-100 rounded"
                                >
                                    <Icon icon="solar:trash-bin-trash-bold" className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlayerSportsStatsFields;
