import TopicPageShell from '../TopicPageShell';
import { topicsQuestionsContent } from '../../../topicsQuestionsContent';

export default function WhatIsTheChurchPage() {
  const topic = topicsQuestionsContent.find(t => t.slug === 'what-is-the-church')!;
  return <TopicPageShell topic={topic} />;
}
