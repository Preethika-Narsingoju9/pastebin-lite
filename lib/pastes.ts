// import fs from 'fs/promises';
// import path from 'path';

// const DATA_FILE = path.join(process.cwd(), 'pastes.json');

// export async function loadPastes() {
//   try {
//     const data = await fs.readFile(DATA_FILE, 'utf8');
//     return JSON.parse(data);
//   } catch {
//     return {};
//   }
// }

// export async function savePaste(id: string, paste: any) {
//   const pastes = await loadPastes();
//   pastes[id] = paste;
//   await fs.writeFile(DATA_FILE, JSON.stringify(pastes, null, 2));
//   return pastes;
// }





import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'pastes.json');

export async function loadPastes() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export async function savePaste(id: string, paste: any) {
  const pastes = await loadPastes();
  pastes[id] = paste;
  await fs.writeFile(DATA_FILE, JSON.stringify(pastes, null, 2));
}
