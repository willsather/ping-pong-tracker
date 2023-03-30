import styles from "@/pages/index.module.scss";
import clientPromise from "@/src/mongo/mongodb";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import { Button, Link, Navbar, Text, useTheme } from "@nextui-org/react";
import { Layout } from "@/src/components/Layout";
import PingPong from "@/public/assets/PingPong.svg";

export const getServerSideProps: GetServerSideProps<{
  isConnected: boolean;
}> = async () => {
  try {
    await clientPromise;

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const variant = "highlight-rounded";
  const activeColor = "error";

  const { isDark } = useTheme();

  if (!isConnected) {
    return <h4>Error: Database is not connected</h4>;
  }


  return (
    <Layout>
      <Navbar isBordered={isDark} >
        <Navbar.Brand className={styles.brand}>
          <PingPong className={styles.pingPongLogo}/>
          <Text b color="inherit" hideIn="xs">
            Ping Pong Tracker
          </Text>
        </Navbar.Brand>
        {/*<Navbar.Content activeColor={activeColor} hideIn="xs" variant={variant}>*/}
        {/*  <Navbar.Link href="#">Leaderboard</Navbar.Link>*/}
        {/*  <Navbar.Link isActive href="#">*/}
        {/*    Recent*/}
        {/*  </Navbar.Link>*/}
        {/*</Navbar.Content>*/}
        {/*<Navbar.Content>*/}
        {/*  <Navbar.Link color="inherit" href="#">*/}
        {/*    Login*/}
        {/*  </Navbar.Link>*/}
        {/*  <Navbar.Item>*/}
        {/*    <Button auto flat as={Link} color={activeColor} href="#">*/}
        {/*      Sign Up*/}
        {/*    </Button>*/}
        {/*  </Navbar.Item>*/}
        {/*</Navbar.Content>*/}
      </Navbar>
    </Layout>
  );
}
