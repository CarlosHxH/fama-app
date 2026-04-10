/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

import "./src/env.js";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const config = {
  output: "standalone",
  // Evita inferir a raiz a partir de lockfiles noutra pasta (ex.: C:\Users\...\package-lock.json),
  // o que corrompe caminhos em `.next` e pode causar ENOENT em _buildManifest.js.tmp (Turbopack).
  turbopack: {
    root: projectRoot,
  },
  outputFileTracingRoot: projectRoot,
  outputFileTracingIncludes: {
    "/api/**/*": ["./generated/prisma/**/*"],
  },
};

export default config;
