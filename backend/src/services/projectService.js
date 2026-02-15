import fs from "fs-extra";
import path from "path";

export async function analyzeNodeProject(workdir) {
  const packagePath = path.join(workdir, "package.json");

  const exists = await fs.pathExists(packagePath);
  if (!exists) {
    throw new Error("Not a Node.js project (package.json missing)");
  }

  const packageJson = await fs.readJson(packagePath);

  // Node version
  const nodeVersion =
    packageJson.engines?.node?.replace(/[^\d]/g, "") || "18";

  // Detect package manager
  let packageManager = "npm";
  if (await fs.pathExists(path.join(workdir, "yarn.lock"))) {
    packageManager = "yarn";
  }
  if (await fs.pathExists(path.join(workdir, "pnpm-lock.yaml"))) {
    packageManager = "pnpm";
  }

  // Detect start script
  const startScript = packageJson.scripts?.start || "start";

  return {
    nodeVersion,
    packageManager,
    startScript
  };
}
