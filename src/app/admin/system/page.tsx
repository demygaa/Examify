"use client";

import { useEffect, useState } from "react";
import StatisticCarDashboardAdmin from "@/src/components/admin/dashboard/StatisticDashboardAdmin";
import HeaderAdmmin from "@/src/components/admin/HeaderAdmin";
import ActivityLogDrawer from "@/src/components/admin/system/ActivityLogDrawer";
import RecentActivity from "@/src/components/admin/system/ActivitySystem";
import DatabaseStatus from "@/src/components/admin/system/DatabaseStatus";
import SystemConfiguration from "@/src/components/admin/system/Maintenance";
import MaintenanceActions, {
    type MaintenanceAction,
} from "@/src/components/admin/system/MaintenanceActions";
import ResourceUse from "@/src/components/admin/system/ResourceUse";
import ServerInformation from "@/src/components/admin/system/ServerInformation";
import StatisticCardSistem from "@/src/components/admin/system/StatisticSistem";
import type { SystemData } from "@/src/components/admin/system/types";
import {
    AppWindow,
    Database,
    RefreshCcw,
    Server,
    Users,
} from "lucide-react";

type SettingsPayload = {
    systemName: string;
    maintenanceMode: boolean;
    sessionTimeout: number;
    timezone: string;
};

type Feedback = {
    message: string;
    type: "success" | "error";
};

export default function SystemPage() {
    const [data, setData] = useState<SystemData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    const [savingSettings, setSavingSettings] = useState(false);
    const [settingsFeedback, setSettingsFeedback] =
        useState<Feedback | null>(null);

    const [testing, setTesting] = useState(false);
    const [dbFeedback, setDbFeedback] = useState<Feedback | null>(null);

    const [actionBusy, setActionBusy] = useState<MaintenanceAction | null>(
        null
    );
    const [actionFeedback, setActionFeedback] =
        useState<Feedback | null>(null);

    const [logOpen, setLogOpen] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            setLoading(true);
            setError("");

            try {
                const res = await fetch("/api/admin/system", {
                    cache: "no-store",
                });
                const json = await res.json();

                if (cancelled) return;

                if (!res.ok || !json.success) {
                    throw new Error(
                        json.message ?? "Gagal mengambil data sistem"
                    );
                }

                setData(json.data);
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Terjadi kesalahan jaringan"
                    );
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        void fetchData();

        return () => {
            cancelled = true;
        };
    }, [refreshKey]);

    async function saveSettings(payload: SettingsPayload) {
        setSavingSettings(true);
        setSettingsFeedback(null);

        try {
            const res = await fetch("/api/admin/system/settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const json = await res.json();

            if (!res.ok || !json.success) {
                throw new Error(json.message ?? "Gagal menyimpan pengaturan");
            }

            setSettingsFeedback({
                message: json.message ?? "Pengaturan berhasil disimpan",
                type: "success",
            });
            setRefreshKey((key) => key + 1);
        } catch (err) {
            setSettingsFeedback({
                message:
                    err instanceof Error
                        ? err.message
                        : "Terjadi kesalahan jaringan",
                type: "error",
            });
        } finally {
            setSavingSettings(false);
        }
    }

    async function testConnection() {
        setTesting(true);
        setDbFeedback(null);

        try {
            const res = await fetch("/api/admin/system/ping", {
                method: "POST",
            });
            const json = await res.json();

            setDbFeedback({
                message:
                    json.message ??
                    (json.success
                        ? "Koneksi database berhasil"
                        : "Koneksi database gagal"),
                type: json.success ? "success" : "error",
            });
            setRefreshKey((key) => key + 1);
        } catch {
            setDbFeedback({
                message: "Terjadi kesalahan jaringan",
                type: "error",
            });
        } finally {
            setTesting(false);
        }
    }

    async function runAction(action: MaintenanceAction) {
        setActionBusy(action);
        setActionFeedback(null);

        try {
            const res = await fetch("/api/admin/system/actions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action }),
            });
            const json = await res.json();

            if (!res.ok || !json.success) {
                throw new Error(json.message ?? "Aksi gagal dijalankan");
            }

            setActionFeedback({
                message: json.message ?? "Aksi berhasil dijalankan",
                type: "success",
            });
            setRefreshKey((key) => key + 1);
        } catch (err) {
            setActionFeedback({
                message:
                    err instanceof Error
                        ? err.message
                        : "Terjadi kesalahan jaringan",
                type: "error",
            });
        } finally {
            setActionBusy(null);
        }
    }

    if (!data) {
        return (
            <div className="flex flex-col gap-[20px]">
                <HeaderAdmmin
                    title="Sistem"
                    sec="Monitor dan konfigurasi sistem"
                />

                <div className="bg-white border border-slate-300 rounded-xl shadow-sm p-10 text-center text-sm text-slate-600">
                    {loading
                        ? "Memuat data sistem..."
                        : error || "Data sistem tidak tersedia."}

                    {!loading && (
                        <button
                            type="button"
                            onClick={() => setRefreshKey((key) => key + 1)}
                            className="mt-4 block mx-auto rounded-md border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
                        >
                            Coba Lagi
                        </button>
                    )}
                </div>
            </div>
        );
    }

    const { timezone } = data.settings;

    return (
        <div className="flex flex-col gap-[20px]">
            <div className="flex flex-row justify-between">
                <HeaderAdmmin
                    title="Sistem"
                    sec="Monitor dan konfigurasi sistem"
                />
                <button
                    type="button"
                    onClick={() => setRefreshKey((key) => key + 1)}
                    disabled={loading}
                    className="flex flex-row gap-2 px-2 py-2 border border-slate-300 rounded-xl shadow-sm bg-white w-fit items-center justify-center disabled:opacity-60"
                >
                    <RefreshCcw
                        size={20}
                        className={loading ? "animate-spin" : ""}
                    />
                    <p>Refresh Data</p>
                </button>
            </div>

            <div className="flex flex-row gap-[20px]">
                <StatisticCardSistem
                    judul="Server Status"
                    icon={Server}
                    status="Online"
                    online
                />
                <StatisticCardSistem
                    judul="Database"
                    icon={Database}
                    status={data.database.connected ? "Connected" : "Terputus"}
                    online={data.database.connected}
                />
                <StatisticCardSistem
                    judul="Application"
                    icon={AppWindow}
                    status="Beroperasi"
                    online
                />
                <StatisticCarDashboardAdmin
                    title="STUDENT"
                    icon={Users}
                    value={String(data.stats.siswa)}
                />
            </div>

            <div className="flex flex-row gap-[20px] w-full">
                <div className="w-full flex flex-col gap-[20px]">
                    <ServerInformation info={data.server} timezone={timezone} />

                    <div className="flex flex-row gap-[20px] w-full">
                        <ResourceUse resources={data.resources} />
                        <DatabaseStatus
                            database={data.database}
                            onTest={testConnection}
                            testing={testing}
                            message={dbFeedback?.message}
                        />
                    </div>

                    <RecentActivity
                        data={data.activities}
                        timezone={timezone}
                        onShowAll={() => setLogOpen(true)}
                    />
                </div>

                <div className="flex flex-col gap-[20px] sticky top-[20px]">
                    <SystemConfiguration
                        key={data.settings.updatedAt}
                        settings={data.settings}
                        saving={savingSettings}
                        message={settingsFeedback?.message}
                        messageType={settingsFeedback?.type}
                        onSave={saveSettings}
                    />
                    <MaintenanceActions
                        busy={actionBusy}
                        message={actionFeedback?.message}
                        messageType={actionFeedback?.type}
                        onAction={runAction}
                    />
                </div>
            </div>

            <ActivityLogDrawer
                open={logOpen}
                onClose={() => setLogOpen(false)}
                timezone={timezone}
            />
        </div>
    );
}
