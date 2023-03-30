import clientPromise from "@/src/mongo/mongodb";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

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
  if (!isConnected) {
    return <h4>Error: Database is not connected</h4>;
  }

  return <h1 className="title">Ping Pong Tracker!</h1>;
}
