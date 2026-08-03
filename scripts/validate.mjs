import { access, readFile, readdir } from "node:fs/promises";
import { constants } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pluginRoot = path.join(repositoryRoot, "plugins", "mallary");
const manifestPath = path.join(pluginRoot, ".codex-plugin", "plugin.json");
const marketplacePath = path.join(repositoryRoot, ".agents", "plugins", "marketplace.json");
const expectedSkills = [
  "mallary-account-management",
  "mallary-analytics",
  "mallary-comment-engagement",
  "mallary-publishing"
];
const errors = [];

async function readJson(filePath, label) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    errors.push(`${label} is not valid JSON: ${error.message}`);
    return null;
  }
}

async function requireFile(filePath, label) {
  try {
    await access(filePath, constants.R_OK);
  } catch {
    errors.push(`${label} is missing: ${path.relative(repositoryRoot, filePath)}`);
  }
}

const manifest = await readJson(manifestPath, "plugin manifest");
const marketplace = await readJson(marketplacePath, "marketplace manifest");

if (manifest) {
  if (manifest.name !== "mallary") errors.push("plugin manifest name must be mallary");
  if (manifest.skills !== "./skills/") errors.push("plugin manifest skills path must be ./skills/");
  if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(manifest.version ?? "")) {
    errors.push("plugin manifest version must be semantic versioning");
  }
  if (!Array.isArray(manifest.interface?.defaultPrompt) || manifest.interface.defaultPrompt.length < 1 || manifest.interface.defaultPrompt.length > 3) {
    errors.push("plugin manifest must provide one to three starter prompts");
  }
  for (const prompt of manifest.interface?.defaultPrompt ?? []) {
    if (prompt.length > 128) errors.push("starter prompts must be 128 characters or fewer");
  }
  for (const assetField of ["composerIcon", "logo", "logoDark"]) {
    const assetPath = manifest.interface?.[assetField];
    if (!assetPath) {
      errors.push(`plugin manifest is missing interface.${assetField}`);
    } else {
      await requireFile(path.join(pluginRoot, assetPath), `interface.${assetField}`);
    }
  }

  const appManifestPath = path.join(pluginRoot, ".app.json");
  if (manifest.apps) {
    if (manifest.apps !== "./.app.json") errors.push("plugin manifest apps path must be ./.app.json");
    const appManifest = await readJson(appManifestPath, "app manifest");
    const appId = appManifest?.apps?.mallary?.id;
    if (!/^(?:plugin_)?asdk_app[A-Za-z0-9_-]+$/.test(appId ?? "")) {
      errors.push("app manifest must contain the exact OpenAI technical app ID");
    }
  } else {
    try {
      await access(appManifestPath, constants.F_OK);
      errors.push(".app.json exists but plugin manifest does not reference it");
    } catch {
      // The app manifest is intentionally absent before OpenAI registration.
    }
  }
}

if (marketplace) {
  if (marketplace.name !== "mallarylabs") errors.push("marketplace name must be mallarylabs");
  const entry = marketplace.plugins?.find((plugin) => plugin.name === "mallary");
  if (!entry) errors.push("marketplace must contain the mallary plugin");
  if (entry?.source?.path !== "./plugins/mallary") errors.push("marketplace source path must be ./plugins/mallary");
  if (entry?.policy?.authentication !== "ON_INSTALL") errors.push("Mallary OAuth must start on install");
}

const skillsRoot = path.join(pluginRoot, "skills");
let skillDirectories = [];
try {
  skillDirectories = (await readdir(skillsRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
} catch (error) {
  errors.push(`skills directory is not readable: ${error.message}`);
}

if (JSON.stringify(skillDirectories) !== JSON.stringify(expectedSkills)) {
  errors.push(`expected skills: ${expectedSkills.join(", ")}`);
}

for (const skillName of skillDirectories) {
  const skillPath = path.join(skillsRoot, skillName, "SKILL.md");
  let contents = "";
  try {
    contents = await readFile(skillPath, "utf8");
  } catch (error) {
    errors.push(`${skillName} is missing SKILL.md: ${error.message}`);
    continue;
  }

  const match = contents.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    errors.push(`${skillName} must start with YAML frontmatter`);
    continue;
  }
  const frontmatterLines = match[1].split("\n").filter(Boolean);
  const keys = frontmatterLines.map((line) => line.split(":", 1)[0].trim()).sort();
  if (JSON.stringify(keys) !== JSON.stringify(["description", "name"])) {
    errors.push(`${skillName} frontmatter may contain only name and description`);
  }
  const declaredName = frontmatterLines.find((line) => line.startsWith("name:"))?.slice(5).trim();
  if (declaredName !== skillName) errors.push(`${skillName} frontmatter name must match its directory`);
}

const reviewText = manifest
  ? `${JSON.stringify(manifest)}\n${await Promise.all(skillDirectories.map((skillName) => readFile(path.join(skillsRoot, skillName, "SKILL.md"), "utf8"))).then((values) => values.join("\n"))}`
  : "";
const forbiddenPatterns = [
  [/MALLARY_API_KEY/i, "Do not document API-key environment variables in the OAuth plugin"],
  [/\bprintenv\b/i, "Do not print environment credentials"],
  [/\bupgrade(?:d|s|ing)?\b/i, "Do not add plan promotion language to plugin behavior"],
  [/\[TODO:/i, "Do not leave TODO placeholders"]
];
for (const [pattern, message] of forbiddenPatterns) {
  if (pattern.test(reviewText)) errors.push(message);
}

if (errors.length > 0) {
  console.error("Mallary plugin validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Mallary plugin validation passed.");
