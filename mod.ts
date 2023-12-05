import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std@0.101.0/io/bufio.ts";
import { parse } from "https://deno.land/std@0.101.0/encoding/csv.ts";


async function readFile() {
    const path = join("data", "NASA exoplanet archive.csv");
    const file = await Deno.open(path);
    const bufReader = new BufReader(file);
    const result = await parse(bufReader, {
        skipFirstRow: true,
        comment: "#",
    });
    console.log(result);

    Deno.close(file.rid);
}

// async function readDir() {
//     for await (const dirEntry of Deno.readDir(Deno.cwd())) {
//         console.log(dirEntry.name);
//     }
// }

void readFile();
// void readDir();
