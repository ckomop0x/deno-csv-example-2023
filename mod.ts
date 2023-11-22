async function readFile() {
    const data = await Deno.readTextFile("hello.txt");
    console.log(data);
}

async function readDir() {
    for await (const dirEntry of Deno.readDir(Deno.cwd())) {
        console.log(dirEntry.name);
    }
}

void readDir();
