import { PageShell } from "@/components/Prose";
import { SignupForm } from "@/components/SignupForm";
import { site } from "@/lib/site";
export default function Contact() {
  return (
    <PageShell title="Contact" intro="Questions about an order, sizing or a drop? Send us a message.">
      <div className="grid gap-10 md:grid-cols-2">
        <SignupForm endpoint="/api/contact" cta="Send message" fields={[{ name: "name", label: "Name" }, { name: "email", label: "Email", type: "email" }, { name: "message", label: "Message", textarea: true }]} />
        <ul className="grid h-fit gap-2">
          {site.contact.email && <li>Email: {site.contact.email}</li>}<li>Phone / WhatsApp: {site.contact.phone}</li><li>Address: {site.contact.address}</li>{site.contact.hours && <li>Hours: {site.contact.hours}</li>}
          <li><a className="underline hover:text-volt" href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram {site.instagramHandle}</a></li>
        </ul>
      </div>
    </PageShell>
  );
}
