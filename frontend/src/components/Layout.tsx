import { Content } from "@/src/components/Content"
import { Box } from "@/src/components/Box";

export const Layout = ({ children }: { children: any}) => (
  <Box
    css={{
      maxW: "100%"
    }}
  >
    {children}
    <Content />
  </Box>
);