Jira–GitHub Integration App (Forge)
===================================


This project is an [Atlassian Forge](https://developer.atlassian.com/platform/forge/) app that integrates **Jira** with **GitHub**.  
It allows Jira users to view, approve, and merge GitHub pull requests (PRs) that have associated Jira tickets directly from Jira. Once a PR is merged, the corresponding Jira issue is automatically transitioned to **Done**.

Features
--------

*   **Authentication**
    *   A dedicated screen to enter and store your GitHub API token securely.

*   **Repository Integration**
    *   Lists all GitHub repositories available for the authenticated user.
    *   Displays repository details (name, language, etc.).

*   **Pull Request Tracking**
    *   Detects open PRs related to a Jira issue.
    *   Pull requests are matched using the naming convention:

        ```title
        [ISSUE-KEY]: description
        ```

    *   Shows an empty state if no related PRs exist.

*   **Pull Request Management**
    *   Approve and merge pull requests directly from Jira.
    *   Provides a link to view the PR in GitHub.

*   **Jira Issue Automation**
    *   Uses GitHub webhooks + Forge webtriggers to detect when a PR is merged.
    *   Automatically transitions the related Jira issue to **Done**.

Initial Setup
-------------

1.  **Create Jira Site**  
    Ensure you have an Atlassian Jira site set up.

2.  **Generate Forge App**  
    Use the Forge CLI to create a new Jira app with the **Jira admin page module**.  
    Reference: [Jira Admin Page Module](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-admin-page/)

    ```bash
    forge create
    ```

3.  **Deploy App**  
    Deploy your app to your Jira site:

    ```bash
    forge deploy
    forge install
    ```

App Flow
--------

1.  **Auth Screen**

    *   Enter and save your GitHub Personal Access Token (PAT).
    *   Token is securely stored using Forge Storage APIs.

2.  **Repositories Screen**

    *   Fetches GitHub repositories.
    *   Shows repository details.
    *   Displays related pull requests for the current Jira issue.
    *   Allows approving and merging PRs.

3.  **PR Merge → Jira Automation**

    *   When a PR is merged:
        *   GitHub webhook triggers Forge webtrigger.
        *   Forge handler updates Jira issue status to **Done**.

Requirements
------------

*   [Node.js](https://nodejs.org/) (LTS recommended)  
*   [Atlassian Forge CLI](https://developer.atlassian.com/platform/forge/getting-started/)  
*   GitHub Personal Access Token with `repo` and `workflow` permissions  
*   Jira site with admin access  

Development
-----------

*   Run the app locally with tunnel:

    ```bash
    forge tunnel
    ```

*   Update manifest as needed for additional scopes and modules.  
*   View logs:

    ```bash
    forge logs
    ```
