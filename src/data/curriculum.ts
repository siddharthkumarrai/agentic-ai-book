import type { SectionMetadata } from "@/types/content";

export const curriculum: SectionMetadata[] = [
  {
    title: "LLM Foundations",
    slug: "llm-foundations",
    sequence: 2,
    description: "Tokens, context, inference, model selection and API engineering.",
  },
  {
    title: "Prompting, Context and Structured Outputs",
    slug: "prompting-context-and-structured-outputs",
    sequence: 3,
    description: "Prompt design, context engineering, schemas and output validation.",
  },
  {
    title: "Tools and Agent Loops",
    slug: "tools-and-agent-loops",
    sequence: 4,
    description: "Function calling, tool design, permissions, retries and stopping.",
  },
  {
    title: "Agent Architecture",
    slug: "agent-architecture",
    sequence: 5,
    description: "Routing, planning, state, guardrails and stop conditions.",
  },
  {
    title: "RAG and Retrieval",
    slug: "rag-and-retrieval",
    sequence: 6,
    description: "Ingestion, chunking, embeddings, hybrid retrieval and citations.",
  },
  {
    title: "Memory and State",
    slug: "memory-and-state",
    sequence: 7,
    description: "Conversation state, user memory, stores and data lifecycle.",
  },
  {
    title: "Orchestration and Durable Workflows",
    slug: "orchestration-and-durable-workflows",
    sequence: 8,
    description: "Graphs, queues, checkpoints, retries and resumability.",
  },
  {
    title: "Multi-Agent Systems",
    slug: "multi-agent-systems",
    sequence: 9,
    description: "Delegation, specialists, supervisors and coordination costs.",
  },
  {
    title: "MCP Protocol",
    slug: "mcp-protocol",
    sequence: 10,
    description: "MCP concepts, servers, clients, tools, resources and prompts.",
  },
  {
    title: "A2A Protocol",
    slug: "a2a-protocol",
    sequence: 11,
    description: "Agent discovery, task exchange, transport and trust boundaries.",
  },
  {
    title: "Evaluation and Testing",
    slug: "evaluation-and-testing",
    sequence: 12,
    description: "Test datasets, graders, trajectories and regression analysis.",
  },
  {
    title: "Observability and Operations",
    slug: "observability-and-operations",
    sequence: 13,
    description: "Tracing, logs, metrics, latency, cost and incident response.",
  },
  {
    title: "Security and Governance",
    slug: "security-and-governance",
    sequence: 14,
    description: "Threat modeling, authorization, safety and human approval.",
  },
  {
    title: "Production Engineering",
    slug: "production-engineering",
    sequence: 15,
    description: "FastAPI, databases, queues, CI/CD and deployment.",
  },
  {
    title: "Advanced Specializations",
    slug: "advanced-specializations",
    sequence: 16,
    description: "Coding, browser use, voice, multimodal systems and fine-tuning.",
  },
];

export function getSection(slug: string) {
  return curriculum.find((section) => section.slug === slug);
}
