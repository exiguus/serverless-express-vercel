const ref = {
  current: null,
};

// function afterAllResolved(lockfile, context) {
// console.log('afterAllResolved');
// return lockfile;
// }

function readPackage(pkg, context) {
  if (process.env.VERCEL || process.env.VERCEL_ENV) return pkg;
  if (ref.current) clearTimeout(ref.current);
  ref.current = setTimeout(() => {
    exec = require('child_process').exec;
    exec('node scripts/generateVercelJson.mjs', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  }, 1000);

  return pkg;
}

module.exports = {
  hooks: {
    // afterAllResolved,
    readPackage,
  },
};
