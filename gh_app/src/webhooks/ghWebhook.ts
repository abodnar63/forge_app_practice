import { createLogger } from "../shared/logger";
import { getIssueFromPull, transitionIssueToDone } from "../services";

const log = createLogger("GH Webhook")

export async function ghWebhookHandler(event: { body: string }) {
  const body = JSON.parse(event.body);
  log.info(`ghWebhookHandler: received for action ${body.action}`)
  if (body.action === 'closed' && body.pull_request?.merged) {
    log.info(`ghWebhookHandler: received for ${body?.pull_request?.title}`)
    try {
      const title = body.pull_request.title || '';
      const issue = await getIssueFromPull({title})
      if (!issue) {
        log.warn(`ghWebhookHandler: issue not found for ${title}`)
        return { statusCode: 200, body: `Issue Not Found for ${title}` };
      }

      await transitionIssueToDone(issue.key);
      
      return { statusCode: 200, body: `Issue ${issue.key} moved to Done` };
    } catch (err) {
      log.error(`ghWebhookHandler: failed with error ${err}`)
      return { statusCode: 200, body: `Error ${err}` };
    }
  }

  return { statusCode: 200, body: 'Ignored' };
}