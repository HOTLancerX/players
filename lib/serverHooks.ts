/**
 * plugin/players/lib/serverHooks.ts — Server-only hook registration for Players plugin.
 *
 * Auto-discovered by hook/serverDataHooks.ts via require.context.
 * Registers data providers for player and player-category content types.
 */

import { registerServerDataHook } from "@/hook/serverDataHooks";
import mongoose from "mongoose";
import Post from "@/models/post";
import PostInfo from "@/models/post_info";
import Cat from "@/models/cat";
import Template from "@/models/template";

export interface PlayerCategoryPageData {
    posts: any[];
    subCats: { _id: string; title: string; slug: string }[];
    ancestors: { _id: string; title: string; slug: string }[];
    activeBox: { label: string; pluginNx: string } | null;
}

async function getDescendantIds(catId: string): Promise<any[]> {
    const rawIds = [String(catId)];
    const queue = [String(catId)];
    while (queue.length > 0) {
        const parentId = queue.shift()!;
        const parentQueries: any[] = [parentId];
        if (mongoose.Types.ObjectId.isValid(parentId)) {
            parentQueries.push(new mongoose.Types.ObjectId(parentId));
        }
        const children = (await Cat.find({ parentId: { $in: parentQueries } })
            .select("_id")
            .lean()) as any[];
        for (const c of children) {
            rawIds.push(String(c._id));
            queue.push(String(c._id));
        }
    }
    const result: any[] = [];
    for (const id of rawIds) {
        result.push(id);
        if (mongoose.Types.ObjectId.isValid(id)) {
            result.push(new mongoose.Types.ObjectId(id));
        }
    }
    return result;
}

async function buildAncestorChain(catId: string) {
    const chain: { _id: string; title: string; slug: string }[] = [];
    if (!mongoose.Types.ObjectId.isValid(catId)) return chain;
    let current: any = await Cat.findById(catId).lean();
    while (current) {
        chain.unshift({ _id: String(current._id), title: current.title ?? "", slug: current.slug ?? "" });
        if (!current.parentId) break;
        current = await Cat.findById(current.parentId).lean();
    }
    return chain;
}

async function getActivePlayerBoxTemplate() {
    const doc = (await Template.findOne({ type: "player-box", isDefault: true }).lean()) as any;
    if (!doc) return null;
    return { label: doc.label as string, pluginNx: doc.pluginNx as string };
}

async function getPlayerCategoryPageData(catId: string, _slug: string): Promise<PlayerCategoryPageData> {
    const allCatIds = await getDescendantIds(catId);

    const rawPosts = (await Post.find({
        category: { $in: allCatIds },
        type: "player",
        status: { $ne: "trash" },
    }).sort({ createdAt: -1 }).lean()) as any[];

    const infoRecords =
        rawPosts.length > 0
            ? ((await PostInfo.find({ postId: { $in: rawPosts.map((p: any) => p._id) } }).lean()) as any[])
            : [];

    const infoByPost: Record<string, Record<string, string>> = {};
    for (const r of infoRecords) {
        const key = String(r.postId);
        if (!infoByPost[key]) infoByPost[key] = {};
        infoByPost[key][r.name] = r.value;
    }

    const posts = rawPosts.map((p: any) => ({
        _id: String(p._id),
        title: p.title ?? "",
        slug: p.slug ?? "",
        category: p.category ? String(p.category) : "",
        createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : "",
        info: infoByPost[String(p._id)] ?? {},
    }));

    const parentQueries: any[] = [catId];
    if (mongoose.Types.ObjectId.isValid(catId)) {
        parentQueries.push(new mongoose.Types.ObjectId(catId));
    }

    const rawSubCats = (await Cat.find({
        parentId: { $in: parentQueries },
        type: "player-category",
        status: { $ne: "trash" },
    }).lean()) as any[];

    const subCats = rawSubCats.map((c: any) => ({
        _id: String(c._id),
        title: c.title ?? "",
        slug: c.slug ?? "",
    }));

    const [ancestors, activeBox] = await Promise.all([
        buildAncestorChain(catId),
        getActivePlayerBoxTemplate(),
    ]);

    return { posts, subCats, ancestors, activeBox };
}

registerServerDataHook("player-category", getPlayerCategoryPageData);

registerServerDataHook("player", async (_id, _slug, data) => {
    if (!data?.category) return { categoryAncestors: [] };
    const chain: { _id: string; title: string; slug: string }[] = [];
    let current: any = await Cat.findById(data.category).lean();
    while (current) {
        chain.unshift({ _id: String(current._id), title: current.title ?? "", slug: current.slug ?? "" });
        if (!current.parentId) break;
        current = await Cat.findById(current.parentId).lean();
    }
    return { categoryAncestors: chain };
});
