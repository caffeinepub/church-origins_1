import TopicPageShell from '../TopicPageShell';
import { topicsQuestionsContent } from '../../../topicsQuestionsContent';

export default function WhatIsRepentancePage() {
  const topic = topicsQuestionsContent.find(t => t.slug === 'what-is-repentance')!;
  return <TopicPageShell topic={topic} />;
}
