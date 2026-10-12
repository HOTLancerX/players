"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import type { FieldProps } from "@/hook";

export interface VideoClip {
    title: string;
    videoUrl: string; // YouTube / Vimeo / MP4
    duration: string;
    opponent: string;
    viewsCount: string;
}

export interface PlayerMediaData {
    heroBannerUrl: string;
    profilePhotoUrl: string;
    galleryPhotos: string[];
    featuredVideoUrl: string;
    youtubeChannelName: string;
    youtubeChannelUrl: string;
    youtubeJoinedDate: string;
    youtubeSubscribers: string;
    videoClips: VideoClip[];
    socials: {
        instagram: string;
        twitter: string;
        facebook: string;
        tiktok: string;
        transfermarkt: string;
    };
}

export function PlayerMediaHighlights({ name, label, value, onChange }: FieldProps) {
    const [data, setData] = useState<PlayerMediaData>({
        heroBannerUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=80",
        profilePhotoUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
        galleryPhotos: [
            "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
        ],
        featuredVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        youtubeChannelName: "Marcus Vance Official",
        youtubeChannelUrl: "https://youtube.com/@marcusvance",
        youtubeJoinedDate: "2018-03-12",
        youtubeSubscribers: "1.25M",
        videoClips: [
            { title: "Top 10 Incredible Goals & Skill Moves 2024", videoUrl: "https://youtube.com/watch?v=sample1", duration: "8:45", opponent: "Season Compilation", viewsCount: "2.4M" },
            { title: "Match Highlights: 3-1 Victory in Cup Final", videoUrl: "https://youtube.com/watch?v=sample2", duration: "5:20", opponent: "vs Manchester", viewsCount: "850K" },
            { title: "Post-Match Interview & Golden Boot Celebration", videoUrl: "https://youtube.com/watch?v=sample3", duration: "3:15", opponent: "Press Conference", viewsCount: "410K" },
        ],
        socials: {
            instagram: "https://instagram.com/marcusvance",
            twitter: "https://x.com/marcusvance",
            facebook: "https://facebook.com/marcusvance",
            tiktok: "https://tiktok.com/@marcusvance",
            transfermarkt: "https://transfermarkt.com/marcus-vance",
        },
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

    const updateRoot = (updater: (prev: PlayerMediaData) => PlayerMediaData) => {
        const next = updater(dataRef.current);
        dataRef.current = next;
        setData(next);
        onChange(JSON.stringify(next));
    };

    const updateField = (key: keyof PlayerMediaData, val: any) => {
        updateRoot((prev) => ({ ...prev, [key]: val }));
    };

    const updateSocial = (key: keyof PlayerMediaData["socials"], val: string) => {
        updateRoot((prev) => ({ ...prev, socials: { ...prev.socials, [key]: val } }));
    };

    const addVideoClip = () => {
        updateRoot((prev) => ({
            ...prev,
            videoClips: [...prev.videoClips, { title: "New Match Highlights", videoUrl: "", duration: "4:00", opponent: "vs Opponent", viewsCount: "0" }],
        }));
    };

    const removeVideoClip = (idx: number) => {
        updateRoot((prev) => ({ ...prev, videoClips: prev.videoClips.filter((_, i) => i !== idx) }));
    };

    const updateVideoClip = (idx: number, field: keyof VideoClip, val: string) => {
        updateRoot((prev) => ({
            ...prev,
            videoClips: prev.videoClips.map((item, i) => (i === idx ? { ...item, [field]: val } : item)),
        }));
    };

    return (
        <div className="flex flex-col gap-4 bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <label className="text-xs font-bold text-gray-800 flex items-center gap-2">
                    <Icon icon="solar:videocamera-record-bold" className="w-4 h-4 text-red-600" />
                    {label || "Media, Video Highlights & Channel Info"}
                </label>
            </div>

            {/* Profile & Banner Photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700">Player Profile Photo URL</label>
                    <input
                        type="text"
                        placeholder="https://.../player.jpg"
                        value={data.profilePhotoUrl}
                        onChange={(e) => updateField("profilePhotoUrl", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-red-500"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700">Profile Hero Banner Background URL</label>
                    <input
                        type="text"
                        placeholder="https://.../stadium-action.jpg"
                        value={data.heroBannerUrl}
                        onChange={(e) => updateField("heroBannerUrl", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-red-500"
                    />
                </div>
            </div>

            {/* YouTube Channel Stats */}
            <div className="space-y-3 bg-red-50/40 p-3.5 rounded-xl border border-red-200/60">
                <div className="flex items-center gap-2">
                    <Icon icon="solar:play-circle-bold" className="w-5 h-5 text-red-600" />
                    <span className="text-xs font-bold text-red-950">Official YouTube Channel & Video Hub</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-semibold text-gray-700">Channel Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Marcus Vance Official"
                            value={data.youtubeChannelName}
                            onChange={(e) => updateField("youtubeChannelName", e.target.value)}
                            className="w-full rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-red-500"
                        />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-semibold text-gray-700">Channel URL / Handle</label>
                        <input
                            type="text"
                            placeholder="https://youtube.com/@channel"
                            value={data.youtubeChannelUrl}
                            onChange={(e) => updateField("youtubeChannelUrl", e.target.value)}
                            className="w-full rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-red-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-gray-700">Channel Joined Date</label>
                        <input
                            type="date"
                            value={data.youtubeJoinedDate}
                            onChange={(e) => updateField("youtubeJoinedDate", e.target.value)}
                            className="w-full rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-red-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-gray-700">Subscribers Count</label>
                        <input
                            type="text"
                            placeholder="e.g. 1.25M Subscribers"
                            value={data.youtubeSubscribers}
                            onChange={(e) => updateField("youtubeSubscribers", e.target.value)}
                            className="w-full rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-mono font-bold text-red-600 outline-none focus:border-red-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-gray-700">Featured Video / Trailer URL</label>
                        <input
                            type="text"
                            placeholder="https://youtube.com/watch?v=..."
                            value={data.featuredVideoUrl}
                            onChange={(e) => updateField("featuredVideoUrl", e.target.value)}
                            className="w-full rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-red-500"
                        />
                    </div>
                </div>
            </div>

            {/* Video Clips & Highlights Reel */}
            <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                        <Icon icon="solar:clapperboard-play-bold" className="w-4 h-4 text-indigo-600" />
                        Match Highlights & Video Clips
                    </span>
                    <button
                        type="button"
                        onClick={addVideoClip}
                        className="px-2.5 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition flex items-center gap-1"
                    >
                        <Icon icon="solar:add-circle-bold" className="w-3.5 h-3.5" />
                        Add Video Clip
                    </button>
                </div>

                <div className="space-y-2">
                    {data.videoClips.map((vc, idx) => (
                        <div key={idx} className="grid grid-cols-1 sm:grid-cols-5 gap-2 p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                            <input
                                type="text"
                                placeholder="Clip Title"
                                value={vc.title}
                                onChange={(e) => updateVideoClip(idx, "title", e.target.value)}
                                className="sm:col-span-2 rounded border border-gray-200 bg-white px-2 py-1 text-xs font-medium"
                            />
                            <input
                                type="text"
                                placeholder="YouTube Video URL"
                                value={vc.videoUrl}
                                onChange={(e) => updateVideoClip(idx, "videoUrl", e.target.value)}
                                className="sm:col-span-2 rounded border border-gray-200 bg-white px-2 py-1 text-xs"
                            />
                            <div className="flex items-center gap-1">
                                <input
                                    type="text"
                                    placeholder="Duration"
                                    value={vc.duration}
                                    onChange={(e) => updateVideoClip(idx, "duration", e.target.value)}
                                    className="w-16 rounded border border-gray-200 bg-white px-2 py-1 text-xs font-mono"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeVideoClip(idx)}
                                    className="p-1 text-red-500 hover:bg-red-100 rounded"
                                >
                                    <Icon icon="solar:trash-bin-trash-bold" className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Social Links */}
            <div className="space-y-2.5 pt-3 border-t border-gray-100">
                <span className="text-xs font-semibold text-gray-700">Official Social & Profile Links</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="flex items-center gap-2">
                        <Icon icon="lucide:instagram" className="w-4 h-4 text-pink-600 shrink-0" />
                        <input
                            type="text"
                            placeholder="Instagram URL"
                            value={data.socials.instagram}
                            onChange={(e) => updateSocial("instagram", e.target.value)}
                            className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs outline-none focus:border-pink-500"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Icon icon="lucide:twitter" className="w-4 h-4 text-sky-500 shrink-0" />
                        <input
                            type="text"
                            placeholder="X / Twitter URL"
                            value={data.socials.twitter}
                            onChange={(e) => updateSocial("twitter", e.target.value)}
                            className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs outline-none focus:border-sky-500"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Icon icon="lucide:facebook" className="w-4 h-4 text-blue-600 shrink-0" />
                        <input
                            type="text"
                            placeholder="Facebook URL"
                            value={data.socials.facebook}
                            onChange={(e) => updateSocial("facebook", e.target.value)}
                            className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Icon icon="solar:link-circle-bold" className="w-4 h-4 text-emerald-600 shrink-0" />
                        <input
                            type="text"
                            placeholder="Transfermarkt / Cricinfo Profile URL"
                            value={data.socials.transfermarkt}
                            onChange={(e) => updateSocial("transfermarkt", e.target.value)}
                            className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs outline-none focus:border-emerald-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerMediaHighlights;
