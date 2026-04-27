"use client";

import { useState } from "react";


type VariableItem = {
  name: string;
  desc: string;
};


const VARIABLES: any = {
  user: [
    { name: "{user.mention}", desc: "Mentions the user" },
    { name: "{user.name}", desc: "Username" },
    { name: "{user.tag}", desc: "Username with tag" },
    { name: "{user.id}", desc: "User ID" },
    { name: "{user.avatar}", desc: "Avatar URL" },
  ],

  member: [
    { name: "{member.nickname}", desc: "Server nickname" },
    { name: "{member.joined}", desc: "Join date" },
    { name: "{member.roles}", desc: "All roles" },
    { name: "{member.topRole}", desc: "Highest role" },
  ],

  server: [
    { name: "{server.name}", desc: "Server name" },
    { name: "{server.id}", desc: "Server ID" },
    { name: "{server.memberCount}", desc: "Member count" },
    { name: "{server.icon}", desc: "Server icon" },
  ],

  channel: [
    { name: "{channel.name}", desc: "Channel name" },
    { name: "{channel.id}", desc: "Channel ID" },
    { name: "{channel.mention}", desc: "Channel mention" },
    { name: "{channel.topic}", desc: "Channel topic" },
    { name: "{channel.created_at}", desc: "Channel creation" },
    { name: "{channel.parent_id}", desc: "Category ID" },
    { name: "{channel.is_thread}", desc: "Is thread (Yes/No)" },
  ],

  role: [
    { name: "{role.name}", desc: "Role name" },
    { name: "{role.id}", desc: "Role ID" },
    { name: "{role.color}", desc: "Role color" },
  ],

  message: [
    { name: "{message.id}", desc: "Message ID" },
    { name: "{message.content}", desc: "Message content" },
  ],

  special: [
    { name: "{timestamp}", desc: "Current time" },
    { name: "{unix}", desc: "Unix timestamp" },
  ],
};


export default function EmbedPage() {
  const [tab, setTab] = useState("general");

  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#D4BCD2");
  const [showToast, setShowToast] = useState(false);
  const [variableCategory, setVariableCategory] = useState("user");

  const [authorName, setAuthorName] = useState("");
  const [authorIcon, setAuthorIcon] = useState("");
  const [authorUrl, setAuthorUrl] = useState("");

  const [footerText, setFooterText] = useState("");
  const [footerIcon, setFooterIcon] = useState("");

  const [thumbnail, setThumbnail] = useState("");
  const [image, setImage] = useState("");


  
function copyJson() {
  let result = "{embed}";
  if (message) result += `$v{content: ${message}}`;

  if (color) result += `$v{color: ${color}}`;
  if (title) result += `$v{title: ${title}}`;
  if (description) result += `$v{description: ${description}}`;
  if (url) result += `$v{url: ${url}}`;

  if (authorName) result += `$v{author.name: ${authorName}}`;
  if (authorIcon) result += `$v{author.icon_url: ${authorIcon}}`;
  if (authorUrl) result += `$v{author.url: ${authorUrl}}`;

  if (footerText) result += `$v{footer.text: ${footerText}}`;
  if (footerIcon) result += `$v{footer.icon_url: ${footerIcon}}`;

  if (thumbnail) result += `$v{thumbnail: ${thumbnail}}`;
  if (image) result += `$v{image: ${image}}`;

  navigator.clipboard.writeText(result);

  setShowToast(true);
  setTimeout(() => setShowToast(false), 2000);
}

  return (
    <main className="relative min-h-screen text-white px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[#050505]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(212,188,210,0.1),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.05] bg-[url('/noise.png')]" />

      <section className="max-w-7xl mx-auto pt-32 pb-24">
  <div className="grid lg:grid-cols-[1fr_420px] gap-8">
    <div className="bg-[#0f1012] border border-white/10 rounded-2xl p-6 shadow-xl">
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Embed Builder</h1>
        <button
          onClick={copyJson}
          className="px-4 py-2 rounded-lg bg-[#D4BCD2] text-black text-sm font-medium hover:opacity-90"
        >
          Copy Embed
        </button>
      </div>
      <Label title="Message Content" count={`${message.length}/2000`} />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Optional message above embed"
        rows={3}
        className="input"
      />
      <div className="flex gap-5 mt-8 border-b border-white/10 text-sm overflow-x-auto">
        {["general", "author", "footer", "media", "variables"].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`capitalize pb-3 ${
              tab === item
                ? "text-[#D4BCD2] border-b border-[#D4BCD2]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "variables" && (
  <div className="mt-6">
    <div className="bg-[#0f1012] border border-white/10 rounded-2xl p-5 space-y-5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setVariableCategory("user")}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm"
        >
          ×
        </button>
        <h2 className="text-white font-semibold">
          Variables — {variableCategory.charAt(0).toUpperCase() + variableCategory.slice(1)}
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {(VARIABLES[variableCategory] as VariableItem[]).map((v, i) => (
          <div
            key={i}
            className="bg-[#1e1f22] border border-white/10 rounded-xl p-4 hover:border-[#D4BCD2]/40 transition cursor-pointer"
          >
            <p className="text-[#c9cdfb] font-mono text-sm">{v.name}</p>
            <p className="text-gray-400 text-xs mt-1">{v.desc}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap pt-2">
        {["user", "member", "server", "channel", "role", "message", "special"].map((cat) => (
          <button
            key={cat}
            onClick={() => setVariableCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm border transition ${
              variableCategory === cat
                ? "bg-[#D4BCD2] text-black border-transparent"
                : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

    </div>
  </div>
)}
      <div className="space-y-5 mt-6">

        {tab === "general" && (
          <>
            <Input
  label="Title"
  value={title}
  setValue={setTitle}
  count={`${title.length}/256`}
  placeholder="Click to add a title..."
/>

<Input
  label="URL"
  value={url}
  setValue={setUrl}
  placeholder="https://example.com"
/>

<Textarea
  label="Description"
  value={description}
  setValue={setDescription}
  count={`${description.length}/4096`}
  placeholder="Click to add a description..."
/>

            <Label title="Color" />
            <div className="flex gap-3">
              <input value={color} onChange={(e) => setColor(e.target.value)} className="input" />
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-12 w-16 rounded-lg" />
            </div>
          </>
        )}

        {tab === "author" && (
          <>
            <Input label="Author Name" value={authorName} setValue={setAuthorName} placeholder="Click to add an author."/>
            <Input label="Author Icon URL" value={authorIcon} setValue={setAuthorIcon} placeholder="Click to add an icon." />
            <Input label="Author URL" value={authorUrl} setValue={setAuthorUrl} placeholder="https://discord.com/cdn..." />
          </>
        )}

        {tab === "footer" && (
          <>
            <Input label="Footer Text" value={footerText} setValue={setFooterText}  placeholder="Click to add footer text" />
            <Input label="Footer Icon URL" value={footerIcon} setValue={setFooterIcon}  placeholder="https://discord.com/cdn..."/>
          </>
        )}

        {tab === "media" && (
          <>
            <Input label="Thumbnail URL" value={thumbnail} setValue={setThumbnail}  placeholder="https://discord.com/cdn..."/>
            <Input label="Image URL" value={image} setValue={setImage}  placeholder="https://discord.com/cdn...."/>
          </>
        )}

        
      </div>
    </div>

    <Preview
      message={message}
      title={title}
      description={description}
      color={color}
      authorName={authorName}
      authorIcon={authorIcon}
      footerText={footerText}
      footerIcon={footerIcon}
      thumbnail={thumbnail}
      image={image}
    />

  </div>
</section>

      <style jsx>{`
        .input {
  width: 100%;
  margin-top: 0.5rem;
  padding: 12px 14px;

  border-radius: 10px;

  background: #1e1f22;
  border: 1px solid #3f4147;

  color: white;
  font-size: 14px;

  outline: none;
}

.input:focus {
  border-color: #D4BCD2;
  box-shadow: 0 0 0 1px #D4BCD2;
}

.input::placeholder {
  color: #6b7280;
}



        .card {
          padding: 1rem;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn {
          padding: 0.75rem 1rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          transition: 0.2s;
        }

        .btn:hover {
          border-color: rgba(212, 188, 210, 0.4);
        }
      `}</style>
      {showToast && (
  <div className="fixed bottom-6 right-6 bg-[#1e1f22] border border-white/10 text-white px-4 py-3 rounded-lg shadow-lg animate-fade-in">
    Embed copied to clipboard
  </div>
)}
    </main>
  );
}

function Preview(props: any) {
  return (
    <div className="lg:sticky lg:top-28 h-fit">
      <div className="bg-[#313338] rounded-xl p-4 text-sm">
        {props.message && (
  <p className="text-gray-200 mb-3">
    {props.message.replace(/{user\.mention}/g, "@threat")}
  </p>
)}

        <div className="relative bg-[#2b2d31] rounded-md p-4 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: props.color }} />

          <div className="pl-3">
            {props.authorName && (
              <div className="flex items-center gap-2 mb-2">
                {props.authorIcon && <img src={props.authorIcon} className="w-5 h-5 rounded-full" />}
                <span className="text-sm font-medium">{props.authorName}</span>
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex-1">
                {props.title && <h2 className="font-semibold text-white">{props.title}</h2>}
                {props.description && <p className="text-gray-300 mt-2 whitespace-pre-wrap">{props.description}</p>}
              </div>

              {props.thumbnail && <img src={props.thumbnail} className="w-20 h-20 rounded object-cover" />}
            </div>


            {props.image && <img src={props.image} className="mt-4 rounded-md max-h-72 object-cover w-full" />}

            {props.footerText && (
              <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                {props.footerIcon && <img src={props.footerIcon} className="w-4 h-4 rounded-full" />}
                <span>{props.footerText}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ title, count }: { title: string; count?: string }) {
  return (
    <label className="text-sm text-gray-400 flex justify-between">
      <span>{title}</span>
      {count && <span>{count}</span>}
    </label>
  );
}

function Input({ label, value, setValue, placeholder, count }: any) {
  return (
    <div>
      <Label title={label} count={count} />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="input"
      />
    </div>
  );
}

function Textarea({ label, value, setValue, placeholder, count }: any) {
  return (
    <div>
      <Label title={label} count={count} />
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        rows={6}
        className="input resize-none"
      />
    </div>
  );
}

function Variable({ name, desc, example }: any) {
  return (
    <div className="flex items-center justify-between bg-[#1e1f22] border border-white/10 rounded-lg px-4 py-3">
      <div>
        <p className="text-white font-mono text-sm">{name}</p>
        <p className="text-gray-400 text-xs">{desc}</p>
      </div>

      <div className="text-xs text-gray-500">
        {example}
      </div>
    </div>
  );
}

function Category({ title, children }: any) {
  return (
    <div className="space-y-3">
      <p className="text-white font-semibold text-sm">{title}</p>

      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}