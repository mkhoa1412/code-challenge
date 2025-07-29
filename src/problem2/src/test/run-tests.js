#!/usr/bin/env node
import { spawn } from 'child_process';

const runTests = () => {
  const testProcess = spawn('npm', ['run', 'test:run'], {
    stdio: 'inherit',
    shell: true
  });

  testProcess.on('exit', (code) => {
    if (code === 0) {
      console.log('\n✅ All tests passed!');
    } else {
      console.log('\n❌ Some tests failed!');
      process.exit(1);
    }
  });
};

runTests();