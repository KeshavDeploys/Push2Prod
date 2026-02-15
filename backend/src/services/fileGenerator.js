import fs from "fs-extra";
import path from "path";

export async function generateFiles(workdir, options) {
  const {
    port,
    ec2Ip,
    sshUser,
    nodeVersion = "20"
  } = options;

  // ---------------------
  // Dockerfile
  // ---------------------

  const dockerfile = `FROM node:${nodeVersion}-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${port}

CMD ["npm", "start"]
`;

  await fs.writeFile(path.join(workdir, "Dockerfile"), dockerfile);

  // ---------------------
  // GitHub Workflow
  // ---------------------

  const workflow = `name: Deploy to EC2

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Deploy to EC2
        uses: appleboy/ssh-action@master
        with:
          host: ${ec2Ip}
          username: ${sshUser}
          key: \${{ secrets.EC2_SSH_KEY }}
          script: |
            set -e

            cd /home/${sshUser}

            if [ ! -d "app" ]; then
              git clone https://github.com/\${{ github.repository }}.git app
            fi

            cd app
            git pull origin main

            docker stop app || true
            docker rm app || true
            docker rmi app || true

            docker build -t app .
            docker run -d -p 80:${port} --name app app
`;

  const workflowDir = path.join(workdir, ".github", "workflows");
  await fs.ensureDir(workflowDir);

  await fs.writeFile(
    path.join(workflowDir, "deploy.yml"),
    workflow
  );
}
