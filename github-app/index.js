// const { Probot } = require("probot");

// module.exports = (app) => {
//   app.on('issues.opened', async (context) => {
//     context.log('Issue opened:', context.payload.issue.title);
//     const issueComment = context.issue({ body: 'Thanks for opening this issue!' });
//     await context.octokit.issues.createComment(issueComment);
//   });
// };

require('dotenv').config();
const { Octokit } = require('@octokit/rest');
const fs = require('fs');
module.exports = (app) => {
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

  async function enforceCodeFreeze(context) {
    const pulls = await context.octokit.pulls.list({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      state: 'open'
    });

    for (const pull of pulls.data) {
      await context.octokit.issues.addLabels({
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        issue_number: pull.number,
        labels: ['code freeze'],
      });
    }
  }

  app.on('issues.opened', async (context) => {
    context.log('Issue opened:', context.payload.issue.title);
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' });
    await context.octokit.issues.createComment(issueComment);
  });
};
