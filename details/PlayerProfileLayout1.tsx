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

function buildUrl(prefix: string, slug: string): string {
    const p = prefix.trim().replace(/^\/+|\/+$/g, "");
    return p ? `/${p}/${slug}` : `/${slug}`;
}

export function PlayerProfileLayout1({ data, permalinkMap = {}, pageData }: PlayerPageProps) {
    const [activeTab, setActiveTab] = useState<"overview" | "stats" | "journey" | "videos" | "achievements" | "gallery">("overview");
    const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

    // Parse structured info fields
    const basicInfo: PlayerBasicInfoData = safeParse(data.info?.player_basic, {
        sportType: "football",
        fullName: data.title || "Player Name",
        nickname: "The Maestro",
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
        bowlingStyle: "Right-arm fast",
        careerStartDate: "2016-08-01",
        debutMatch: "vs Chelsea (2016)",
        currentTeam: "Camden Tigers FC",
        nationalTeam: "England",
        joinedDate: "2021-07-01",
        contractUntil: "2027-06-30",
        marketValue: "$15,000,000",
    });

    const statsData: PlayerSportsStatsData = safeParse(data.info?.player_stats, {
        activeSport: basicInfo.sportType === "cricket" ? "cricket" : "football",
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
            { label: "Man of the Match", value: "32" },
            { label: "Top Speed", value: "34.8 km/h" },
        ],
        seasonHistory: [
            { season: "2024/25", team: "Camden Tigers", competition: "Premier League", matches: 28, primaryStat: "22 Goals", secondaryStat: "9 Assists", rating: "8.4" },
            { season: "2023/24", team: "Camden Tigers", competition: "Championship", matches: 34, primaryStat: "26 Goals", secondaryStat: "12 Assists", rating: "8.6" },
        ],
    });

    const milestones: PlayerMilestonesData = safeParse(data.info?.player_milestones, {
        clubJourney: [
            { years: "2021 - Present", clubName: basicInfo.currentTeam || "Camden Tigers FC", division: "Premier League", appearances: "148", goalsOrRuns: "84 Goals", titles: "2x League Champion" },
            { years: "2018 - 2021", clubName: "North London FC", division: "Championship", appearances: "92", goalsOrRuns: "46 Goals", titles: "1x Cup Winner" },
        ],
        trophies: [
            { title: "Premier Championship", year: "2024", competition: "National League", badgeIcon: "solar:cup-star-bold", description: "League winner with record 92 points" },
            { title: "Golden Boot Top Scorer", year: "2023", competition: "Cup Finals", badgeIcon: "solar:medal-ribbons-star-bold", description: "28 goals in 32 matches" },
        ],
        records: [
            { title: "Fastest Hat-trick in Club History", date: "Oct 2023", recordText: "Scored 3 goals in 6 minutes vs East United" },
        ],
    });

    const defaultImages: string[] = safeParse<string[]>(data.info?.images, []);
    const galleryImages: string[] = safeParse<string[]>(data.info?.gallery, []);
    const mediaInfo = safeParse<Partial<PlayerMediaData>>(data.info?.player_media, {});

    const photo =
        mediaInfo.profilePhotoUrl ||
        (data.info?.images ? safeParse<string[]>(data.info.images, [])[0] : null) ||
        (data.info?.gallery ? safeParse<string[]>(data.info.gallery, [])[0] : null) ||
        (data as any).image ||
        data.info?.image ||
        (data.title?.includes("Pickford")
            ? "https://res.cloudinary.com/dqfdlaanx/image/upload/v1791729920/library/library/1791729917317_Jordan%20Pickford.webp"
            : "");

    const allGalleryPhotos = [...new Set([
        ...galleryImages,
        ...defaultImages,
        ...(mediaInfo.galleryPhotos || []),
    ])].filter(Boolean);

    const media: PlayerMediaData = {
        heroBannerUrl: mediaInfo.heroBannerUrl || photo,
        profilePhotoUrl: photo,
        galleryPhotos: allGalleryPhotos,
        featuredVideoUrl: mediaInfo.featuredVideoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        youtubeChannelName: mediaInfo.youtubeChannelName || `${data.title || "Player"} Official`,
        youtubeChannelUrl: mediaInfo.youtubeChannelUrl || "https://youtube.com",
        youtubeJoinedDate: mediaInfo.youtubeJoinedDate || "2018-03-12",
        youtubeSubscribers: mediaInfo.youtubeSubscribers || "1.25M",
        videoClips: mediaInfo.videoClips || [
            { title: "Top 10 Goals & Match-Winning Moments", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: "8:45", opponent: "Season Compilation", viewsCount: "2.4M" },
            { title: "Career Milestone: 100th Goal Celebration", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: "5:20", opponent: "vs Rivals", viewsCount: "850K" },
        ],
        socials: mediaInfo.socials || {
            instagram: "https://instagram.com",
            twitter: "https://x.com",
            facebook: "https://facebook.com",
            tiktok: "https://tiktok.com",
            transfermarkt: "https://transfermarkt.com",
        },
    };

    const description = data.info?.description || "";
    const categoryAncestors = pageData?.categoryAncestors ?? [];
    const catPrefix = (permalinkMap["player-category"] ?? "player/category").trim().replace(/^\/+|\/+$/g, "");

    const isCricket = basicInfo.sportType === "cricket" || statsData.activeSport === "cricket";

    // Format DOB to friendly string
    const formatDob = (dateStr: string) => {
        if (!dateStr) return "N/A";
        try {
            return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        } catch {
            return dateStr;
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
            {/* ─── Hero Header with Action Backdrop ─── */}
            <div className="relative overflow-hidden bg-white border-b border-slate-200">
                {/* Background Image / Ambient Glow */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10 filter blur-xs mix-blend-luminosity scale-105 pointer-events-none"
                    style={{ backgroundImage: `url(${media.heroBannerUrl})` }}
                />

                {/* Big Jersey Watermark */}
                <div className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 select-none pointer-events-none text-slate-100 font-black text-[160px] md:text-[280px] font-mono leading-none tracking-tighter">
                    #{basicInfo.jerseyNumber || null}
                </div>

                <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-8 pb-12">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap font-medium">
                        <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
                        <span className="text-slate-300">/</span>
                        <Link href={`/${catPrefix}`} className="hover:text-slate-900 transition-colors">Players</Link>
                        {categoryAncestors.map((ancestor) => (
                            <span key={ancestor._id} className="flex items-center gap-1.5">
                                <span className="text-slate-300">/</span>
                                <Link href={buildUrl(catPrefix, ancestor.slug)} className="hover:text-slate-900 transition-colors">
                                    {ancestor.title}
                                </Link>
                            </span>
                        ))}
                        <span className="text-slate-300">/</span>
                        <span className="text-emerald-600 font-semibold">{data.title}</span>
                    </nav>

                    {/* Profile Header Grid */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                            {/* Portrait Avatar */}
                            <div className="relative group shrink-0">
                                <div className="w-36 h-36 md:w-52 md:h-52 rounded-2xl overflow-hidden ring-4 ring-emerald-500/20 shadow-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                                    {media.profilePhotoUrl ? (
                                        <img
                                            src={media.profilePhotoUrl}
                                            alt={data.title}
                                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <Icon icon="solar:user-bold" className="w-20 h-20 text-slate-300" />
                                    )}
                                </div>
                                <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-slate-950 font-black font-mono text-base px-3.5 py-1 rounded-xl shadow-md border-2 border-white">
                                    #{basicInfo.jerseyNumber || "10"}
                                </div>
                            </div>

                            {/* Info & Tags */}
                            <div className="space-y-2.5">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                                        {basicInfo.currentTeam || "Camden Tigers FC"}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                        {basicInfo.position || "Forward"}
                                    </span>
                                    {basicInfo.nationality && (
                                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 flex items-center gap-1.5 border border-slate-200">
                                            <Icon icon="solar:flag-2-bold" className="w-3.5 h-3.5 text-amber-500" />
                                            {basicInfo.nationality}
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
                                    {basicInfo.fullName || data.title}
                                </h1>

                                {basicInfo.nickname && (
                                    <p className="text-sm md:text-base text-slate-500 font-medium italic">
                                        &ldquo;{basicInfo.nickname}&rdquo;
                                    </p>
                                )}

                                {/* Social Links */}
                                <div className="flex items-center justify-center md:justify-start gap-3 pt-1">
                                    {media.socials?.instagram && (
                                        <a href={media.socials.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-pink-600 flex items-center justify-center text-slate-600 hover:text-white transition shadow-2xs border border-slate-200">
                                            <Icon icon="lucide:instagram" className="w-4 h-4" />
                                        </a>
                                    )}
                                    {media.socials?.twitter && (
                                        <a href={media.socials.twitter} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-sky-500 flex items-center justify-center text-slate-600 hover:text-white transition shadow-2xs border border-slate-200">
                                            <Icon icon="lucide:twitter" className="w-4 h-4" />
                                        </a>
                                    )}
                                    {media.socials?.facebook && (
                                        <a href={media.socials.facebook} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-600 flex items-center justify-center text-slate-600 hover:text-white transition shadow-2xs border border-slate-200">
                                            <Icon icon="lucide:facebook" className="w-4 h-4" />
                                        </a>
                                    )}
                                    {media.youtubeChannelUrl && (
                                        <a href={media.youtubeChannelUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-red-600 flex items-center justify-center text-slate-600 hover:text-white transition shadow-2xs border border-slate-200">
                                            <Icon icon="solar:play-circle-bold" className="w-4.5 h-4.5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Top Key Metrics Banner */}
                        <div className="w-full lg:w-auto grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-slate-900">
                            {!isCricket ? (
                                <>
                                    <div className="text-center px-3 border-r border-slate-100 last:border-0">
                                        <div className="text-2xl md:text-3xl font-black font-mono text-emerald-600">
                                            {statsData.football.goals}
                                        </div>
                                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Goals</div>
                                    </div>
                                    <div className="text-center px-3 border-r border-slate-100 last:border-0">
                                        <div className="text-2xl md:text-3xl font-black font-mono text-teal-600">
                                            {statsData.football.assists}
                                        </div>
                                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Assists</div>
                                    </div>
                                    <div className="text-center px-3 border-r border-slate-100 last:border-0">
                                        <div className="text-2xl md:text-3xl font-black font-mono text-slate-900">
                                            {statsData.football.matchesPlayed}
                                        </div>
                                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Matches</div>
                                    </div>
                                    <div className="text-center px-3">
                                        <div className="text-2xl md:text-3xl font-black font-mono text-amber-500">
                                            {statsData.football.trophies || milestones.trophies.length}
                                        </div>
                                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Trophies</div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-center px-3 border-r border-slate-100 last:border-0">
                                        <div className="text-2xl md:text-3xl font-black font-mono text-amber-500">
                                            {statsData.cricket.runsScored}
                                        </div>
                                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Runs</div>
                                    </div>
                                    <div className="text-center px-3 border-r border-slate-100 last:border-0">
                                        <div className="text-2xl md:text-3xl font-black font-mono text-emerald-600">
                                            {statsData.cricket.battingAverage}
                                        </div>
                                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average</div>
                                    </div>
                                    <div className="text-center px-3 border-r border-slate-100 last:border-0">
                                        <div className="text-2xl md:text-3xl font-black font-mono text-indigo-600">
                                            {statsData.cricket.foursCount}
                                        </div>
                                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">4s Hit</div>
                                    </div>
                                    <div className="text-center px-3">
                                        <div className="text-2xl md:text-3xl font-black font-mono text-rose-500">
                                            {statsData.cricket.sixesCount}
                                        </div>
                                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">6s Hit</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Navigation Tab Bar */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 border-t border-slate-200">
                    <div className="flex items-center gap-2 md:gap-4 overflow-x-auto py-3 no-scrollbar text-xs md:text-sm font-bold">
                        <button
                            type="button"
                            onClick={() => setActiveTab("overview")}
                            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 shrink-0 border ${activeTab === "overview" ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-sm font-extrabold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200 shadow-2xs bg-white"}`}
                        >
                            <Icon icon="solar:user-bold" className="w-4 h-4" />
                            Overview & Bio
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("stats")}
                            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 shrink-0 border ${activeTab === "stats" ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-sm font-extrabold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200 shadow-2xs bg-white"}`}
                        >
                            <Icon icon="solar:chart-square-bold" className="w-4 h-4" />
                            Match Statistics
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("journey")}
                            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 shrink-0 border ${activeTab === "journey" ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-sm font-extrabold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200 shadow-2xs bg-white"}`}
                        >
                            <Icon icon="solar:transfer-horizontal-bold" className="w-4 h-4" />
                            Club Journey
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("videos")}
                            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 shrink-0 border ${activeTab === "videos" ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-sm font-extrabold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200 shadow-2xs bg-white"}`}
                        >
                            <Icon icon="solar:videocamera-record-bold" className="w-4 h-4" />
                            Video Highlights
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("achievements")}
                            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 shrink-0 border ${activeTab === "achievements" ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-sm font-extrabold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200 shadow-2xs bg-white"}`}
                        >
                            <Icon icon="solar:cup-star-bold" className="w-4 h-4" />
                            Trophies & Records
                        </button>
                        {media.galleryPhotos.length > 0 && (
                            <button
                                type="button"
                                onClick={() => setActiveTab("gallery")}
                                className={`px-4 py-2 rounded-xl transition flex items-center gap-2 shrink-0 border ${activeTab === "gallery" ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-sm font-extrabold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200 shadow-2xs bg-white"}`}
                            >
                                <Icon icon="solar:gallery-bold" className="w-4 h-4" />
                                Action Gallery
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ─── Main Content Body ─── */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
                {/* TAB 1: OVERVIEW & BIO */}
                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left 2 Cols: Bio Narrative & Match Intel */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Bio Card */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2.5">
                                    <Icon icon="solar:document-text-bold" className="w-5 h-5 text-emerald-600" />
                                    Player Biography & Profile
                                </h2>
                                {description ? (
                                    <div
                                        className="prose max-w-none text-slate-700 leading-relaxed description"
                                        dangerouslySetInnerHTML={{ __html: description }}
                                    />
                                ) : (
                                    <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                                        {basicInfo.fullName || data.title} is an elite {basicInfo.position} currently playing for {basicInfo.currentTeam || "the club"}. Known for clinical finishing, tactical intelligence, and explosive agility, {basicInfo.fullName || data.title} began professional play on {formatDob(basicInfo.careerStartDate)} making an unforgettable debut {basicInfo.debutMatch}.
                                    </p>
                                )}
                            </div>

                            {/* Playing Style & Capabilities */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2.5">
                                    <Icon icon="solar:lightning-bold" className="w-5 h-5 text-amber-500" />
                                    Playing Style & Key Strengths
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                                        <div className="text-xs font-bold text-slate-500 mb-1">Primary Foot / Style</div>
                                        <div className="text-base font-bold text-slate-900">
                                            {!isCricket ? basicInfo.preferredFoot + " Footed" : basicInfo.battingStyle}
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                                        <div className="text-xs font-bold text-slate-500 mb-1">Secondary Capability</div>
                                        <div className="text-base font-bold text-slate-900">
                                            {!isCricket ? basicInfo.secondaryPosition || "Playmaker" : basicInfo.bowlingStyle || "Off-spin"}
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                                        <div className="text-xs font-bold text-slate-500 mb-1">Career Debut</div>
                                        <div className="text-base font-bold text-slate-900">
                                            {formatDob(basicInfo.careerStartDate)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Col: Personal Matrix Card */}
                        <div className="space-y-6">
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
                                <h3 className="text-base font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                                    <Icon icon="solar:user-id-bold" className="w-4 h-4 text-emerald-600" />
                                    Personal File
                                </h3>

                                <div className="space-y-3 text-xs md:text-sm">
                                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                                        <span className="text-slate-500 font-medium">Full Name</span>
                                        <span className="text-slate-900 font-semibold text-right">{basicInfo.fullName || data.title}</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                                        <span className="text-slate-500 font-medium">Date of Birth</span>
                                        <span className="text-slate-900 font-semibold">{formatDob(basicInfo.birthDate)}</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                                        <span className="text-slate-500 font-medium">Place of Birth</span>
                                        <span className="text-slate-900 font-semibold">{basicInfo.birthPlace || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                                        <span className="text-slate-500 font-medium">Nationality</span>
                                        <span className="text-slate-900 font-semibold">{basicInfo.nationality || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                                        <span className="text-slate-500 font-medium">Height</span>
                                        <span className="text-slate-900 font-semibold">{basicInfo.height || "185 cm"}</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                                        <span className="text-slate-500 font-medium">Weight</span>
                                        <span className="text-slate-900 font-semibold">{basicInfo.weight || "78 kg"}</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                                        <span className="text-slate-500 font-medium">Current Club</span>
                                        <span className="text-emerald-700 font-bold">{basicInfo.currentTeam || "Camden Tigers"}</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                                        <span className="text-slate-500 font-medium">National Team</span>
                                        <span className="text-slate-900 font-semibold">{basicInfo.nationalTeam || "National Squad"}</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                                        <span className="text-slate-500 font-medium">Joined Club</span>
                                        <span className="text-slate-700 font-medium">{formatDob(basicInfo.joinedDate)}</span>
                                    </div>
                                    <div className="flex justify-between py-1.5">
                                        <span className="text-slate-500 font-medium">Contract Until</span>
                                        <span className="text-amber-600 font-bold font-mono">{formatDob(basicInfo.contractUntil)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* YouTube Channel Stats Box */}
                            {media.youtubeChannelName && (
                                <div className="bg-red-50/70 border border-red-200 rounded-2xl p-6 shadow-xs">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
                                            <Icon icon="solar:play-circle-bold" className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-900 leading-tight">{media.youtubeChannelName}</h4>
                                            <p className="text-xs text-red-600 font-semibold">{media.youtubeSubscribers || "Official Channel"}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-600 mb-4">
                                        Channel joined on {formatDob(media.youtubeJoinedDate)}. Watch official highlights, training vlogs, and behind-the-scenes moments.
                                    </p>
                                    <a
                                        href={media.youtubeChannelUrl || "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center justify-center w-full px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition gap-2 shadow-sm"
                                    >
                                        <Icon icon="solar:link-circle-bold" className="w-4 h-4" />
                                        Subscribe & Watch Highlights
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* TAB 2: DETAILED MATCH STATISTICS */}
                {activeTab === "stats" && (
                    <div className="space-y-8">
                        {!isCricket ? (
                            /* Football Deep Dive */
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
                                    <div className="text-xs font-bold text-slate-500 uppercase">Goals Scored</div>
                                    <div className="text-3xl font-black font-mono text-emerald-600 mt-2">{statsData.football.goals}</div>
                                    <div className="text-[11px] text-slate-400 mt-1">{(statsData.football.goals / Math.max(statsData.football.matchesPlayed, 1)).toFixed(2)} per game</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
                                    <div className="text-xs font-bold text-slate-500 uppercase">Assists</div>
                                    <div className="text-3xl font-black font-mono text-teal-600 mt-2">{statsData.football.assists}</div>
                                    <div className="text-[11px] text-slate-400 mt-1">{(statsData.football.assists / Math.max(statsData.football.matchesPlayed, 1)).toFixed(2)} per game</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
                                    <div className="text-xs font-bold text-slate-500 uppercase">Shots On Target</div>
                                    <div className="text-3xl font-black font-mono text-slate-900 mt-2">{statsData.football.shotsOnTarget}</div>
                                    <div className="text-[11px] text-slate-400 mt-1">Total Attempts</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
                                    <div className="text-xs font-bold text-slate-500 uppercase">Pass Accuracy</div>
                                    <div className="text-3xl font-black font-mono text-amber-600 mt-2">{statsData.football.passAccuracy}%</div>
                                    <div className="text-[11px] text-slate-400 mt-1">Completion rate</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
                                    <div className="text-xs font-bold text-slate-500 uppercase">Hat-Tricks</div>
                                    <div className="text-3xl font-black font-mono text-indigo-600 mt-2">{statsData.football.hatTricks}</div>
                                    <div className="text-[11px] text-slate-400 mt-1">Match Balls</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
                                    <div className="text-xs font-bold text-slate-500 uppercase">Discipline</div>
                                    <div className="text-2xl font-black font-mono text-amber-600 mt-2">
                                        {statsData.football.yellowCards}🟨 {statsData.football.redCards}🟥
                                    </div>
                                    <div className="text-[11px] text-slate-400 mt-1">Cards issued</div>
                                </div>
                            </div>
                        ) : (
                            /* Cricket Deep Dive */
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
                                    <div className="text-xs font-bold text-slate-500 uppercase">Total Runs</div>
                                    <div className="text-3xl font-black font-mono text-amber-600 mt-2">{statsData.cricket.runsScored}</div>
                                    <div className="text-[11px] text-slate-400 mt-1">HS: {statsData.cricket.highestScore}</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
                                    <div className="text-xs font-bold text-slate-500 uppercase">Batting Avg</div>
                                    <div className="text-3xl font-black font-mono text-emerald-600 mt-2">{statsData.cricket.battingAverage}</div>
                                    <div className="text-[11px] text-slate-400 mt-1">Innings: {statsData.cricket.innings}</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
                                    <div className="text-xs font-bold text-slate-500 uppercase">Strike Rate</div>
                                    <div className="text-3xl font-black font-mono text-cyan-600 mt-2">{statsData.cricket.strikeRate}</div>
                                    <div className="text-[11px] text-slate-400 mt-1">Runs/100 Balls</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
                                    <div className="text-xs font-bold text-slate-500 uppercase">Boundaries (4s)</div>
                                    <div className="text-3xl font-black font-mono text-indigo-600 mt-2">{statsData.cricket.foursCount}</div>
                                    <div className="text-[11px] text-slate-400 mt-1">Fours hit</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
                                    <div className="text-xs font-bold text-slate-500 uppercase">Maximums (6s)</div>
                                    <div className="text-3xl font-black font-mono text-rose-600 mt-2">{statsData.cricket.sixesCount}</div>
                                    <div className="text-[11px] text-slate-400 mt-1">Sixes hit</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
                                    <div className="text-xs font-bold text-slate-500 uppercase">100s / 50s</div>
                                    <div className="text-2xl font-black font-mono text-slate-900 mt-2">
                                        {statsData.cricket.centuries} / {statsData.cricket.fifties}
                                    </div>
                                    <div className="text-[11px] text-slate-400 mt-1">Milestones</div>
                                </div>
                            </div>
                        )}

                        {/* Season By Season Table */}
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                            <div className="p-6 border-b border-slate-200">
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <Icon icon="solar:calendar-date-bold" className="w-5 h-5 text-emerald-600" />
                                    Season-by-Season Performance Record
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-xs md:text-sm">
                                    <thead>
                                        <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] tracking-wider border-b border-slate-200">
                                            <th className="py-3 px-4 md:px-6">Season</th>
                                            <th className="py-3 px-4">Club / Team</th>
                                            <th className="py-3 px-4">Competition</th>
                                            <th className="py-3 px-4 text-center">Matches</th>
                                            <th className="py-3 px-4 font-bold text-emerald-600">Primary Stats</th>
                                            <th className="py-3 px-4">Secondary</th>
                                            <th className="py-3 px-4 md:px-6 text-right">Rating</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 font-medium">
                                        {statsData.seasonHistory.map((s, idx) => (
                                             <tr key={idx} className="hover:bg-slate-50/80 transition">
                                                <td className="py-3.5 px-4 md:px-6 font-mono font-bold text-slate-900">{s.season}</td>
                                                <td className="py-3.5 px-4 text-slate-700">{s.team}</td>
                                                <td className="py-3.5 px-4 text-slate-500">{s.competition}</td>
                                                <td className="py-3.5 px-4 text-center font-mono text-slate-800">{s.matches}</td>
                                                <td className="py-3.5 px-4 font-bold font-mono text-emerald-600">{s.primaryStat}</td>
                                                <td className="py-3.5 px-4 text-slate-600 font-mono">{s.secondaryStat}</td>
                                                <td className="py-3.5 px-4 md:px-6 text-right font-mono font-bold text-amber-500">{s.rating} ★</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 3: CLUB JOURNEY & TRANSFERS */}
                {activeTab === "journey" && (
                    <div className="space-y-6">
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2.5">
                                <Icon icon="solar:transfer-horizontal-bold" className="w-5 h-5 text-emerald-600" />
                                Career Journey & Team Affiliations
                            </h3>

                            <div className="relative pl-6 md:pl-8 border-l-2 border-emerald-500/40 space-y-8">
                                {milestones.clubJourney.map((club, idx) => (
                                    <div key={idx} className="relative group">
                                        <div className="absolute -left-7.75 md:-left-9.75 top-1.5 w-4 h-4 rounded-full bg-white border-4 border-emerald-500 group-hover:scale-125 transition-transform" />
                                        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                                <h4 className="text-base md:text-lg font-black text-slate-900">{club.clubName}</h4>
                                                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                                                    {club.years}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-200">
                                                <div>
                                                    <span className="block text-slate-400 font-medium">Division</span>
                                                    <span className="text-slate-800 font-semibold">{club.division}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-slate-400 font-medium">Appearances</span>
                                                    <span className="text-slate-900 font-mono font-bold">{club.appearances}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-slate-400 font-medium">Stats</span>
                                                    <span className="text-emerald-600 font-mono font-bold">{club.goalsOrRuns}</span>
                                                </div>
                                            </div>
                                            {club.titles && (
                                                <div className="mt-3 text-xs font-semibold text-amber-600 flex items-center gap-1.5">
                                                    <Icon icon="solar:cup-star-bold" className="w-4 h-4" />
                                                    {club.titles}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 4: VIDEO HIGHLIGHTS & MEDIA */}
                {activeTab === "videos" && (
                    <div className="space-y-8">
                        {/* Featured Video Player */}
                        {media.featuredVideoUrl && (
                            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden p-6 shadow-xs">
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Icon icon="solar:clapperboard-play-bold" className="w-5 h-5 text-red-600" />
                                    Featured Highlights & Showcase
                                </h3>
                                <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200">
                                    <iframe
                                        src={media.featuredVideoUrl.replace("watch?v=", "embed/")}
                                        title="Player Highlights"
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        )}

                        {/* Video Clips Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {media.videoClips.map((clip, idx) => (
                                <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:border-slate-300 transition flex flex-col justify-between shadow-xs">
                                    <div className="p-5 space-y-3">
                                        <div className="flex items-center justify-between text-xs text-slate-500">
                                            <span className="font-semibold text-red-600 flex items-center gap-1">
                                                <Icon icon="solar:play-circle-bold" className="w-4 h-4" />
                                                {clip.opponent || "Highlights"}
                                            </span>
                                            <span className="font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">{clip.duration}</span>
                                        </div>
                                        <h4 className="text-sm md:text-base font-bold text-slate-900 group-hover:text-emerald-600 transition leading-snug">
                                            {clip.title}
                                        </h4>
                                        <p className="text-xs text-slate-400 font-medium">Views: {clip.viewsCount || "500K+"}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                                        <a
                                            href={clip.videoUrl || media.featuredVideoUrl || "#"}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition"
                                        >
                                            Watch Full Match Clip
                                            <Icon icon="solar:arrow-right-up-bold" className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 5: ACHIEVEMENTS & RECORDS */}
                {activeTab === "achievements" && (
                    <div className="space-y-8">
                        {/* Trophies Grid */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2.5">
                                <Icon icon="solar:cup-star-bold" className="w-5 h-5 text-amber-500" />
                                Trophy Showcase & Individual Awards
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {milestones.trophies.map((tr, idx) => (
                                    <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-xl hover:border-amber-400 transition group">
                                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                                            <Icon icon={tr.badgeIcon || "solar:cup-star-bold"} className="w-6 h-6" />
                                        </div>
                                        <div className="text-xs font-mono font-bold text-amber-600 mb-1">{tr.year}</div>
                                        <h4 className="text-base font-bold text-slate-900 mb-1">{tr.title}</h4>
                                        <p className="text-xs text-slate-600 font-medium">{tr.competition}</p>
                                        {tr.description && (
                                            <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-200">{tr.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Records & Milestones */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
                            <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2.5">
                                <Icon icon="solar:star-fall-bold" className="w-5 h-5 text-purple-600" />
                                Official Career Records
                            </h3>
                            <div className="space-y-3">
                                {milestones.records.map((rc, idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-2">
                                        <div>
                                            <h5 className="text-sm font-bold text-slate-900">{rc.title}</h5>
                                            <p className="text-xs text-slate-600 mt-0.5">{rc.recordText}</p>
                                        </div>
                                        <span className="text-xs font-mono text-purple-700 font-semibold shrink-0 bg-purple-50 px-2.5 py-1 rounded border border-purple-200 self-start md:self-auto">
                                            {rc.date}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 6: ACTION GALLERY */}
                {activeTab === "gallery" && media.galleryPhotos.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {media.galleryPhotos.map((photoUrl, idx) => (
                            <div key={idx} className="aspect-4/3 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs group relative">
                                <img
                                    src={photoUrl}
                                    alt={`Action shot ${idx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                                        <Icon icon="solar:eye-bold" className="w-4 h-4 text-emerald-400" />
                                        Match Action Photo #{idx + 1}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default PlayerProfileLayout1;
