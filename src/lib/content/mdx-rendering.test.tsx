import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { KnowledgeCheck } from "@/components/content/knowledge-check";

describe("MDX lesson rendering", () => {
  it("renders GFM tables and preserves KnowledgeCheck question props", async () => {
    const { content } = await compileMDX({
      source: `| Concept | Meaning |
| --- | --- |
| Inference | Generating output |

<KnowledgeCheck questions={[
  {
    id: "inference-q1",
    prompt: "What is inference?",
    options: [{ value: "a", label: "Generating output" }],
    correctOption: "a",
    explanation: "Inference generates output from a trained model."
  }
]} />`,
      components: { KnowledgeCheck },
      options: {
        blockJS: false,
        blockDangerousJS: true,
        mdxOptions: { remarkPlugins: [remarkGfm] },
      },
    });

    const html = renderToStaticMarkup(content);

    expect(html).toContain("<table>");
    expect(html).toContain("What is inference?");
    expect(html).toContain("Generating output");
  });
});
