# bun-repro

**problem #1**
If we run script with `bun run index.ts` it works as expected, for promisified version - we get segfault
```
============================================================
Bun v1.1.26 (0a37423b) macOS Silicon
macOS v13.3.1
Args: "./drizzle-gateway-0.0.23-macos-arm64"
Features: jsc http_server standalone_executable 
Builtins: "bun:main" "bun:sqlite" "node:buffer" "node:crypto" "node:dns" "node:events" "node:fs/promises" "node:net" "node:stream" "node:string_decoder" "node:timers" "node:tls" "node:tty" "node:url" "node:util" "node:util/types" 
Elapsed: 15815ms | User: 1793ms | Sys: 328ms
RSS: 0.19GB | Peak: 0.19GB | Commit: 1.02GB | Faults: 56

panic(main thread): Segmentation fault at address 0x6B0E01BF528CCCDE
oh no: Bun has crashed. This indicates a bug in Bun, not your code.

To send a redacted crash report to Bun's team,
please file a GitHub issue using the link below:

 https://bun.report/1.1.26/M_10a37423A///+//D__2h6+C____uy65U+z+oN2hi+LA2+7g4hrD8tmzxyC

[1]    49461 trace trap  STORE_PATH=./app ./drizzle-gateway-0.0.23-macos-arm64
```

we've tested with `duckdb-async` - crashes on second query.  
  

**problem #2**  
We bundle Drizzle Studio as an executable with `bun build --compile`, if we do that with `import duckdb from "duckdb"` - executable will be dependant on `node_modules` imports  
To overcome this - we've copied `duckdb.js` with direct import of `.node` file  
  