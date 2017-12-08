import syncy from 'syncy';

const sync = () => {
  process.chdir('./src');
  syncy(['./iglu/schemas/**/*.json'], '../dist/', { ignoreInDest: '**/*.js' })
    .then(() => {
      console.log('Synced JSON files!');
    })
    .catch(console.error);
}

sync();
