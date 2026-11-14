import os from "os";
import si from "systeminformation";
import { prisma } from "@/src/lib/prisma";
import pkg from "../../package.json";

export {
    getSystemSettings,
    getMaintenanceMode,
    invalidateSystemSettings,
} from "@/src/lib/system-settings";

export type ServerInfo = {
    hostname: string;
    platform: string;
    arch: string;
    nodeVersion: string;
    appVersion: string;
    environment: string;
    uptimeSeconds: number;
    startTime: string;
    healthCheckedAt: string;
};

export function collectServerInfo(): ServerInfo {
    const uptimeSeconds = Math.floor(process.uptime());
    const startTime = new Date(
        Date.now() - uptimeSeconds * 1000
    ).toISOString();

    return {
        hostname: os.hostname(),
        platform: `${os.type()} ${os.release()}`,
        arch: os.arch(),
        nodeVersion: process.version,
        appVersion: pkg.version,
        environment: process.env.NODE_ENV ?? "development",
        uptimeSeconds,
        startTime,
        healthCheckedAt: new Date().toISOString(),
    };
}

export type ResourceInfo = {
    cpuPercent: number;
    memory: { used: number; total: number; percent: number };
    storage: { used: number; total: number; percent: number };
};

export async function collectResources(): Promise<ResourceInfo> {
    const [load, mem, fs] = await Promise.all([
        si.currentLoad().catch(() => null),
        si.mem().catch(() => null),
        si.fsSize().catch(() => []),
    ]);

    const cpuPercent = load ? Math.round(load.currentLoad) : 0;

    const memory = mem
        ? {
              used: mem.used,
              total: mem.total,
              percent: mem.total
                  ? Math.round((mem.used / mem.total) * 100)
                  : 0,
          }
        : { used: 0, total: 0, percent: 0 };

    const disk = Array.isArray(fs) && fs.length > 0 ? fs[0] : null;

    const storage = disk
        ? {
              used: disk.used,
              total: disk.size,
              percent: disk.size
                  ? Math.round((disk.used / disk.size) * 100)
                  : 0,
          }
        : { used: 0, total: 0, percent: 0 };

    return { cpuPercent, memory, storage };
}

export type DatabaseInfo = {
    connected: boolean;
    version: string;
    type: string;
    responseMs: number;
};

export async function checkDatabase(): Promise<DatabaseInfo> {
    const startedAt = Date.now();

    try {
        const rows = await prisma.$queryRaw<Array<{ version: string }>>`
            SELECT VERSION() AS version
        `;

        return {
            connected: true,
            version: rows[0]?.version ?? "Tidak diketahui",
            type: "MySQL / MariaDB",
            responseMs: Date.now() - startedAt,
        };
    } catch {
        return {
            connected: false,
            version: "-",
            type: "MySQL / MariaDB",
            responseMs: Date.now() - startedAt,
        };
    }
}

export { writeActivity } from "@/src/lib/activity";

export {
    formatInTimezone,
    resolveTimezone,
} from "@/src/lib/format";

