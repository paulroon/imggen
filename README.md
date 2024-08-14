# imggen-cli


## Setup
 - You'll need and account with https://replicate.com
 - add a payment method and set up an API-Key
 - Add you API-Key to ```./.env.default``` and rename to ```.env```

## Build
 ```bash
    npm run build
 ```

## Run
 ```bash 
 npm run start --prompt="A ginger cockapoo cheerfully running through an english garden on a spring day" --model="fluxschnell"
 ```

  - Change the prompt to whatever
  - The model name alias mapping can be found in ```src/Classes/Config.ts``` 

