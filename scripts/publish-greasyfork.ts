// SPDX-License-Identifier: PMPL-1.0-or-later
// Publish userscripts to GreasyFork

const API_BASE = "https://greasyfork.org/api/v1";

const scripts = [
  "GrimGreaser",
  "GrimPager",
  "GrimTemplateEngine",
  "GrimLicenseChecker",
  "GrimCIValidator",
  "GrimSecurityScanner",
];

async function publishScript(name: string, apiKey: string) {
  const code = await Deno.readTextFile(`./dist/${name}.user.js`);

  const formData = new FormData();
  formData.append("code", code);
  formData.append("locale", "en");

  const response = await fetch(`${API_BASE}/scripts`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (response.ok) {
    const result = await response.json();
    console.log(`✓ Published ${name} - ID: ${result.id}`);
    console.log(`  URL: https://greasyfork.org/en/scripts/${result.id}`);
    return result.id;
  } else {
    const error = await response.text();
    console.error(`✗ Failed to publish ${name}:`, error);
    return null;
  }
}

async function updateScript(scriptId: number, name: string, apiKey: string) {
  const code = await Deno.readTextFile(`./dist/${name}.user.js`);

  const formData = new FormData();
  formData.append("code", code);
  formData.append("changelog", "Initial release");

  const response = await fetch(`${API_BASE}/scripts/${scriptId}/versions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (response.ok) {
    console.log(`✓ Updated ${name}`);
    return true;
  } else {
    const error = await response.text();
    console.error(`✗ Failed to update ${name}:`, error);
    return false;
  }
}

// Main
const apiKey = Deno.env.get("GREASYFORK_API_KEY");

if (!apiKey) {
  console.log("⚠️  GREASYFORK_API_KEY not set");
  console.log("\nTo get your API key:");
  console.log("1. Log in to https://greasyfork.org");
  console.log("2. Go to https://greasyfork.org/en/users/edit");
  console.log("3. Scroll to 'API' section");
  console.log("4. Copy your API key");
  console.log("\nThen run:");
  console.log("  export GREASYFORK_API_KEY=your_key_here");
  console.log("  deno run --allow-read --allow-net --allow-env publish-greasyfork.ts");
  console.log("\n=== OR MANUAL UPLOAD ===");
  console.log("\nFor each file in dist/:");
  for (const script of scripts) {
    console.log(`\n${script}.user.js:`);
    console.log(`  1. Visit https://greasyfork.org/en/scripts/new`);
    console.log(`  2. Click 'Choose File' and select dist/${script}.user.js`);
    console.log(`  3. Set language to 'English'`);
    console.log(`  4. Click 'Post script'`);
  }
  Deno.exit(1);
}

console.log("Publishing to GreasyFork...\n");

for (const name of scripts) {
  await publishScript(name, apiKey);
  // Rate limit: wait 2 seconds between uploads
  await new Promise(resolve => setTimeout(resolve, 2000));
}

console.log("\n✓ All scripts published!");
console.log("\nNext steps:");
console.log("1. Check https://greasyfork.org/en/users/scripts");
console.log("2. Add screenshots to each script");
console.log("3. Add detailed descriptions");
console.log("4. Set appropriate tags");
