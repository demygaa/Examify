export type SystemStats = {
    siswa: number;
    guru: number;
    admin: number;
};

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

export type ResourceInfo = {
    cpuPercent: number;
    memory: { used: number; total: number; percent: number };
    storage: { used: number; total: number; percent: number };
};

export type DatabaseInfo = {
    connected: boolean;
    version: string;
    type: string;
    responseMs: number;
};

export type SystemSettingsData = {
    id: string;
    systemName: string;
    maintenanceMode: boolean;
    sessionTimeout: number;
    timezone: string;
    createdAt: string;
    updatedAt: string;
};

export type ActivityStatusValue = "SUCCESS" | "FAILED";

export type ActivityItem = {
    id: string;
    eventType: string;
    description: string;
    status: ActivityStatusValue;
    actor: string | null;
    createdAt: string;
};

export type SystemData = {
    stats: SystemStats;
    server: ServerInfo;
    resources: ResourceInfo;
    database: DatabaseInfo;
    settings: SystemSettingsData;
    activities: ActivityItem[];
};
