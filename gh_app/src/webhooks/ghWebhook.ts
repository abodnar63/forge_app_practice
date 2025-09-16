import { getIssueFromPull, transitionIssueToDone } from "../services";

export async function ghWebhookHandler(event: { body: string }) {
  const body = JSON.parse(event.body);

  if (body.action === 'closed' && body.pull_request?.merged) {
    try {
      const title = body.pull_request.title || '';
      const issue = await getIssueFromPull({title})
      if (!issue) {
        console.log("issue does not exist for", title);
        return { statusCode: 200, body: `Issue Not Found for ${title}` };
      }

      await transitionIssueToDone(issue.key);

      return { statusCode: 200, body: `Issue ${issue.key} moved to Done` };
    } catch (err) {
      return { statusCode: 200, body: `Error ${err}` };
    }
  }

  return { statusCode: 200, body: 'Ignored' };
}