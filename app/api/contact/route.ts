import { forward } from "@/lib/forward";
export const POST = (req: Request) => forward(req, "CONTACT_WEBHOOK_URL", ["name", "email", "message"]);
