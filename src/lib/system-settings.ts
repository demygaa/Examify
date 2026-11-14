import { prisma } from "@/src/lib/prisma";
import type { SystemSetting } from "@/src/generated/prisma/client";

const SETTINGS_ID = "main";
const SETTINGS_TTL_MS = 10_000;

let settingsCache: { value: SystemSetting; at: number } | null = null;

export function invalidateSystemSettings(): void {
    settingsCache = null;
}

export async function getSystemSettings(): Promise<SystemSetting> {
    const now = Date.now();

    if (settingsCache && now - settingsCache.at < SETTINGS_TTL_MS) {
        return settingsCache.value;
    }

    const settings = await prisma.systemSetting.upsert({
        where: { id: SETTINGS_ID },
        update: {},
        create: { id: SETTINGS_ID },
    });

    settingsCache = { value: settings, at: now };
    return settings;
}

/** Dipakai proxy: gagal membaca DB tidak boleh mengunci semua user. */
export async function getMaintenanceMode(): Promise<boolean> {
    try {
        const settings = await getSystemSettings();
        return settings.maintenanceMode;
    } catch {
        return false;
    }
}
