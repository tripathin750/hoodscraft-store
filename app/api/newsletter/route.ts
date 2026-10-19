import { forward } from "@/lib/forward";
export const POST = (req: Request) => forward(req, "NEWSLETTER_WEBHOOK_URL", ["email"]);
