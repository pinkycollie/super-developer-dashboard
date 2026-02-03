# Prompt Engineering Guidelines

## Overview

This guide helps you create effective prompts for AI-assisted development, code generation, and problem-solving using the Super Developer Dashboard.

## What is Prompt Engineering?

Prompt engineering is the practice of designing and refining inputs (prompts) to get optimal outputs from AI models. In development contexts, good prompts can:

- Generate high-quality code
- Solve complex problems
- Provide accurate explanations
- Create comprehensive documentation
- Debug issues efficiently

## Core Principles

### 1. Be Specific and Clear

**Bad**:
```
Create a form
```

**Good**:
```
Create a React component for a user registration form with the following fields:
- Email (required, validated)
- Password (required, min 8 characters)
- Confirm Password (required, must match password)
Include client-side validation and error messages using React Hook Form.
```

### 2. Provide Context

**Bad**:
```
Fix this code
```

**Good**:
```
This Next.js API route is returning a 500 error when the database is down.
I need to add proper error handling that:
1. Catches database connection errors
2. Returns a 503 status with a helpful message
3. Logs the error for debugging

[code snippet]
```

### 3. Specify Format and Constraints

**Bad**:
```
Write tests
```

**Good**:
```
Write Jest unit tests for the UserProfile component that:
- Test successful data fetching
- Test loading state
- Test error handling
- Use React Testing Library
- Follow the existing test patterns in __tests__/components/
- Include at least 80% code coverage
```

### 4. Break Down Complex Tasks

**Bad**:
```
Build a complete authentication system
```

**Good**:
```
Step 1: Create a login form component with email and password fields
Step 2: Implement form validation using Zod
Step 3: Connect the form to Supabase authentication
Step 4: Add error handling and loading states
Step 5: Implement redirect after successful login
```

## Prompt Templates

### Code Generation

#### React Component
```
Create a [component type] React component that:
- Purpose: [describe what it does]
- Props: [list expected props with types]
- State: [describe internal state if any]
- Styling: Use [Tailwind CSS / styled-components / CSS modules]
- Accessibility: Include proper ARIA labels and keyboard navigation
- TypeScript: Use strict types

Example usage:
<ComponentName prop1="value" prop2={data} />
```

#### API Route
```
Create a Next.js API route at /api/[endpoint] that:
- Method: [GET / POST / PUT / DELETE]
- Purpose: [describe functionality]
- Input: [expected request body/params]
- Output: [response format]
- Authentication: [required / optional / none]
- Error handling: Return appropriate status codes
- Validation: Use Zod schema for input validation

Example request:
[JSON example]

Example response:
[JSON example]
```

#### Database Schema
```
Design a Supabase table for [entity] with:
- Fields: [list fields with types]
- Relationships: [describe foreign keys]
- RLS Policies: [describe access control]
- Indexes: [specify indexed columns]
- Triggers: [any automatic behaviors]

Include SQL for:
1. Table creation
2. RLS policies
3. Indexes
```

### Code Review and Refactoring

#### Code Review
```
Review this code for:
1. Security vulnerabilities
2. Performance issues
3. Code quality (readability, maintainability)
4. Best practices compliance
5. TypeScript type safety

Code:
[paste code]

Focus areas: [specific concerns]
```

#### Refactoring
```
Refactor this [component/function/file] to:
- Improve: [specific aspect]
- Maintain: [what should stay the same]
- Follow: [specific patterns or conventions]
- Avoid: [what not to do]

Current code:
[paste code]

Constraints:
- Keep existing functionality
- Maintain backward compatibility
- Follow existing code style
```

### Debugging

#### Error Investigation
```
I'm encountering this error:
[error message]

Context:
- What I was doing: [user action]
- Expected behavior: [description]
- Actual behavior: [description]
- Environment: [browser, OS, Node version, etc.]
- Recent changes: [code changes before error]

Relevant code:
[paste relevant code sections]

Logs:
[paste relevant logs]
```

#### Performance Optimization
```
This [component/function/query] is slow:
- Current performance: [metrics]
- Target performance: [goal]
- Constraints: [limitations]

Code:
[paste code]

Profiling data (if available):
[profiling information]

Please suggest optimizations focusing on:
1. [specific area]
2. [specific area]
```

### Documentation

#### Component Documentation
```
Write comprehensive documentation for [ComponentName] including:
1. Purpose and use cases
2. Props table with types and descriptions
3. Usage examples (basic and advanced)
4. Styling and customization options
5. Accessibility features
6. Common patterns and best practices

Component code:
[paste component]
```

#### API Documentation
```
Document the API endpoint /api/[endpoint]:
1. Description and purpose
2. Authentication requirements
3. Request format (method, headers, body)
4. Response format (success and error cases)
5. Status codes
6. Examples (curl and JavaScript)
7. Rate limits
8. Common errors and solutions

Endpoint code:
[paste code]
```

## Domain-Specific Prompts

### For UI/UX Development

```
Design a [interface element] that:
- Visual Style: [modern, minimal, glassmorphic, etc.]
- Color Scheme: [description or palette]
- Layout: [responsive behavior]
- Interactions: [hover states, animations, transitions]
- Accessibility: WCAG 2.1 AA compliant
- Dark Mode: Support both light and dark themes

Reference: Similar to [example or inspiration]
Framework: [Tailwind CSS, shadcn/ui, etc.]
```

### For Database Operations

```
Create Supabase operations for [feature]:

1. Schema:
   [describe tables and relationships]

2. Queries needed:
   - [list query types: CRUD, joins, aggregations]

3. Real-time requirements:
   - [what needs live updates]

4. RLS policies:
   - [access control requirements]

5. Performance considerations:
   - [indexing needs, query optimization]

Include TypeScript types and error handling.
```

### For Testing

```
Create tests for [feature/component]:

Test Framework: [Jest, Vitest, Playwright, etc.]
Type: [unit / integration / e2e]

Test Coverage:
1. Happy path scenarios
2. Edge cases
3. Error conditions
4. Loading states
5. User interactions

Test Data:
[describe test fixtures or mocks needed]

Assertions:
[key behaviors to verify]
```

## Advanced Techniques

### Iterative Refinement

Start broad, then refine:

1. **Initial Prompt**:
   ```
   Create a user dashboard component
   ```

2. **Add Details**:
   ```
   Create a user dashboard component with widgets for:
   - Recent activity
   - Statistics
   - Quick actions
   ```

3. **Specify Requirements**:
   ```
   Create a responsive user dashboard component using React and Tailwind CSS.
   Include widgets for:
   - Recent activity (list of last 10 actions)
   - Statistics (cards with numbers and trend indicators)
   - Quick actions (button grid)
   
   Make it:
   - Responsive (mobile, tablet, desktop)
   - Dark mode compatible
   - Accessible (WCAG 2.1 AA)
   - Type-safe with TypeScript
   ```

### Chain-of-Thought Prompting

For complex problems, ask for step-by-step reasoning:

```
I need to implement [feature]. Please:

1. First, analyze the requirements and identify potential challenges
2. Then, propose an architecture or approach
3. Break down the implementation into steps
4. Identify dependencies and prerequisites
5. Finally, provide the code with explanations

Feature requirements:
[detailed description]
```

### Few-Shot Learning

Provide examples of desired output:

```
Generate API routes following this pattern:

Example 1:
// /api/users/[id].ts
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', params.id)
    .single()
  
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

Now create a similar route for: [new endpoint]
```

## Best Practices

### DO:

✅ Be specific about technologies and versions
✅ Provide relevant context and constraints
✅ Ask for explanations alongside code
✅ Request error handling and edge cases
✅ Specify coding standards and style guides
✅ Include examples when possible
✅ Break complex tasks into steps
✅ Ask for tests alongside implementation

### DON'T:

❌ Be vague or ambiguous
❌ Assume context that wasn't provided
❌ Skip error handling requirements
❌ Forget accessibility requirements
❌ Ignore security considerations
❌ Mix multiple unrelated tasks
❌ Expect perfect output on first try
❌ Skip code review and testing

## Using the Prompt Library

The dashboard includes a built-in prompt library:

1. **Browse Categories**: Navigate through categorized prompts
2. **Search**: Find prompts by keywords
3. **Copy and Customize**: Use prompts as templates
4. **Save Favorites**: Star frequently used prompts
5. **Create Custom**: Build your own prompt templates

### Contributing to the Library

Share effective prompts:

```typescript
// Add to components/prompt-library.tsx
{
  title: "Your Prompt Title",
  description: "Brief description",
  prompt: "The actual prompt template with [placeholders]",
  tags: ["relevant", "tags"],
  category: "Code Generation"
}
```

## Examples by Use Case

### 1. Building a New Feature

```
I need to add a [feature name] to the dashboard.

Requirements:
- User story: As a [user type], I want to [action] so that [benefit]
- Acceptance criteria:
  1. [criterion]
  2. [criterion]
  3. [criterion]

Technical requirements:
- Framework: Next.js 14 with App Router
- Database: Supabase
- Styling: Tailwind CSS
- State: React Context / Zustand
- Authentication: Required

Current architecture:
[brief description of relevant existing code]

Please provide:
1. Component structure
2. Data flow diagram
3. Implementation steps
4. Code with comments
```

### 2. Debugging an Issue

```
Bug Report:

Description: [what's wrong]
Steps to reproduce:
1. [step]
2. [step]
3. [step]

Expected: [correct behavior]
Actual: [wrong behavior]

Error messages:
[paste errors]

Relevant code:
[paste code]

Environment:
- Next.js: 14.2.16
- Node: 20.x
- Browser: Chrome 120

What I've tried:
- [attempted solution 1]
- [attempted solution 2]

Please help me:
1. Identify the root cause
2. Provide a fix
3. Explain why it happened
4. Suggest how to prevent similar issues
```

### 3. Code Review Request

```
Please review this code for:

Focus areas:
1. Security vulnerabilities
2. Performance bottlenecks
3. Code organization
4. TypeScript best practices
5. React patterns

Code:
[paste code]

Context:
- Purpose: [what it does]
- Used by: [where it's used]
- Performance requirements: [if any]

Please provide:
- Issues found (with severity: critical/high/medium/low)
- Suggested fixes
- Alternative approaches if applicable
```

## Measuring Prompt Effectiveness

Good prompts should result in:

- ✅ Working code on first or second iteration
- ✅ Code that follows project conventions
- ✅ Comprehensive error handling
- ✅ Clear explanations
- ✅ Consideration of edge cases
- ✅ Appropriate test coverage

Poor prompts lead to:

- ❌ Multiple back-and-forth iterations
- ❌ Incomplete solutions
- ❌ Missing error handling
- ❌ Unclear explanations
- ❌ Overlooked requirements

## Resources

- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic Prompt Engineering](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [Learn Prompting](https://learnprompting.org/)

## Feedback

Share your best prompts and techniques! The prompt library grows with community contributions.
