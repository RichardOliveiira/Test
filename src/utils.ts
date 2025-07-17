import fetch from 'node-fetch';

export async function isRepoAccessible(url: string): Promise<boolean> {
  try {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)(\.git)?$/);
    if (!match) return false;

    const owner = match[1];
    const repo = match[2].replace('.git', '');

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'repo-checker',
        'Accept': 'application/vnd.github+json'
      }
    });
    //NOVO ARQUIVO ====================================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return response.status === 200;
  } catch (err: any) {
    console.error('[isRepoAccessible] Erro ao verificar repositório:', err.message);
    return false;
  }
}
