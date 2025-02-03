# Setup

```bash
npm init -y
npm install --save-dev typescript ts-node @types/node jest ts-jest @types/jest
npx tsc --init
```

**tsconfig.json**:

```bash
{
	"compilerOptions": {
		"module": "commonjs",
		"target": "es6",
		"esModuleInterop": true,
		"strict": true,
		"skipLibCheck": true,
		"forceConsistentCasingInFileNames": true,
		"moduleResolution": "node",
		"outDir": "./dist",
		"rootDir": "./src" // This should be your source folder
	},
	"include": ["src/problem4/**/*.ts"],
	"exclude": ["node_modules"]
}

```

**jest.config.js**

```bash
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

```

# Run test case

-   npx jest
