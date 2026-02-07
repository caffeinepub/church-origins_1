import TopicPageShell from '../TopicPageShell';
import { topicsQuestionsContent } from '../../../topicsQuestionsContent';

export default function HowToShareYourFaithPage() {
  const topic = topicsQuestionsContent.find(t => t.slug === 'how-to-share-your-faith')!;
  return <TopicPageShell topic={topic} />;
}
