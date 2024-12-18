/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/App` | `/_sitemap` | `/components/LogoComponent` | `/firebase/firebaseConfig` | `/navigation/AppNavigator` | `/screens/DetailKostScreen` | `/screens/HomeScreen` | `/screens/LoginOptionsScreen` | `/screens/LoginScreen` | `/screens/PencariKostScreen` | `/screens/PenyediaKostScreen` | `/screens/RegisterScreen` | `/screens/RiwayatPemesananScreen`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
