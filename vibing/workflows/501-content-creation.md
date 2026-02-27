# Workflow: 501 - Content Creation

**Objective**: Create accessible theological content that is both doctrinally accurate and engaging for a lay audience. This workflow coordinates a theologian expert with a text writer to produce content that anyone can understand while maintaining Catholic Church teaching accuracy.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding.

- **Topic**: What theological topic or question needs to be addressed
- **Target audience**: Who is this content for (e.g., teenagers, young adults, general audience)
- **Content type**: What format is needed (article, talk, blog post, etc.)
- **Context**: Any background information, user stories, or specific points to cover

## Validation Questions

1. **Topic clarity**: Is the specific theological topic clearly defined?
2. **Audience**: Who is the target reader/listener?
3. **Purpose**: What should the reader take away after consuming this content?

## Agents to Invoke

- [ ] Activate @vibing/agents/theologian-expert.md for theological research
- [ ] Activate @vibing/agents/text-writer.md for content writing

## Design Context

- [ ] Reference @vibing/agents/research-agent.md for research methodology patterns

## Execute Checklist

### Phase 1: Research (Theologian Expert)

- [ ] Activate @vibing/agents/theologian-expert.md
- [ ] Provide topic, context, and any user-provided information
- [ ] Research the theological topic thoroughly using internet search
- [ ] Verify all facts against Catholic Church doctrine (Catechism, papal documents, Scripture)
- [ ] Cross-reference any claims with authoritative Catholic sources
- [ ] Provide comprehensive research output including:
  - Key theological points
  - Catholic teaching summary
  - Scriptural/Catechism references
  - **Bible verse notations**: Include specific chapter and verse references ONLY when directly quoting Scripture or when it provides significant value for the reader to verify the claim
  - Any areas requiring careful handling
  - Verification notes

### Phase 2: Content Writing (Text Writer)

- [ ] Activate @vibing/agents/text-writer.md
- [ ] Provide theologian expert's research findings
- [ ] Write content that:
   - Does not assume the reader has any prior familiarity with the Bible, Church teaching, or Christian doctrine. All references to biblical stories, terms, or doctrines must be introduced with brief, neutral context.
   - Hooks and introductions should be universally relatable, not dependent on exposure to religious content.
  - Translates complex theology into accessible language
  - Is readable by teenagers but uses adult vocabulary
  - Maintains personal, conversational tone
  - Engages readers with relatable stories or questions
  - Accurately represents Catholic teaching
- [ ] Run all factual claims by theologian-expert for verification
- [ ] Revise content based on any feedback

- Word-count enforcement (evidence articles):
- [ ] Confirm content is an "evidence article" (this triggers the word-count rule).
- [ ] Run a word-count on the article body and record the total: **\_\_** words.
- [ ] Verify the word count is within the required range (600–1,400 words). If not, revise and re-count.

### Phase 3: Quality Assurance

- [ ] Verify all theological claims are accurate
- [ ] Confirm content aligns with Catholic Church teaching
- [ ] Check readability for target audience
- [ ] Ensure voice and tone consistency
- [ ] Verify no section of content presumes the reader has biblical or church background; ensure all references and examples are neutrally introduced.
- [ ] Final review of content before completion

## Collaboration Pattern

1. **Theologian Expert** researches the topic and provides:
   - Doctrinal accuracy verification
   - Key points to cover
   - Citations and references
   - Potential pitfalls or sensitive areas

2. **Text Writer** transforms research into accessible content:
   - Uses theologian's findings as foundation
   - Writes in conversational, engaging style
   - Targets teenage to young adult audience
   - Maintains accuracy while improving accessibility

3. **Verification loop**: Text writer can consult theologian expert on any claims before finalizing

## Notes

- All content must align with the Magisterium of the Catholic Church
- Reference @vibing/agents/research-agent.md for research methodology patterns (internet search, source verification)
- Text writer has embedded style/tone guidance - see @vibing/agents/text-writer.md
- Content should be accessible to teenagers while using adult vocabulary
