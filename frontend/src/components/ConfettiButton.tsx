import styles from "@/src/components/ConfettiButton.module.scss";
import { Button } from "@nextui-org/react";
import React from "react";
import confetti from "canvas-confetti";

const ConfettiButton = () => {
  const handleConfetti = () => {
    confetti({});
  };

  return (
    <Button
      auto
      rounded
      ripple={false}
      size="xl"
      onClick={handleConfetti}
      css={{
        background: "#0F9549",
        fontWeight: "$semibold",
        position: "relative",
        overflow: "visible",
        color: "$white",
        px: "$18"
      }}
    >
      Click me
    </Button>
  );
};

export default ConfettiButton;