import { prisma } from "@/src/lib/prisma";
import type { ActivityStatus } from "@/src/generated/prisma/client";

export async function writeActivity(input: {
    eventType: string;
    description: string;
    status?: ActivityStatus;
    actor?: string | null;
}): Promise<void> {
    try {
        await prisma.activityLog.create({
            data: {
                eventType: input.eventType,
                description: input.description,
                status: input.status ?? "SUCCESS",
                actor: input.actor ?? null,
            },
        });
    } catch (error) {
        console.error("writeActivity", error);
    }
}
