import { render, screen } from "@testing-library/react";
import Loading from "@/src/components/util/Loading";

describe("Loading", () => {
  beforeEach(() => {
    render(<Loading />);
  });

  it("should render", () => {
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});
