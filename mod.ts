import { join } from "https://deno.land/std@0.208.0/path/mod.ts";
import { BufReader } from "https://deno.land/std@0.101.0/io/bufio.ts";
import { parse } from "https://deno.land/std@0.101.0/encoding/csv.ts";

interface Planet {
    [ key: string ]: string
}

async function loadPlanetsData() {
    const path = join("data", "NASA exoplanet archive.csv");
    const file = await Deno.open(path);
    const bufReader = new BufReader(file);
    const result = await parse(bufReader, {
        skipFirstRow: true,
        comment: "#",
    });

    Deno.close(file.rid);

    const planets = (result as Array<Planet>).filter((planet) => {
        const planetaryRadius = Number(planet["koi_prad"]);
        const stellarMass = Number(planet["koi_smass"]);
        const stellarRadius = Number(planet["koi_srad"]);

        return planet["koi_disposition"] === "CONFIRMED"
          && planetaryRadius > 0.5 && planetaryRadius < 1.5
          && stellarMass > 0.78 && stellarMass < 1.04
          && stellarRadius > 0.99 && stellarRadius < 1.01;
    });

    return result;
}

const newEarths = await loadPlanetsData();

// async function readDir() {
//     for await (const dirEntry of Deno.readDir(Deno.cwd())) {
//         console.log(dirEntry.name);
//     }
// }

console.log(`${newEarths.length} habitable planets found!`)
