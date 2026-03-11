import { StatusBar } from "expo-status-bar";
import { Fragment, ReactNode } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import QueryProvider from "./QueryProvider";
type Props = { children: ReactNode };

export default function AppProviders({ children }: Props) {
  return (
    <Fragment>
      <QueryProvider>
        <SafeAreaProvider>
          {/* <SafeAreaView style={safeAreaStyle}> */}
          <KeyboardProvider>{children}</KeyboardProvider>
          <StatusBar style="auto" animated />
          <Toast />
          {/* </SafeAreaView> */}
        </SafeAreaProvider>
      </QueryProvider>
    </Fragment>
  );
}
// =-------- =------- =----- =---->
// Only for ThemeProvider, which is currently not used. Uncomment if you want to use it in the future.

// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { useColorScheme } from "@/hooks/use-color-scheme";
// import { StatusBar } from "expo-status-bar";
// import { Fragment, ReactNode } from "react";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import Toast from "react-native-toast-message";
// import QueryProvider from "./QueryProvider";
// type Props = { children: ReactNode };

// const safeAreaStyle = { flex: 1 };

// export default function AppProviders({ children }: Props) {
//   const colorScheme = useColorScheme();
//   console.log(colorScheme)
//   return (
//     <Fragment>
//       {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
//       <QueryProvider>
//         <SafeAreaProvider>
//           <SafeAreaView style={safeAreaStyle}>
//             {children}
//             <StatusBar style="auto" animated />
//             <Toast />
//           </SafeAreaView>
//         </SafeAreaProvider>
//       </QueryProvider>
//       {/* </ThemeProvider> */}
//     </Fragment>
//   );
// }
