# Workflow: 501 - Content Creation

**Objective**: Create accessible theological content that is both doctrinally accurate and engaging for a general audience. This workflow coordinates a theologian expert with a text writer to produce content at the national reading level (6th-7th grade) that anyone can understand while maintaining Catholic Church teaching accuracy.

## Target Audience

- **General audience**: Everyone
- **Specifically**: Laypeople, atheists, agnostics, and spiritual individuals who do not believe in God or Jesus Christ
- **Reading level**: National reading level (6th-7th grade, approximately age 11-12)

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding.

- **Topic**: What theological topic or question needs to be addressed
- **Content type**: What format is needed (article, talk, blog post, etc.)
- **Context**: Any background information, user stories, or specific points to cover

## Validation Questions

1. **Topic clarity**: Is the specific theological topic clearly defined?
2. **Audience**: General audience - laypeople, atheists, agnostics, spiritual non-believers
3. **Purpose**: What should the reader take away after consuming this content?

## Agents to Invoke

- [ ] Activate @vibing/agents/theologian-expert.md for theological research
- [ ] Activate @vibing/agents/text-writer.md for content writing

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
- [ ] Write content following @vibing/rules/evidence-creation-rules.md
- [ ] Run all factual claims by theologian-expert for verification
- [ ] Revise content based on any feedback

### Phase 3: Quality Assurance

Complete all enforcement checks before finalizing:

#### Word Count

- [ ] Confirm content is an "evidence article"
- [ ] Run word-count on article body: **\_\_** words
- [ ] Verify within 600–1,400 range (revise if outside range)

#### Reading Level Check

- [ ] Content is at 6th-7th grade reading level
- [ ] Simple, plain English used throughout
- [ ] No complex vocabulary or sentence structures
- [ ] Write like speaking to someone over coffee

#### Hook Check

- [ ] Opening is either a question OR an aha fact/statement
- [ ] Hook is compelling and leads naturally into the topic

#### Closing Check

- [ ] Ends with reflection, not a call to action
- [ ] This is information sharing

#### Hyphenated Sentence Check

- [ ] Scan for em-dashes (—), en-dashes (–), or hyphenated clause connectors
- [ ] Break any found into separate sentences

#### Hype Language Check

- [ ] Scan for prohibited phrases: "Here's where it gets crazy," "This is where it gets interesting," "Get this," "There is more"
- [ ] Remove or rephrase any found

#### Signposting Phrase Check

- [ ] Limit phrases to 1-2 per article
- [ ] Acceptable for opening hook only—do not repeat throughout

#### Text Emphasis Check

- [ ] Minimize bold, italics, and other text decoration
- [ ] Only use formatting when truly needed for clarity

#### External Links Check

- [ ] Links are only for verification purposes
- [ ] Only authoritative sources included
- [ ] All links are functional

#### Sources/References Check

- [ ] All sources in front matter as references
- [ ] Include author, title, publication, date, URL
- [ ] Consistent citation format

#### Background Assumption Check

- [ ] Verify no section presumes reader has biblical or church background
- [ ] Ensure all references and examples are neutrally introduced
- [ ] Write for atheists, agnostics, spiritual non-believers, and the unchurched

#### Term Definition Check

- [ ] Define terms a general audience would not know
- [ ] Skip definitions for: archaeology, inscription, manuscript, excavation, prophecy, resurrection

#### Verse Reference Check (if applicable)

- [ ] Verify all Bible verse references are correct
- [ ] Ensure BibleGateway links are properly formatted
- [ ] Confirm theologian-expert verified all verse references

#### Final Review

- [ ] Verify all theological claims are accurate
- [ ] Confirm content aligns with Catholic Church teaching
- [ ] Check readability at national reading level (6th-7th grade)
- [ ] Ensure voice and tone consistency

## Collaboration Pattern

1. **Theologian Expert** researches the topic and provides:
   - Doctrinal accuracy verification
   - Key points to cover
   - Citations and references
   - Potential pitfalls or sensitive areas

2. **Text Writer** transforms research into accessible content:
   - Uses theologian's findings as foundation
   - Writes in conversational, engaging style
   - Targets general audience at 6th-7th grade reading level
   - Maintains accuracy while improving accessibility

3. **Verification loop**: Text writer can consult theologian expert on any claims before finalizing

## Notes

- All content must align with the Magisterium of the Catholic Church
- Reference @vibing/rules/evidence-creation-rules.md for complete writing rules
- Text writer has embedded style/tone guidance - see @vibing/agents/text-writer.md
- Content should be at national reading level (6th-7th grade)
- Target audience: general audience, specifically atheists, agnostics, spiritual non-believers
