"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import type { FieldProps } from "@/hook";

export interface PlayerBasicInfoData {
    sportType: "football" | "cricket" | "basketball" | "tennis" | "other";
    fullName: string;
    nickname: string;
    jerseyNumber: string;
    position: string;
    secondaryPosition: string;
    nationality: string;
    countryCode: string;
    birthDate: string;
    birthPlace: string;
    height: string;
    weight: string;
    preferredFoot: string; // Left, Right, Both (Football)
    battingStyle: string; // Right-hand, Left-hand (Cricket)
    bowlingStyle: string; // Right-arm Fast, Left-arm Spin, etc. (Cricket)
    careerStartDate: string;
    debutMatch: string;
    currentTeam: string;
    nationalTeam: string;
    joinedDate: string;
    contractUntil: string;
    marketValue: string;
}

export function PlayerBasicInfoFields({ name, label, value, onChange }: FieldProps) {
    const [data, setData] = useState<PlayerBasicInfoData>({
        sportType: "football",
        fullName: "",
        nickname: "",
        jerseyNumber: "10",
        position: "Forward / Striker",
        secondaryPosition: "Attacking Midfielder",
        nationality: "United Kingdom",
        countryCode: "GB",
        birthDate: "1998-05-15",
        birthPlace: "London, England",
        height: "185 cm",
        weight: "78 kg",
        preferredFoot: "Right",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm fast-medium",
        careerStartDate: "2016-08-01",
        debutMatch: "vs Chelsea (2016)",
        currentTeam: "Camden Tigers FC",
        nationalTeam: "England",
        joinedDate: "2021-07-01",
        contractUntil: "2027-06-30",
        marketValue: "$15,000,000",
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

    const updateField = (key: keyof PlayerBasicInfoData, val: any) => {
        const next = { ...data, [key]: val };
        setData(next);
        onChange(JSON.stringify(next));
    };

    // Calculate age from birthDate
    const calculateAge = (dob: string) => {
        if (!dob) return "";
        const birth = new Date(dob);
        const now = new Date();
        let age = now.getFullYear() - birth.getFullYear();
        const m = now.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
            age--;
        }
        return isNaN(age) ? "" : `${age} yrs`;
    };

    return (
        <div className="flex flex-col gap-4 bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-xs">
            {/* Header & Sport Type Picker */}
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-gray-100 gap-2">
                <label className="text-xs font-bold text-gray-800 flex items-center gap-2">
                    <Icon icon="solar:user-bold" className="w-4 h-4 text-emerald-600" />
                    {label || "Player Bio & Personal Information"}
                </label>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium">Sport:</span>
                    <select
                        value={data.sportType}
                        onChange={(e) => updateField("sportType", e.target.value)}
                        className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-semibold bg-gray-50 text-emerald-700 outline-none focus:border-emerald-500"
                    >
                        <option value="football">⚽ Football (Soccer)</option>
                        <option value="cricket">🏏 Cricket</option>
                        <option value="basketball">🏀 Basketball</option>
                        <option value="tennis">🎾 Tennis</option>
                        <option value="other">🏆 Other Sport</option>
                    </select>
                </div>
            </div>

            {/* Names & Jersey */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700">Full Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Marcus Vance"
                        value={data.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-emerald-500"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700">Nickname / Moniker</label>
                    <input
                        type="text"
                        placeholder="e.g. The Lightning"
                        value={data.nickname}
                        onChange={(e) => updateField("nickname", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-emerald-500"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700">Jersey Number (#)</label>
                    <input
                        type="text"
                        placeholder="e.g. 10"
                        value={data.jerseyNumber}
                        onChange={(e) => updateField("jerseyNumber", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs font-mono font-bold text-emerald-600 outline-none focus:border-emerald-500"
                    />
                </div>
            </div>

            {/* Roles & Positions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700">Primary Position / Role</label>
                    <input
                        type="text"
                        placeholder={data.sportType === "cricket" ? "e.g. Top-order Batsman / All-Rounder" : "e.g. Centre Forward / Striker"}
                        value={data.position}
                        onChange={(e) => updateField("position", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-emerald-500"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700">Secondary Role / Position</label>
                    <input
                        type="text"
                        placeholder={data.sportType === "cricket" ? "e.g. Wicketkeeper / Off-spinner" : "e.g. Left Winger / Second Striker"}
                        value={data.secondaryPosition}
                        onChange={(e) => updateField("secondaryPosition", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-emerald-500"
                    />
                </div>
            </div>

            {/* Birth Info & Nationality */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="space-y-1 sm:col-span-1">
                    <label className="text-[11px] font-semibold text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        value={data.birthDate}
                        onChange={(e) => updateField("birthDate", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-emerald-500"
                    />
                    {data.birthDate && (
                        <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                            Age: {calculateAge(data.birthDate)}
                        </p>
                    )}
                </div>
                <div className="space-y-1 sm:col-span-1">
                    <label className="text-[11px] font-semibold text-gray-700">Place of Birth</label>
                    <input
                        type="text"
                        placeholder="e.g. Manchester, UK"
                        value={data.birthPlace}
                        onChange={(e) => updateField("birthPlace", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-emerald-500"
                    />
                </div>
                <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] font-semibold text-gray-700">Nationality / Country</label>
                    <input
                        type="text"
                        placeholder="e.g. England / Great Britain"
                        value={data.nationality}
                        onChange={(e) => updateField("nationality", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-emerald-500"
                    />
                </div>
            </div>

            {/* Physical Attributes & Playing Style */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-gray-50/70 p-3 rounded-lg border border-gray-100">
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700">Height</label>
                    <input
                        type="text"
                        placeholder="e.g. 185 cm (6ft 1in)"
                        value={data.height}
                        onChange={(e) => updateField("height", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-emerald-500"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700">Weight</label>
                    <input
                        type="text"
                        placeholder="e.g. 78 kg (172 lbs)"
                        value={data.weight}
                        onChange={(e) => updateField("weight", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-emerald-500"
                    />
                </div>

                {data.sportType === "football" ? (
                    <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-semibold text-gray-700">Preferred Foot</label>
                        <select
                            value={data.preferredFoot}
                            onChange={(e) => updateField("preferredFoot", e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-emerald-500"
                        >
                            <option value="Right">Right Foot</option>
                            <option value="Left">Left Foot</option>
                            <option value="Both">Both (Ambidextrous)</option>
                        </select>
                    </div>
                ) : (
                    <>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-gray-700">Batting Style</label>
                            <select
                                value={data.battingStyle}
                                onChange={(e) => updateField("battingStyle", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-emerald-500"
                            >
                                <option value="Right-hand bat">Right-hand bat</option>
                                <option value="Left-hand bat">Left-hand bat</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-gray-700">Bowling Style</label>
                            <input
                                type="text"
                                placeholder="e.g. Right-arm fast / Leg break"
                                value={data.bowlingStyle}
                                onChange={(e) => updateField("bowlingStyle", e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-emerald-500"
                            />
                        </div>
                    </>
                )}
            </div>

            {/* Team Affiliations & Career Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700">Current Club / Team</label>
                    <input
                        type="text"
                        placeholder="e.g. Camden Tigers FC"
                        value={data.currentTeam}
                        onChange={(e) => updateField("currentTeam", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium outline-none focus:border-emerald-500"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700">National Team</label>
                    <input
                        type="text"
                        placeholder="e.g. England Men's Senior Squad"
                        value={data.nationalTeam}
                        onChange={(e) => updateField("nationalTeam", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-emerald-500"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700">Career Start / Debut Date</label>
                    <input
                        type="date"
                        value={data.careerStartDate}
                        onChange={(e) => updateField("careerStartDate", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-emerald-500"
                    />
                </div>
            </div>

            {/* Contract & Debut Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700">Joined Current Club</label>
                    <input
                        type="date"
                        value={data.joinedDate}
                        onChange={(e) => updateField("joinedDate", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-emerald-500"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700">Contract Expiry</label>
                    <input
                        type="date"
                        value={data.contractUntil}
                        onChange={(e) => updateField("contractUntil", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-emerald-500"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700">Estimated Value / Tier</label>
                    <input
                        type="text"
                        placeholder="e.g. $12,500,000 / Grade A"
                        value={data.marketValue}
                        onChange={(e) => updateField("marketValue", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-emerald-500"
                    />
                </div>
            </div>
        </div>
    );
}

export default PlayerBasicInfoFields;
