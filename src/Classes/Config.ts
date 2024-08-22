import dotenv from 'dotenv';
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers';

dotenv.config();

export type ModelIdentifier = `${string}/${string}` | `${string}/${string}:${string}`
export type ModelList = {
    [key: string]: ModelIdentifier
}

type Argv = {
    prompt?: string;
    model?: string;
    [key: string]: unknown;
}

const argv = yargs(hideBin(process.argv)).argv as Argv;

export default class Config {

    static get token (): string {
        if (!process.env.REPLICATE_TOKEN) {
            console.error('replicate token is missing. Please set it in your .env file.');
            process.exit(1);
        }
        return process.env.REPLICATE_TOKEN
    }

    static get models (): ModelList {
        return {
            "fluxschnell": "black-forest-labs/flux-schnell",
            "fluxdev": "black-forest-labs/flux-dev",
            "fluxpro": "black-forest-labs/flux-pro"
        }
    }

    static get prompt (): string {
        const p = argv.prompt
        if (!p) {
            console.error('Please provide a text prompt using --prompt="your text here"');
            process.exit(1);
        }
        return p
    }

    static get model (): ModelIdentifier {
        const m = argv.model
        if (!m || typeof Config.models[m] == "undefined") {
            console.error('Please provide a text prompt using --model="[ fluxscnell | fluxpro ]"');
            process.exit(1);
        }
        return Config.models[m]
    }

    static get modelAlias (): string {
        const m = argv.model
        if (!m || typeof Config.models[m] == "undefined") {
            console.error('Please provide a text prompt using --model="[ fluxscnell | fluxpro ]"');
            process.exit(1);
        }
        return m
    }

}
