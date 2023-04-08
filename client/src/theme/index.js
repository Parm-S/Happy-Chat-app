import { extendTheme } from "@chakra-ui/react";
import { containerTheme } from "./Container";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode("F5FBFF", "#040720")(props),
        minH: "100vh",
        backgroundImage: mode(
          "linear-gradient(315deg, #d5fefd 0%, #fffcff 74%)",
          "linear-gradient(315deg, #537895 0%, #09203f 74%)"
        ),
      },
    }),
  },
  components: {
    Container: containerTheme,
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

export default theme;
