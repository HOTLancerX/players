"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import type { FieldProps } from "@/hook";

export interface ClubTransferEntry {
    years: string;
    clubName: string;
    division: string;
    appearances: string;
    goalsOrRuns: string;
    titles: string;
}

export interface TrophyEntry {
    title: string;
    year: string;
    competition: string;
    badgeIcon: string;
    description: string;
}

export interface RecordEntry {
    title: string;
    date: string;
    recordText: string;
}

export interface PlayerMilestonesData {
    clubJourney: ClubTransferEntry[];
    trophies: TrophyEntry[];
    records: RecordEntry[];
}

export function PlayerCareerMilestones({ name, label, value, onChange }: FieldProps) {
    const [data, setData] = useState<PlayerMilestonesData>({
        clubJourney: [
            { years: "2021 - Present", clubName: "Camden Tigers FC", division: "Premier League", appearances: "148", goalsOrRuns: "84 Goals", titles: "2x League Champion" },
            { years: "2018 - 2021", clubName: "North London FC", division: "Championship", appearances: "92", goalsOrRuns: "46 Goals", titles: "1x Cup Winner" },
            { years: "2015 - 2018", clubName: "Youth Academy", division: "U-18 Elite", appearances: "64", goalsOrRuns: "32 Goals", titles: "Youth Golden Boot" },
        ],
        trophies: [
            { title: "Premier Championship", year: "2024", competition: "National League", badgeIcon: "solar:cup-star-bold", description: "League winner with record 92 points" },
            { title: "Golden Boot Top Scorer", year: "2023", competition: "Cup Finals", badgeIcon: "solar:medal-ribbons-star-bold", description: "28 goals in 32 matches" },
            { title: "Player of the Season", year: "2022", competition: "Club Honors", badgeIcon: "solar:star-fall-bold", description: "Voted by players and fans" },
        ],
        records: [
            { title: "Fastest Hat-trick in Club History", date: "Oct 2023", recordText: "Scored 3 goals in 6 minutes vs East United" },
            { title: "Youngest Player to Reach 50 Goals", date: "Jan 2022", recordText: "Achieved at 21 years and 140 days" },
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

    const updateRoot = (updater: (prev: PlayerMilestonesData) => PlayerMilestonesData) => {
        const next = updater(dataRef.current);
        dataRef.current = next;
        setData(next);
        onChange(JSON.stringify(next));
    };

    // Journey
    const addJourney = () => {
        updateRoot((p) => ({
            ...p,
            clubJourney: [...p.clubJourney, { years: "2024 - 2025", clubName: "Club Name", division: "Division", appearances: "0", goalsOrRuns: "0", titles: "" }],
        }));
    };
    const removeJourney = (idx: number) => {
        updateRoot((p) => ({ ...p, clubJourney: p.clubJourney.filter((_, i) => i !== idx) }));
    };
    const updateJourney = (idx: number, field: keyof ClubTransferEntry, val: string) => {
        updateRoot((p) => ({
            ...p,
            clubJourney: p.clubJourney.map((item, i) => (i === idx ? { ...item, [field]: val } : item)),
        }));
    };

    // Trophies
    const addTrophy = () => {
        updateRoot((p) => ({
            ...p,
            trophies: [...p.trophies, { title: "Championship Trophy", year: "2025", competition: "League", badgeIcon: "solar:cup-star-bold", description: "" }],
        }));
    };
    const removeTrophy = (idx: number) => {
        updateRoot((p) => ({ ...p, trophies: p.trophies.filter((_, i) => i !== idx) }));
    };
    const updateTrophy = (idx: number, field: keyof TrophyEntry, val: string) => {
        updateRoot((p) => ({
            ...p,
            trophies: p.trophies.map((item, i) => (i === idx ? { ...item, [field]: val } : item)),
        }));
    };

    // Records
    const addRecord = () => {
        updateRoot((p) => ({
            ...p,
            records: [...p.records, { title: "Career Record", date: "2025", recordText: "Record description" }],
        }));
    };
    const removeRecord = (idx: number) => {
        updateRoot((p) => ({ ...p, records: p.records.filter((_, i) => i !== idx) }));
    };
    const updateRecord = (idx: number, field: keyof RecordEntry, val: string) => {
        updateRoot((p) => ({
            ...p,
            records: p.records.map((item, i) => (i === idx ? { ...item, [field]: val } : item)),
        }));
    };

    return (
        <div className="flex flex-col gap-4 bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <label className="text-xs font-bold text-gray-800 flex items-center gap-2">
                    <Icon icon="solar:cup-star-bold" className="w-4 h-4 text-amber-500" />
                    {label || "Career Journey, Trophies & Records"}
                </label>
            </div>

            {/* ── Club Journey Timeline ── */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                        <Icon icon="solar:transfer-horizontal-bold" className="w-4 h-4 text-emerald-600" />
                        Club / Team Journey
                    </span>
                    <button
                        type="button"
                        onClick={addJourney}
                        className="px-2.5 py-1 text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-md transition flex items-center gap-1"
                    >
                        <Icon icon="solar:add-circle-bold" className="w-3.5 h-3.5" />
                        Add Club
                    </button>
                </div>

                <div className="space-y-2">
                    {data.clubJourney.map((cj, idx) => (
                        <div key={idx} className="grid grid-cols-1 sm:grid-cols-6 gap-2 p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                            <input
                                type="text"
                                placeholder="Years (2021-2024)"
                                value={cj.years}
                                onChange={(e) => updateJourney(idx, "years", e.target.value)}
                                className="rounded border border-gray-200 bg-white px-2 py-1 text-xs font-mono"
                            />
                            <input
                                type="text"
                                placeholder="Club/Team Name"
                                value={cj.clubName}
                                onChange={(e) => updateJourney(idx, "clubName", e.target.value)}
                                className="rounded border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-gray-800 sm:col-span-2"
                            />
                            <input
                                type="text"
                                placeholder="Apps (148)"
                                value={cj.appearances}
                                onChange={(e) => updateJourney(idx, "appearances", e.target.value)}
                                className="rounded border border-gray-200 bg-white px-2 py-1 text-xs"
                            />
                            <input
                                type="text"
                                placeholder="Stats (84 G / 2500 R)"
                                value={cj.goalsOrRuns}
                                onChange={(e) => updateJourney(idx, "goalsOrRuns", e.target.value)}
                                className="rounded border border-gray-200 bg-white px-2 py-1 text-xs font-bold text-emerald-600"
                            />
                            <div className="flex items-center gap-1">
                                <input
                                    type="text"
                                    placeholder="Honors/Titles"
                                    value={cj.titles}
                                    onChange={(e) => updateJourney(idx, "titles", e.target.value)}
                                    className="flex-1 rounded border border-gray-200 bg-white px-2 py-1 text-xs"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeJourney(idx)}
                                    className="p-1 text-red-500 hover:bg-red-100 rounded"
                                >
                                    <Icon icon="solar:trash-bin-trash-bold" className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Trophies & Honors ── */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                        <Icon icon="solar:cup-star-bold" className="w-4 h-4 text-amber-500" />
                        Trophies & Individual Honors
                    </span>
                    <button
                        type="button"
                        onClick={addTrophy}
                        className="px-2.5 py-1 text-xs font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-md transition flex items-center gap-1"
                    >
                        <Icon icon="solar:add-circle-bold" className="w-3.5 h-3.5" />
                        Add Trophy
                    </button>
                </div>

                <div className="space-y-2">
                    {data.trophies.map((tr, idx) => (
                        <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-2.5 bg-amber-50/40 rounded-lg border border-amber-200/60">
                            <input
                                type="text"
                                placeholder="Trophy/Award Title"
                                value={tr.title}
                                onChange={(e) => updateTrophy(idx, "title", e.target.value)}
                                className="rounded border border-amber-200 bg-white px-2 py-1 text-xs font-bold text-gray-800 sm:col-span-2"
                            />
                            <input
                                type="text"
                                placeholder="Year (2024)"
                                value={tr.year}
                                onChange={(e) => updateTrophy(idx, "year", e.target.value)}
                                className="rounded border border-amber-200 bg-white px-2 py-1 text-xs font-mono font-bold text-amber-700"
                            />
                            <div className="flex items-center gap-1">
                                <input
                                    type="text"
                                    placeholder="Competition / Organization"
                                    value={tr.competition}
                                    onChange={(e) => updateTrophy(idx, "competition", e.target.value)}
                                    className="flex-1 rounded border border-amber-200 bg-white px-2 py-1 text-xs"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeTrophy(idx)}
                                    className="p-1 text-red-500 hover:bg-red-100 rounded"
                                >
                                    <Icon icon="solar:trash-bin-trash-bold" className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Notable Records ── */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                        <Icon icon="solar:star-fall-bold" className="w-4 h-4 text-purple-600" />
                        Notable Career Records
                    </span>
                    <button
                        type="button"
                        onClick={addRecord}
                        className="px-2.5 py-1 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-md transition flex items-center gap-1"
                    >
                        <Icon icon="solar:add-circle-bold" className="w-3.5 h-3.5" />
                        Add Record
                    </button>
                </div>

                <div className="space-y-2">
                    {data.records.map((rc, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row gap-2 p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                            <input
                                type="text"
                                placeholder="Record Title"
                                value={rc.title}
                                onChange={(e) => updateRecord(idx, "title", e.target.value)}
                                className="sm:w-1/3 rounded border border-gray-200 bg-white px-2 py-1 text-xs font-semibold"
                            />
                            <input
                                type="text"
                                placeholder="Details / Description"
                                value={rc.recordText}
                                onChange={(e) => updateRecord(idx, "recordText", e.target.value)}
                                className="flex-1 rounded border border-gray-200 bg-white px-2 py-1 text-xs"
                            />
                            <div className="flex items-center gap-1">
                                <input
                                    type="text"
                                    placeholder="Date"
                                    value={rc.date}
                                    onChange={(e) => updateRecord(idx, "date", e.target.value)}
                                    className="w-24 rounded border border-gray-200 bg-white px-2 py-1 text-xs font-mono"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeRecord(idx)}
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

export default PlayerCareerMilestones;
