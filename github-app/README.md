Example Workflow
Here is a summary of the steps:

Verify Installation:

Check package.json for probot and @octokit/rest.
Check node_modules for the installed packages.
Create index.js:

Add basic Probot app code.
**Run Probot

---
Copy code
npx probot run ./index.js
Use smee.io to Forward Webhooks:

Start a new channel on smee.io.
Copy the webhook proxy URL.
Update your GitHub App's webhook URL with the smee.io URL.
Run smee to forward requests:
---
Copy code
npx smee -u YOUR_SMEE_URL -t http://localhost:3000/
Install the GitHub App:

Install your GitHub App on a test repository.
Test the Webhook:

Open a new issue in the test repository and check for a response from the Probot app.