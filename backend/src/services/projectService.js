import fs from "fs-extra";
import path from "path";

export async function analyzeProject(workdir) {
  const rootPackagePath = path.join(workdir, "package.json");
  const clientPackagePath = path.join(workdir, "client", "package.json");

  const requirementsPath = path.join(workdir, "requirements.txt");
  const pyprojectPath = path.join(workdir, "pyproject.toml");
  const managePyPath = path.join(workdir, "manage.py");

  // -------------------------
  // MERN / MEAN Detection
  // -------------------------

  const rootExists = await fs.pathExists(rootPackagePath);
  const clientExists = await fs.pathExists(clientPackagePath);

  if (rootExists && clientExists) {
    const clientPackage = await fs.readJson(clientPackagePath);
    const deps = {
      ...clientPackage.dependencies,
      ...clientPackage.devDependencies
    };

    if (deps?.react) {
      return { stackType: "mern" };
    }

    if (deps?.["@angular/core"]) {
      return { stackType: "mean" };
    }

    throw new Error(
      "Unsupported frontend framework. Only React (MERN) or Angular (MEAN) supported."
    );
  }

  // -------------------------
  // Python Detection
  // -------------------------

  const isPython =
    (await fs.pathExists(requirementsPath)) ||
    (await fs.pathExists(pyprojectPath)) ||
    (await fs.pathExists(managePyPath));

  if (isPython) {
    return { stackType: "python" };
  }

  // -------------------------
  // STRICT REJECTION
  // -------------------------

  throw new Error(
    "Unsupported stack. Only MERN, MEAN, and Python apps are supported."
  );
}