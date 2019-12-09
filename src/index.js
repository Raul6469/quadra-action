const core = require('@actions/core');
const github = require('@actions/github');

const quadra = require('quadra');

const getAnnotations = require('./annotations');
const getConclusion = require('./conclusion');

async function main () {
  const results = await quadra.check();

  const octokit = new github.GitHub(process.env.INPUT_TOKEN);

  const context = github.context;

  await octokit.checks.create({
    ...context.repo,
    name: 'quadra',
    head_sha: context.sha,
    status: 'completed',
    conclusion: getConclusion(results),
    output: {
      title: 'quadra',
      summary: '_See annotations below_',
      annotations: getAnnotations(results)
    }
  });
}

main()
  .catch(e => core.setFailed(e.message));
