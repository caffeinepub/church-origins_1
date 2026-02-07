import TopicPageShell from '../TopicPageShell';
import { topicsQuestionsContent } from '../../../topicsQuestionsContent';

export default function HowToReadTheBiblePage() {
  const topic = topicsQuestionsContent.find(t => t.slug === 'how-to-read-the-bible')!;
  return <TopicPageShell topic={topic} />;
}
