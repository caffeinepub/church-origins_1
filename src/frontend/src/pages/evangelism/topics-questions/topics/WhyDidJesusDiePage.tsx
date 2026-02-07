import TopicPageShell from '../TopicPageShell';
import { topicsQuestionsContent } from '../../../topicsQuestionsContent';

export default function WhyDidJesusDiePage() {
  const topic = topicsQuestionsContent.find(t => t.slug === 'why-did-jesus-die')!;
  return <TopicPageShell topic={topic} />;
}
