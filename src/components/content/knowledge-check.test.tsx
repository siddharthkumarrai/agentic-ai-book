import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { KnowledgeCheck } from "@/components/content/knowledge-check";

afterEach(cleanup);

const questions = [
  {
    id: "test-q1",
    prompt: "What is inference?",
    options: [
      { value: "a", label: "Training" },
      { value: "b", label: "Generating output" },
    ],
    correctOption: "b",
    explanation: "Inference generates output from a trained model.",
  },
];

describe("KnowledgeCheck", () => {
  it("submits an answer and calculates the score", () => {
    render(<KnowledgeCheck questions={questions} />);

    fireEvent.click(screen.getByLabelText("Generating output"));
    fireEvent.click(screen.getByRole("button", { name: "Submit answers" }));

    expect(screen.getByText("Score: 1/1")).toBeTruthy();
    expect(screen.getByText("Correct")).toBeTruthy();
  });

  it("supports retrying after submission", () => {
    render(<KnowledgeCheck questions={questions} />);

    fireEvent.click(screen.getByLabelText("Training"));
    fireEvent.click(screen.getByRole("button", { name: "Submit answers" }));
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));

    expect(screen.queryByText("Score:")).toBeNull();
  });
});
