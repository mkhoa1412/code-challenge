# Currency Swap Form

A modern, interactive currency swap form, featuring real-time exchange rates and token selection.

## Features

- **Real-time Token Prices**: Fetches current token prices from Switcheo API
- **Token Selection**: Dropdown with token icons and names
- **Live Exchange Rate Calculation**: Automatic conversion between selected tokens
- **Input Validation**: Error handling and user feedback
- **Responsive Design**: Modern UI that works on all devices
- **Token Icons**: High-quality SVG icons from Switcheo token repository

## Tech Stack

- **Vite**: Fast build tool and development server
- **Vanilla JavaScript**: No framework dependencies for optimal performance
- **CSS3**: Modern styling with flexbox and animations
- **Switcheo APIs**: Token prices and icons

## API Endpoints

- **Token Prices**: `https://interview.switcheo.com/prices.json`
- **Token Icons**: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/{SYMBOL}.svg`

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

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
├── main.js          # Application entry point
├── style.css        # Main stylesheet
├── swap-form.js     # Swap form component logic
└── api.js           # API utilities for fetching token data
```

## Development

The application is built with modern ES6+ JavaScript and uses:

- CSS custom properties for theming
- Async/await for API calls
- Error boundaries for robust error handling
- Responsive design principles

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of a coding challenge and is for demonstration purposes.