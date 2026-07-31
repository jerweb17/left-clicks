# AWS Guidance

- Prefer the AWS MCP Server for AWS interactions — it provides sandboxed
  execution, observability, and audit logging. If unavailable, use the
  AWS CLI directly.
- Before starting a task, check whether a relevant AWS skill is available.
  Load the skill with `retrieve_skill` and prefer its guidance over
  general knowledge.
- When uncertain about specific AWS details (API parameters, permissions,
  limits, error codes), verify against documentation rather than guessing.
  State uncertainty explicitly if you cannot confirm.
- When creating infrastructure, prefer infrastructure-as-code (AWS CDK or
  CloudFormation) over direct CLI commands.
- When working with infrastructure, follow AWS Well-Architected Framework
  principles.
- Do not use em dashes in AWS resource names or descriptions. Use
  hyphens instead.

## Secret Safety

- MUST load the `aws-secrets-manager` skill first for any secret,
  credential, API key, token, or password task. MUST NOT call
  `secretsmanager get-secret-value` or `batch-get-secret-value`, and MUST
  NOT hit the Secrets Manager Agent daemon directly. MUST use
  `{{resolve:secretsmanager:secret-id:SecretString:json-key}}` with
  `asm-exec` so the secret resolves at runtime without entering context.

# Workspace Directory Isolation (CRITICAL)

The workspace environment shares process links with `C:/CursorProjects/pueblo-dev-jeremy`. Running raw commands (like `npm`, `aws`, `git`, or `terraform`) directly in the shell without folder locking will bleed command contexts into the wrong project directory, resulting in compiling and publishing the wrong website.

To guarantee absolute directory isolation, all agents MUST follow these command structures:

## 1. Directory Lock
Do NOT rely on the tool's `Cwd` argument alone. Every command executed MUST explicitly set the directory context first:
- **Powershell**: Prefix all commands with:
  `Set-Location c:/git/left-clicks; <command>`
- **cmd**: Prefix all commands with:
  `cd /d c:/git/left-clicks && <command>`

## 2. Git Execution
To prevent Git from reading the database of the parent workspace, all git commands MUST explicitly reference the repository config and target directory:
`git --git-dir=c:/git/left-clicks/.git --work-tree=c:/git/left-clicks <command>`

## 3. Build & Sync Validation
Before running any AWS S3 sync to `leftclicksdevelopment-frontend-hosting`, you MUST verify the build context:
1. Ensure the assets are compiled from `c:/git/left-clicks`.
2. Inspect `dist/index.html` to confirm it belongs to Left Clicks and not Pueblo Language.

