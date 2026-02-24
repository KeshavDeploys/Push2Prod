import fs from "fs-extra";
import path from "path";

function replaceVars(template, vars) {
  return template
    .replace(/{{PORT}}/g, vars.port)
    .replace(/{{EC2_IP}}/g, vars.ec2Ip)
    .replace(/{{SSH_USER}}/g, vars.sshUser);
}

export async function generateFiles(workdir, options) {
  const { port, ec2Ip, sshUser, stackType } = options;

  let dockerTemplatePath;

  if (stackType === "mern") {
    dockerTemplatePath = "Dockerfile.mern.tpl";
  } else if (stackType === "mean") {
    dockerTemplatePath = "Dockerfile.mean.tpl";
  } else if (stackType === "python") {
    dockerTemplatePath = "Dockerfile.python.tpl";
  } else {
    throw new Error("Unsupported stack configuration.");
  }

  const dockerTemplate = await fs.readFile(
    path.join(process.cwd(), "src", "templates", dockerTemplatePath),
    "utf-8"
  );

  const workflowTemplate = await fs.readFile(
    path.join(process.cwd(), "src", "templates", "github-actions.tpl.yml"),
    "utf-8"
  );

  const dockerfile = replaceVars(dockerTemplate, { port });
  const workflow = replaceVars(workflowTemplate, { port, ec2Ip, sshUser });

  await fs.writeFile(path.join(workdir, "Dockerfile"), dockerfile);

  const workflowDir = path.join(workdir, ".github", "workflows");
  await fs.ensureDir(workflowDir);
  await fs.writeFile(path.join(workflowDir, "deploy.yml"), workflow);
}