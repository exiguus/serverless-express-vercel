import fs from 'fs';
import {nodeFileTrace} from '@vercel/nft';
import vercelJson from '../vercel.json' assert {type: 'json'};
import {glob} from 'glob';

async function checkSize() {
  const includeFiles = await glob(
    vercelJson.functions['api/index.ts'].includeFiles,
  );

  const files = [
    ...includeFiles.filter((file) => file.match(/\.[a-z]{2,5}$/)),
  ].filter((file) => !file.match(/\.test\.ts$/));

  console.log('Check bundle size');
  nodeFileTrace(files, {
    conditions: ['node', 'production'],
  }).then(({fileList}) => {
    const fileSize = new Set();
    Promise.all([
      Array.from(fileList).map((file) => {
        const stat = fs.statSync(file);
        fileSize.add(stat.size);
      }),
    ]).then(() => {
      const size = Array.from(fileSize).reduce((prev, curr) => {
        return prev + curr;
      });
      const sizeMB = size / (1024 * 1024);

      console.log(`Total bundle size: ${sizeMB.toFixed(2)} MB`);
      if (sizeMB > 10) {
        console.error('Error: Total bundle size exceeds 10 MB');
        process.exit(1);
      }
    });
  });
}

checkSize();
