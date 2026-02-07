import TopicPageShell from '../TopicPageShell';
import { topicsQuestionsContent } from '../../../topicsQuestionsContent';

export default function WhoIsGodPage() {
  const topic = topicsQuestionsContent.find(t => t.slug === 'who-is-god')!;
  return <TopicPageShell topic={topic} />;
}
