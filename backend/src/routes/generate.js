import express from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs-extra";
import path from "path";

import { cloneRepo, commitAndPush } from "../services/gitService.js";
import { analyzeNodeProject } from "../services/projectService.js";
import { generateFiles } from "../services/fileGenerator.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { repoUrl, githubToken, port, ec2Ip, sshUser } = req.body;

  // -------------------------
  // Validation
  // -------------------------

  if (!repoUrl || !githubToken || !port || !ec2Ip || !sshUser) {
    return res.status(400).json({
      success: false,
      error: "All fields are required"
    });
  }

  if (!repoUrl.includes("github.com")) {
    return res.status(400).json({
      success: false,
      error: "Only GitHub repositories are supported"
    });
  }

  if (isNaN(port)) {
    return res.status(400).json({
      success: false,
      error: "Port must be numeric"
    });
  }

  const workspaceId = uuidv4();
  const workdir = path.join(process.cwd(), "tmp", workspaceId);

  try {
    console.log("🔄 Cloning repository...");
    await cloneRepo(repoUrl, githubToken, workdir);

    console.log("🔍 Analyzing project...");
    const projectConfig = await analyzeNodeProject(workdir);

    console.log("⚙️ Generating pipeline files...");
    await generateFiles(workdir, {
      port,
      ec2Ip,
      sshUser,
      ...projectConfig
    });

    console.log("📤 Committing and pushing changes...");
    const pushed = await commitAndPush(workdir);

    if (!pushed) {
      console.log("⚠️ No changes detected. Workflow not triggered.");
    }

    // Cleanup workspace
    await fs.remove(workdir).catch(() => {});

    return res.json({
      success: true,
      message: "Pipeline generated successfully 🚀"
    });

  } catch (error) {

    console.error("❌ Error:", error.message);

    // Safe cleanup even on error
    await fs.remove(workdir).catch(() => {});

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
