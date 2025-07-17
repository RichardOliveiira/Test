import * as fs from 'fs/promises';
import * as path from 'path';
import { config } from 'dotenv';
import simpleGit from 'simple-git';

config();

const REPO_URL = 'https://github.com/vercel/next.js.git';
const CLONE_PATH = './repo';
const ALLOWED_EXTENSIONS = ['.ts', '.js', '.tsx', '.jsx', '.json', '.md'];

async function cloneRepo(repoUrl: string, localPath: string) {
  const git = simpleGit();
  console.log(`Clonando repositório de: ${repoUrl}`);
  await git.clone(repoUrl, localPath);
  console.log('Repositório clonado com sucesso.');
}

async function readCodeFiles(dir: string): Promise<void> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!['node_modules', '.git', 'dist', 'build'].includes(entry.name)) {
        await readCodeFiles(fullPath); // recursivamente
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        try {
          const codeText = await fs.readFile(fullPath, 'utf-8');

          // Aqui é o ponto de envio para IA
          // AQUI_É_O_ENVIO_PARA_IA
          console.log(`\n====== ${fullPath} ======\n`);
          console.log(codeText);

        } catch (err) {
          console.error(`Erro ao ler o arquivo ${fullPath}:`, err);
        }
      }
    }
  }
}

async function main() {
  try {
    await cloneRepo(REPO_URL, CLONE_PATH);
    await readCodeFiles(CLONE_PATH);
  } catch (err) {
    console.error('Erro geral:', err);
  }
}

main();
