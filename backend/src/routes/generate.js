import express from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs-extra";
import path from "path";

import { cloneRepo, commitAndPush } from "../services/gitService.js";
import { analyzeProject } from "../services/projectService.js";
import { generateFiles } from "../services/fileGenerator.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { repoUrl, githubToken, port, ec2Ip, sshUser } = req.body;

  if (!repoUrl || !githubToken || !port || !ec2Ip || !sshUser) {
    return res.status(400).json({
      success: false,
      error: "All fields are required"
    });
  }

  const workspaceId = uuidv4();
  const workdir = path.join(process.cwd(), "tmp", workspaceId);

  try {
    await cloneRepo(repoUrl, githubToken, workdir);

    const projectConfig = await analyzeProject(workdir);

    await generateFiles(workdir, {
      port,
      ec2Ip,
      sshUser,
      stackType: projectConfig.stackType
    });

    await commitAndPush(workdir);
    await fs.remove(workdir);

    return res.json({
      success: true,
      detectedStack: projectConfig.stackType,
      message: "Push2Prod Strict Mode pipeline generated successfully 🚀"
    });

  } catch (error) {
    await fs.remove(workdir).catch(() => {});
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;