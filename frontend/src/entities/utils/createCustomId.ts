const customId: Record<TRandomID, () => void> = {
  "20-bit-number": () => random20Bit(),
  "32-bit-number": () => random32Bit(),
  "9-digit-number": () => random9Digit(),
  "6-digit-number": () => random6Digit(),
  "date-time": () => randomDate(),
  guid: ()=> randomGUID(),
  sequence: () => sequence(),
  fixed: () => "",
};

function random20Bit() {
  const arr = new Uint32Array(1);

  crypto.getRandomValues(arr);

  return arr[0] & ((1 << 20) - 1);
}

function random32Bit() {
  const arr = new Uint32Array(1);

  crypto.getRandomValues(arr);

  return arr[0];
}

function random6Digit() {
  return (crypto.getRandomValues(new Uint32Array(1))[0] % 900000) + 100000;
}
function random9Digit() {
  return (
    (crypto.getRandomValues(new Uint32Array(1))[0] % 900000000) + 100000000
  );
}
function randomDate() {
  return new Date().toISOString();
}
function randomGUID() {
  return crypto.randomUUID();
}
function sequence() {
  return 1;
}

export { customId, random20Bit, random32Bit, random6Digit, random9Digit };
