import Replicate from "replicate"
import FileWriter from "./Classes/FileWriter"
import Config, { ModelIdentifier } from "./Classes/Config"

const replicate = new Replicate({ auth: Config.token });

// save a URL to FS
//
async function downloadImage(url: string, filename: string): Promise<void> {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);


        await FileWriter.writeFile('prompt.txt', Config.prompt)
        await FileWriter.writeImage(filename, buffer);
        
    } catch (error) {
        console.error('Error downloading image:', error);
    }
}


// Function to generate image from text
//
async function generate(model: ModelIdentifier, prmpt: string): Promise<void> {
    try {

        const input = {
            prompt: prmpt,
            num_outputs: 4,         // num images to generate
            steps: 25,              // [1 - 50] - Number of diffusion steps
            guidance: 3,            // [2 - 5] - Controls the balance between adherence to the text prompt and image quality/diversity. Higher values make the output more closely match the prompt but may reduce overall image quality. Lower values allow for more creative freedom but might produce results less relevant to the prompt.
            output_format: "png",
            output_quality: 90,
            aspect_ratio: "16:9",
            safety_tolerance: 5     // Safety tolerance, 1 is most strict and 5 is most permissive
        };
          
        const output = await replicate.run(model, { input })

        let resultImages = []
        switch (model) {
            case Config.models.fluxschnell:
            case Config.models.fluxdev: {
                resultImages = output as any[]
            }; break;
            case Config.models.fluxpro: {
                resultImages = [output as {}]
            }; break;
            default: console.error(`Response Output could not be determined!`, output) 
        }


        const dateStr = `${String(new Date().getDate()).padStart(2, '0')}${String(new Date().getMonth() + 1).padStart(2, '0')}${new Date().getFullYear()}`
        const timeStr = `${String(new Date().getHours()).padStart(2, '0')}${String(new Date().getMinutes()).padStart(2, '0')}${String(new Date().getSeconds()).padStart(2, '0')}`
        FileWriter.setWriteDir(`output/${dateStr}/${Config.modelAlias}/${timeStr}`)

        let seq = 0
        resultImages.forEach(async (resultUrl) => {
            await downloadImage(resultUrl as string, `${String(seq++).padStart(3, '0')}.png`)
        });

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
    }
}

// Run the function with the provided prompt
generate(Config.model, Config.prompt);
