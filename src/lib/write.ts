import { Build } from "src/interfaces/build.interface";
import { promises as fs } from "fs";

import signale from "signale";

/**
 * Writes a given Build objects to a file
 * @param content File contents to write to `build.ts` file
 * @param path Optional `path` parameter, defaults to ``${process.cwd()}/build.ts``
 */
const write = async (content: Build, path?: string): Promise<void> => {
    const writePath = path ? `${process.cwd()}${path}` : `${process.cwd()}/build.ts`;

    try {
        await fs.writeFile(
            writePath,
            "// Build information\n" +
            "// This file is automatically generated, you should not change the content manually.\n" +
                "export const build = " +
                JSON.stringify(content, null, 4).replace(
                    /\"([^(\")"]+)\":/g,
                    "$1:"
                ) +
                ";"
        );
    } catch (error) {
        signale.fatal(`Error writing to \`${path}\``);
        signale.fatal(error);
    }
};

export default write;
