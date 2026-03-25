@AGENTS.md

## Commit Convention

Format: `{type}({scope}): {description}`

Types:
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation
- **style**: Formatting, no code change
- **refactor**: Code restructuring
- **test**: Adding/modifying tests
- **chore**: Maintenance, dependencies

Examples:
- `feat(t2): add git hooks for commit validation`
- `fix(t3): resolve schema parsing error`
- `docs(readme): update installation guide`

Hook: `githooks/commit-msg` validates format on commit.
Configuration: `git config core.hooksPath "$(pwd)/githooks"` (already set in local repo)
