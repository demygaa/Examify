import { Server, Database, Cpu, Circle, Users } from "lucide-react";

type StatusTone = "success" | "warning" | "danger";

const TONE_CLASSES: Record<
    StatusTone,
    { badge: string; dot: string; text: string }
> = {
    success: {
        badge: "bg-green-100",
        dot: "text-emerald-500",
        text: "text-green-700",
    },
    warning: {
        badge: "bg-yellow-100",
        dot: "text-yellow-500",
        text: "text-yellow-700",
    },
    danger: {
        badge: "bg-red-100",
        dot: "text-red-500",
        text: "text-red-700",
    },
};

function StatusBadge({ label, tone }: { label: string; tone: StatusTone }) {
    const classes = TONE_CLASSES[tone];

    return (
        <div
            className={`flex flex-row gap-2 items-center p-2 rounded-full ${classes.badge}`}
        >
            <Circle size={10} strokeWidth={3} className={classes.dot} />
            <p className={`font-semibold text-[15px] ${classes.text}`}>
                {label}
            </p>
        </div>
    );
}

type SystemHealthProps = {
    serverOnline: boolean;
    databaseConnected: boolean;
    systemOperational: boolean;
    maintenanceMode: boolean;
    activeUsers: number;
};

export default function SystemHealth({
    serverOnline,
    databaseConnected,
    systemOperational,
    maintenanceMode,
    activeUsers,
}: SystemHealthProps) {
    const systemTone: StatusTone = maintenanceMode
        ? "warning"
        : systemOperational
          ? "success"
          : "danger";

    const systemLabel = maintenanceMode
        ? "MAINTENANCE"
        : systemOperational
          ? "OPERATIONAL"
          : "GANGGUAN";

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-[18px] gap-[18px] flex flex-col">
            <p className="text-[20px] font-semibold">System health</p>

            <div className="flex flex-row justify-between p-2 border border-slate-300 rounded-xl">
                <div className="flex flex-row gap-2 items-center">
                    <Server size={20} className="text-slate-500" />
                    <p className="font-semibold">Server</p>
                </div>
                <StatusBadge
                    label={serverOnline ? "ONLINE" : "OFFLINE"}
                    tone={serverOnline ? "success" : "danger"}
                />
            </div>

            <div className="flex flex-row justify-between p-2 border border-slate-300 rounded-xl">
                <div className="flex flex-row gap-2 items-center">
                    <Database size={20} className="text-slate-500" />
                    <p className="font-semibold">Database</p>
                </div>
                <StatusBadge
                    label={databaseConnected ? "CONNECTED" : "DISCONNECTED"}
                    tone={databaseConnected ? "success" : "danger"}
                />
            </div>

            <div className="flex flex-row justify-between p-2 border border-slate-300 rounded-xl">
                <div className="flex flex-row gap-2 items-center">
                    <Cpu size={20} className="text-slate-500" />
                    <p className="font-semibold">System</p>
                </div>
                <StatusBadge label={systemLabel} tone={systemTone} />
            </div>

            <div className="flex flex-row justify-between p-2 border border-slate-300 rounded-xl items-center">
                <div className="flex flex-row gap-2 items-center">
                    <Users
                        size={40}
                        className="text-white bg-blue-700 p-2 rounded-full"
                    />
                    <p className="font-semibold">Active User</p>
                </div>
                <div>
                    <p className="font-semibold text-[20px] text-blue-700">
                        {activeUsers}
                    </p>
                </div>
            </div>
        </div>
    );
}
