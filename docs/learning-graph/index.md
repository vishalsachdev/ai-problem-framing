# Learning Graph

This course is built on a structured learning graph of 200 concepts organized into a directed acyclic graph (DAG). The learning graph ensures proper prerequisite sequencing and enables adaptive learning paths.

## Concept Categories

| Category | Description | Count |
|----------|-------------|-------|
| **Foundation (FOUND)** | Core concepts with no prerequisites | ~25 |
| **Basic (BASIC)** | Build on foundations | ~45 |
| **Intermediate (INTER)** | Build on basics | ~60 |
| **Advanced (ADV)** | Build on intermediate | ~45 |
| **Application (APP)** | Synthesize multiple concepts | ~25 |

## Viewing the Graph

The learning graph data is stored in JSON format:

- [learning-graph.json](learning-graph.json) - Full concept graph with dependencies

## Using the Learning Graph

The learning graph supports:

1. **Prerequisite tracking** - Each concept lists its dependencies
2. **Chapter alignment** - Concepts are mapped to chapters
3. **Bloom's levels** - Each concept indicates its cognitive level
4. **Adaptive paths** - Skip concepts you already know, focus on gaps

## Sample Concept Entry

```json
{
  "id": 42,
  "name": "The Loop Framework",
  "category": "INTER",
  "depends_on": [15, 23, 31],
  "chapter": 3,
  "bloom_level": "apply",
  "description": "5-step systematic process for AI problem framing"
}
```
