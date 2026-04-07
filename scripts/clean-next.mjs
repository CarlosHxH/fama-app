import { rmSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), ".next");

try {
  rmSync(dir, { recursive: true, force: true });
  console.info(`Removido: ${dir}`);
} catch (e) {
  console.warn("Não foi possível remover .next (pode não existir):", e);
}
