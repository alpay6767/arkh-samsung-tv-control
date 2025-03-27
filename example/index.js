const { Samsung, APPS, KEYS } = require('../lib/index');

const config = {
  debug: true,
  ip: '192.168.178.39',
  mac: '54:3A:D6:55:65:A8',
  name: '[TV] Q60',
  token: '15454709',
  saveToken: false
};

const control = new Samsung(config);

// A simple sleep function to wait for the specified number of milliseconds.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  await control.isAvailable();
  //let token = await control.getTokenPromise()
  //console.log('$$ token:', token);

  // Define an array of keys you want to test.
  const keysToTest = [
    KEYS.KEY_HOME,
    KEYS.KEY_LEFT,
    KEYS.KEY_RIGHT,
    KEYS.KEY_UP,
    KEYS.KEY_DOWN,
    KEYS.KEY_HDMI,
  ];

  // Loop through the keys, sending one, waiting a second, then sending the next.
  for (const key of keysToTest) {
    console.log(`Sending ${key}...`);
    try {
      await control.sendKeyPromise(key);
      console.log(`Sent ${key}`);
    } catch (err) {
      console.error(`Error sending ${key}:`, err);
    }
    // Wait for 1 second before sending the next key.
    await sleep(1000);
  }
}

main();
