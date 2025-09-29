# My Movie 🎬

A React Native movie search application built with Expo that allows users to search for movies and view detailed information using the OMDb API.

## Features

- 🔍 **Movie Search**: Search for movies by title using the OMDb API
- 📱 **Cross-Platform**: Runs on iOS, Android, and Web
- 🎯 **Movie Details**: View detailed information including plot, director, actors, and ratings
- 🧭 **Navigation**: Smooth navigation between search results and movie details
- 📊 **Loading States**: Visual feedback during API calls
- 🍞 **Toast Notifications**: User-friendly error and success messages
- 📱 **Responsive Design**: Clean and intuitive user interface

## Screenshots

*Add screenshots of your app here*

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack Navigator)
- **API**: OMDb API for movie data
- **UI Components**: React Native built-in components
- **Notifications**: React Native Toast Message

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saiwaiyanphyo/my-movie.git
   cd my-movie
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on your preferred platform**
   - **iOS**: Press `i` in the terminal or run `npm run ios`
   - **Android**: Press `a` in the terminal or run `npm run android`
   - **Web**: Press `w` in the terminal or run `npm run web`

## Project Structure

```
my-movie/
├── App.tsx              # Main application component with navigation
├── api.ts               # OMDb API service and types
├── index.ts             # Entry point
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── app.json             # Expo configuration
├── assets/              # Static assets (icons, images)
│   ├── icon.png
│   ├── splash-icon.png
│   ├── favicon.png
│   └── adaptive-icon.png
└── README.md           # Project documentation
```

## API Information

This app uses the [OMDb API](http://www.omdbapi.com/) to fetch movie data. The current implementation uses a demo API key with limited usage.

For production use:
1. Get your own API key from [OMDb API](http://www.omdbapi.com/apikey.aspx)
2. Replace the `API_KEY` in `api.ts`

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser

## Dependencies

### Main Dependencies
- **expo**: ~54.0.9 - The Expo SDK
- **react**: 19.1.0 - React library
- **react-native**: 0.81.4 - React Native framework
- **@react-navigation/native**: ^7.1.17 - Navigation library
- **@react-navigation/stack**: ^7.4.8 - Stack navigator
- **react-native-toast-message**: ^2.3.3 - Toast notifications

### Dev Dependencies
- **typescript**: ~5.9.2 - TypeScript support
- **@types/react**: ~19.1.0 - React type definitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Add movie favorites/watchlist functionality
- [ ] Implement local storage for search history
- [ ] Add movie trailers integration
- [ ] Implement user authentication
- [ ] Add movie recommendations
- [ ] Add dark/light theme toggle
- [ ] Implement offline functionality
- [ ] Add movie rating and review features

## Known Issues

- The demo API key has limited usage - get your own for production
- Some movie posters might not load if URLs are invalid

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

**Sai Wai Yan Phyo**
- GitHub: [@saiwaiyanphyo](https://github.com/saiwaiyanphyo)
- Project Link: [https://github.com/saiwaiyanphyo/my-movie](https://github.com/saiwaiyanphyo/my-movie)

## Acknowledgments

- [OMDb API](http://www.omdbapi.com/) for providing movie data
- [Expo](https://expo.dev/) for the amazing development platform
- [React Navigation](https://reactnavigation.org/) for navigation solution