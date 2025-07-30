# Currency Swap Form

A modern, interactive currency swap form, featuring real-time exchange rates and token selection with full type safety.

## Features

- **Real-time Token Prices**: Fetches current token prices from Switcheo API with TypeScript interfaces
- **Token Selection**: Dropdown with token icons and names (fully typed)
- **Live Exchange Rate Calculation**: Automatic conversion between selected tokens with type safety
- **Input Validation**: Error handling and user feedback with proper TypeScript error types
- **Responsive Design**: Modern UI that works on all devices
- **Token Icons**: High-quality SVG icons from Switcheo token repository
- **Type Safety**: Full TypeScript coverage for better development experience and fewer runtime errors
- **Comprehensive Testing**: Complete test suite with TypeScript support and type-safe mocks

## Tech Stack

- **TypeScript**: Strongly typed JavaScript for better development experience
- **Vite**: Fast build tool and development server with TypeScript support
- **CSS3**: Modern styling with flexbox and animations
- **Vitest**: Fast unit testing framework with TypeScript support
- **Switcheo APIs**: Token prices and icons

## API Endpoints

- **Token Prices**: `https://interview.switcheo.com/prices.json`
- **Token Icons**: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/{SYMBOL}.svg`

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TypeScript knowledge (helpful but not required)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Generate test coverage report
npm run coverage
```

## Usage

1. Select the token you want to swap from in the "From" dropdown
2. Enter the amount you want to swap
3. Select the token you want to receive in the "To" dropdown
4. View the calculated exchange amount in real-time
5. Click "CONFIRM SWAP" to proceed (demo functionality)

## Project Structure

```
src/
├── main.ts              # Application entry point
├── style.css            # Main stylesheet
├── counter.ts           # Counter component with TypeScript types
├── api.ts               # API utilities with TypeScript interfaces
├── vite-env.d.ts        # Vite environment type declarations
└── test/
    ├── setup.ts         # Test environment setup
    └── api.test.ts      # Comprehensive API tests with TypeScript
```

### Configuration Files

```
├── tsconfig.json        # Main TypeScript configuration
├── tsconfig.node.json   # Node.js specific TypeScript config
├── vitest.config.ts     # Testing configuration
└── package.json         # Project dependencies and scripts
```

## Development

The application is built with modern TypeScript and provides:

### Type Safety Features
- **Strong typing** for all API responses and data structures
- **Interface definitions** for `TokenPrice`, `PriceMap`, and `Token` types
- **Type-safe DOM manipulation** with proper element typing
- **Comprehensive test coverage** with typed mocks and assertions

### Development Features
- CSS custom properties for theming
- Async/await for API calls with proper error typing
- Error boundaries for robust error handling
- Responsive design principles
- Hot module replacement in development
- Strict TypeScript compilation settings

### Type Definitions
```typescript
interface TokenPrice {
  price: string;
  currency: string;
}

interface Token {
  symbol: string;
  price: number;
  hasIcon: boolean;
  iconUrl: string;
}
```

## TypeScript Benefits

This project showcases the advantages of using TypeScript in a real-world application:

### 🛡️ **Type Safety**
- Catch errors at compile time instead of runtime
- IntelliSense support for better development experience
- Refactoring confidence with type checking

### 📝 **Better Documentation**
- Self-documenting code through type annotations
- Clear API contracts with interface definitions
- Easier onboarding for new developers

### 🧪 **Improved Testing**
- Type-safe test mocks and assertions
- Better test coverage with compile-time validation
- Reduced false positives in test scenarios

### 🚀 **Development Experience**
- Auto-completion and error detection in IDE
- Better code navigation and refactoring tools
- Consistent code style across the project

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of a coding challenge and is for demonstration purposes.