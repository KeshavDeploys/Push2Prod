import simpleGit from "simple-git";

export async function cloneRepo(repoUrl, token, workdir) {
  const authUrl = repoUrl.replace(
    "https://",
    `https://${token}@`
  );

  const git = simpleGit();
  await git.clone(authUrl, workdir);
}

export async function commitAndPush(workdir) {
  const git = simpleGit(workdir);

  console.log("📁 Checking git status...");
  const status = await git.status();

  if (status.isClean()) {
    console.log("⚠️ Nothing to commit.");
    return false;
  }

  console.log("➕ Adding files...");
  await git.add(".");

  console.log("📝 Committing...");
  await git.commit("chore: auto pipeline update " + Date.now());

  console.log("🚀 Pushing...");
  await git.push("origin", "main");

  console.log("✅ Push successful");

  return true;
}
