const TIMEZONE_MAP: Record<string, string> = {
    WIB: "Asia/Jakarta",
    WITA: "Asia/Makassar",
    WIT: "Asia/Jayapura",
};

export function resolveTimezone(tz: string): string {
    return TIMEZONE_MAP[tz] ?? "Asia/Jakarta";
}

export function formatInTimezone(
    value: string | Date,
    tz: string
): string {
    const date = typeof value === "string" ? new Date(value) : value;

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return new Intl.DateTimeFormat("id-ID", {
        timeZone: resolveTimezone(tz),
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

export function formatBytes(bytes: number): string {
    if (!bytes || bytes <= 0) {
        return "0 B";
    }

    const units = ["B", "KB", "MB", "GB", "TB"];
    const index = Math.min(
        units.length - 1,
        Math.floor(Math.log(bytes) / Math.log(1024))
    );
    const value = bytes / Math.pow(1024, index);

    return `${value.toFixed(index === 0 || value >= 100 ? 0 : 1)} ${units[index]}`;
}

export function formatUptime(seconds: number): string {
    const total = Math.max(0, Math.floor(seconds));
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);

    if (days > 0) {
        return `${days} hari, ${hours} jam`;
    }

    if (hours > 0) {
        return `${hours} jam, ${minutes} menit`;
    }

    return `${minutes} menit`;
}
