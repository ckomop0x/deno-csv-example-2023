import { join } from "./deps.ts";

async function readFile() {
    const path = join("data", "hello.txt");
    const data = await Deno.readTextFile(path);
    console.log(data);
}

async function readDir() {
    for await (const dirEntry of Deno.readDir(Deno.cwd())) {
        console.log(dirEntry.name);
    }
}

void readFile();
void readDir();
