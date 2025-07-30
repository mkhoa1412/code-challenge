# Token Swap Application

A modern React-based token swap form, fetching real-time token prices from Switcheo API.

## 🚀 Live Demo

**[View Live Demo on Vercel →](https://code-challenge-lovat-iota.vercel.app/)**

Experience the full-featured token swap application with:
- Real-time token prices from Switcheo API
- Interactive token selection with icons
- Live exchange rate calculations
- Modern glassmorphism UI with Tailwind CSS
- Complete form validation and toast notifications

## Features

- **Real-time Token Prices**: Fetches current token prices from Switcheo API
- **Dynamic Token Selection**: Automatically loads available tokens with their current prices
- **Token Icons**: Displays token icons from Switcheo's token repository
- **Bidirectional Input**: Enter amounts in either token field and see automatic conversion
- **Token Swapping**: Quick swap button to flip tokens with a smooth animation
- **Live Exchange Rates**: Displays current exchange rate between selected tokens
- **Responsive Design**: Works seamlessly on desktop and mobile devices with Tailwind CSS
- **Modern UI**: Glass morphism design with Tailwind's utility classes
- **Error Handling**: Graceful error handling for API failures with retry functionality

## Technologies Used

- **React 18**: Modern React with hooks for state management
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Vite**: Fast build tool and development server
- **Vitest**: Unit testing framework

## Styling Architecture

### Tailwind CSS Configuration
- **Custom Color Palette**: Extended with primary and accent color schemes
- **Custom Gradients**: Predefined gradients for buttons and backgrounds
- **Custom Animations**: Enhanced animations including slow bounce and pulse
- **Responsive Design**: Mobile-first approach with responsive breakpoints


### UI Features
- **Glass Morphism**: Translucent panels with backdrop blur effects
- **Gradient Backgrounds**: Smooth gradients for interactive elements
- **Micro-animations**: Hover states, loading spinners, and transitions
- **Dark Theme**: Professionally designed dark color scheme
- **Responsive Layout**: Adaptive layout for mobile and desktop

## API Integration

- **Token Prices**: `https://interview.switcheo.com/prices.json`
- **Token Icons**: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/{SYMBOL}.svg`

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
# Run tests once
npm run test:run

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run coverage
```

## How to Use

1. **Wait for Loading**: The app automatically loads available tokens from the API
2. **Enter Amount**: Type the amount you want to swap in either the "From" or "To" field
3. **Select Tokens**: Choose your source and target tokens from the dropdown menus (showing current prices)
4. **View Token Info**: See token icons and current USD prices below each selection
5. **Swap Tokens**: Click the swap button (⇅) to quickly flip the tokens
6. **View Exchange Rate**: See the current exchange rate displayed below the inputs
7. **Execute Swap**: Click "Swap Tokens" to simulate the token exchange transaction

## Project Structure

```
src/
├── components/
│   └── SwapForm.tsx          # Main swap form with Tailwind styling
├── App.tsx                   # Root application component
├── main.tsx                  # Application entry point
├── api.ts                    # API utilities and token data handling
├── style.css                 # Tailwind directives and custom components
└── test/
    └── swap-form.test.ts     # Unit tests for swap logic and API functions

Configuration:
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── vite.config.ts           # Vite configuration with React plugin
└── tsconfig.json            # TypeScript configuration
```

## API Functions

The application uses several API utility functions:

- `fetchTokenPrices()`: Fetches current token prices from Switcheo API
- `getAvailableTokens()`: Gets all available tokens with icons and prices
- `calculateExchange()`: Calculates exchange rates between tokens based on USD prices
- `formatNumber()`: Formats numbers with appropriate decimal places
- `getTokenIconUrl()`: Generates token icon URLs
- `validateTokenIcon()`: Validates if a token icon exists

## Data Flow

1. **Component Mount**: `SwapForm` loads tokens using `getAvailableTokens()`
2. **Token Selection**: User selects tokens from dropdowns populated with real data
3. **Price Calculation**: Exchange rates calculated using `calculateExchange()` with real prices
4. **Real-time Updates**: All calculations use live token prices from the API
5. **Error Handling**: Graceful fallbacks for API failures or missing data


### Animation & Interactions
- **Hover Effects**: Smooth transformations and color transitions
- **Loading States**: Animated spinners and skeleton loaders
- **Focus States**: Accessible focus indicators with ring utilities
- **Micro-interactions**: Button press animations and state feedback

## Error Handling

- **Network Failures**: Graceful handling of API connection issues
- **Invalid Data**: Robust validation and fallback for malformed API responses
- **Missing Icons**: Silent fallback when token icons are unavailable
- **Loading States**: Clear feedback during data fetching with Tailwind animations
- **Retry Mechanism**: Users can retry failed operations

## Testing

Comprehensive test suite covering:

- Token exchange calculation logic
- Number formatting functions
- Real-world token swap scenarios
- Edge cases and error conditions
- API function behavior

## Performance

- **Tailwind CSS**: Purged CSS for minimal bundle size
- **Component Optimization**: React.memo and useCallback where appropriate
- **API Caching**: Efficient token data caching
- **Lazy Loading**: On-demand resource loading

## Future Enhancements

- **Real-time Price Updates**: WebSocket integration for live price feeds
- **Historical Charts**: Price history visualization for selected tokens
- **Transaction History**: Local storage of swap history
- **Favorite Tokens**: Save frequently used token pairs
- **Advanced Filtering**: Search and filter tokens by various criteria
- **Slippage Protection**: Configurable slippage tolerance
- **Multi-chain Support**: Support for tokens across different blockchains
- **Theme Switching**: Light/dark mode toggle
- **Custom Animations**: Enhanced Tailwind animation library