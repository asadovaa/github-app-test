require('dotenv').config();
const { Octokit } = require('@octokit/rest');
const fs = require('fs');

// Read environment variables
const appId = process.env.APP_ID;
const privateKeyPath = process.env.PRIVATE_KEY_PATH;
const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');
const webhookSecret = process.env.WEBHOOK_SECRET;
const githubToken = process.env.GITHUB_TOKEN;

const octokit = new Octokit({
  auth: githubToken
});

const holidays = [
  "01.20.2024", 
  "03.08.2024", 
  "03.20.2024", 
  "03.21.2024", 
  "03.22.2024", 
  "03.23.2024", 
  "03.24.2024", 
  "04.10.2024", 
  "04.11.2024", 
  "05.09.2024", 
  "05.28.2024", 
  "06.15.2024", 
  "06.16.2024", 
  "06.17.2024", 
  "06.26.2024", 
  "11.08.2024", 
  "11.09.2024", 
  "12.31.2024"
];

function isHoliday() {
  const today = new Date();
  const todayStr = today.toLocaleDateString('en-GB').replace(/\//g, '.');
  return holidays.includes(todayStr);
}

async function enforceCodeFreeze(owner, repo) {
  const pulls = await octokit.pulls.list({
    owner: owner,
    repo: repo,
    state: 'open'
  });

  for (const pull of pulls.data) {
    await octokit.issues.addLabels({
      owner: owner,
      repo: repo,
      issue_number: pull.number,
      labels: ['code freeze'],
    });
  }
}

async function main() {
  if (isHoliday()) {
    const owner = 'your-github-username';
    const repo = 'your-repo-name';
    await enforceCodeFreeze(owner, repo);
    console.log('Code freeze enforced.');
  } else {
    console.log('Today is not a holiday. No action taken.');
  }
}

main();
