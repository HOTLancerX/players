"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import type { PlayerBasicInfoData } from "../ui/PlayerBasicInfoFields";
import type { PlayerSportsStatsData } from "../ui/PlayerSportsStatsFields";
import type { PlayerMilestonesData } from "../ui/PlayerCareerMilestones";
import type { PlayerMediaData } from "../ui/PlayerMediaHighlights";

interface PlayerPageProps {
    data: {
        _id: string;
        title: string;
        slug: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        info: Record<string, string>;
    };
    settings?: Record<string, any>;
    permalinkMap?: Record<string, string>;
    pageData?: {
        categoryAncestors?: { _id: string; title: string; slug: string }[];
    };
}

function safeParse<T>(jsonString: string | undefined, fallback: T): T {
    if (!jsonString) return fallback;
    try {
        return JSON.parse(jsonString);
    } catch {
        return fallback;
    }
}

export function PlayerProfileLayout2({ data, permalinkMap = {}, pageData }: PlayerPageProps) {
    const basicInfo: PlayerBasicInfoData = safeParse(data.info?.player_basic, {
        sportType: "football",
        fullName: data.title || "Player Name",
        nickname: "",
        jerseyNumber: "7",
        position: "Forward / Winger",
        secondaryPosition: "",
        nationality: "England",
        countryCode: "GB",
        birthDate: "1999-03-20",
        birthPlace: "London",
        height: "182 cm",
        weight: "75 kg",
        preferredFoot: "Right",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm medium",
        careerStartDate: "2017-09-01",
        debutMatch: "vs Arsenal (2017)",
        currentTeam: "Camden Tigers FC",
        nationalTeam: "England",
        joinedDate: "2022-01-15",
        contractUntil: "2028-06-30",
        marketValue: "$18,000,000",
    });

    const statsData: PlayerSportsStatsData = safeParse(data.info?.player_stats, {
        activeSport: basicInfo.sportType === "cricket" ? "cricket" : "football",
        football: {
            matchesPlayed: 196,
            minutesPlayed: 15400,
            goals: 98,
            assists: 54,
            shotsOnTarget: 260,
            passAccuracy: 88.0,
            cleanSheets: 0,
            yellowCards: 8,
            redCards: 0,
            tacklesWon: 64,
            penaltiesScored: 12,
            hatTricks: 4,
            trophies: 4,
        },
        cricket: {
            format: "all",
            matchesPlayed: 120,
            innings: 110,
            runsScored: 4950,
            highestScore: "144",
            battingAverage: 48.5,
            strikeRate: 142.0,
            centuries: 12,
            fifties: 28,
            foursCount: 430,
            sixesCount: 140,
            notOuts: 14,
            wicketsTaken: 22,
            bowlingEconomy: 7.8,
            bowlingAverage: 32.1,
            bestBowling: "3/18",
            fiveWicketHauls: 0,
            catches: 62,
            stumpings: 0,
        },
        customStats: [],
        seasonHistory: [],
    });

    const milestones: PlayerMilestonesData = safeParse(data.info?.player_milestones, {
        clubJourney: [],
        trophies: [],
        records: [],
    });

    const media: PlayerMediaData = safeParse(data.info?.player_media, {
        heroBannerUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=80",
        profilePhotoUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
        galleryPhotos: [],
        featuredVideoUrl: "",
        youtubeChannelName: "",
        youtubeChannelUrl: "",
        youtubeJoinedDate: "",
        youtubeSubscribers: "",
        videoClips: [],
        socials: { instagram: "", twitter: "", facebook: "", tiktok: "", transfermarkt: "" },
    });

    const isCricket = basicInfo.sportType === "cricket";
    const description = data.info?.description || "";

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            {/* Header Strip */}
            <div className="bg-white text-slate-900 border-b border-slate-200 py-12 px-6 shadow-2xs">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-28 h-28 rounded-2xl overflow-hidden ring-4 ring-slate-100 bg-slate-100 border border-slate-200 shadow-sm">
                            <img src={media.profilePhotoUrl} alt={data.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="bg-emerald-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase shadow-2xs">
                                    {basicInfo.currentTeam}
                                </span>
                                <span className="text-xs text-slate-500 font-mono font-bold">#{basicInfo.jerseyNumber}</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">{basicInfo.fullName || data.title}</h1>
                            <p className="text-sm text-slate-500 mt-1">{basicInfo.position} • {basicInfo.nationality}</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center min-w-24 shadow-2xs">
                            <div className="text-2xl font-black text-slate-900 font-mono">{!isCricket ? statsData.football.goals : statsData.cricket.runsScored}</div>
                            <div className="text-[11px] font-bold text-slate-400 uppercase">{!isCricket ? "Goals" : "Runs"}</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center min-w-24 shadow-2xs">
                            <div className="text-2xl font-black text-slate-900 font-mono">{!isCricket ? statsData.football.matchesPlayed : statsData.cricket.matchesPlayed}</div>
                            <div className="text-[11px] font-bold text-slate-400 uppercase">Matches</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-bold mb-3 text-slate-900">About {data.title}</h2>
                        {description ? (
                            <div className="prose max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: description }} />
                        ) : (
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Professional athlete competing at top flight tier for {basicInfo.currentTeam}.
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Athlete Details</h3>
                        <div className="text-xs space-y-2">
                            <div className="flex justify-between py-1 border-b border-slate-100">
                                <span className="text-slate-500">Date of Birth</span>
                                <span className="font-semibold text-slate-800">{basicInfo.birthDate}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-100">
                                <span className="text-slate-500">Height / Weight</span>
                                <span className="font-semibold text-slate-800">{basicInfo.height} / {basicInfo.weight}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-100">
                                <span className="text-slate-500">Career Start</span>
                                <span className="font-semibold text-slate-800">{basicInfo.careerStartDate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default PlayerProfileLayout2;
