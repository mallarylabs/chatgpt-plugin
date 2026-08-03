import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pluginRoot = path.join(repositoryRoot, "plugins", "mallary");
const manifestPath = path.join(pluginRoot, ".codex-plugin", "plugin.json");
const appManifestPath = path.join(pluginRoot, ".app.json");
const appId = process.argv[2]?.trim();

if (!appId) {
  throw new Error("Usage: npm run configure:app -- <OpenAI technical app ID>");
}

if (!/^(?:plugin_)?asdk_app[A-Za-z0-9_-]+$/.test(appId)) {
  throw new Error("Use the exact technical app ID shown by OpenAI. It should start with asdk_app or plugin_asdk_app.");
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
manifest.apps = "./.app.json";

const appManifest = {
  apps: {
    mallary: {
      id: appId,
      category: "Productivity"
    }
  }
};

await writeFile(appManifestPath, `${JSON.stringify(appManifest, null, 2)}\n`, "utf8");
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log(`Configured Mallary with OpenAI app ${appId}.`);
console.log("Run npm run validate before installing or submitting the plugin.");
