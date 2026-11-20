// Tells Bing, Yandex and other IndexNow engines that the site changed, so they recrawl within minutes.
// ChatGPT search and DuckDuckGo draw on Bing's index. Run after each deploy: npm run indexnow
const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gopaldev.in").replace(/\/$/, "");
const key = "7e2cac2b1702a82836f50106ffff914f";

const sitemap = await (await fetch(`${site}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
