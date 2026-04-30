import { redirect } from "next/navigation";

export default function InvitePage() {
  redirect(
    "https://discord.com/oauth2/authorize?client_id=1496901318592303276&permissions=8&scope=bot"
  );
}
