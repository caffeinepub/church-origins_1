import TopicPageShell from '../TopicPageShell';
import { topicsQuestionsContent } from '../../../topicsQuestionsContent';

export default function WhatHappensAfterDeathPage() {
  const topic = topicsQuestionsContent.find(t => t.slug === 'what-happens-after-death')!;
  return <TopicPageShell topic={topic} />;
}
