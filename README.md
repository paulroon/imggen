# imggen-cli

## Setup

- You'll need and account with https://replicate.com
- add a payment method and set up an API-Key
- Add you API-Key to `./.env.default` and rename to `.env`

## Build

```bash
   pnpm run build
```

## Run

```bash
pnpm run start \
  --prompt="A ginger cockapoo cheerfully running through an english garden on a spring day" \
  --model="fluxschnell"
```

Options are:

- fluxschnell **_[DEFAULT]_** - low cost and fast
- fluxdev - faster but better quality
- fluxpro - most expensive highest quality output

* Change the prompt to whatever
* The model name alias mapping can be found in `src/Classes/Config.ts`
