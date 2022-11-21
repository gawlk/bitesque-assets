console.log('Updating liquidity...');

const path = './liquidity.json';

let liquidity: {
  [key: string]: any;
} = {};

try {
  const file = Deno.readTextFileSync(path);

  liquidity = JSON.parse(file);
} catch (_) {
  // skip
}

try {
  const result = await fetch(
    `https://bittemp-back.deno.dev/bitcoin/liquidity`,
  );

  const date = new Date();

  console.log(date);

  liquidity[date.toJSON().split('T')[0]] = await result.json();
} catch (error) {
  throw error;
}

Deno.writeTextFileSync(
  path,
  JSON.stringify(liquidity, null, 2),
);
