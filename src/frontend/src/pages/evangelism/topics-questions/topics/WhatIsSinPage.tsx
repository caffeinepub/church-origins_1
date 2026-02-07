import TopicPageShell from '../TopicPageShell';
import { topicsQuestionsContent } from '../../../topicsQuestionsContent';

export default function WhatIsSinPage() {
  const topic = topicsQuestionsContent.find(t => t.slug === 'what-is-sin')!;
  return <TopicPageShell topic={topic} />;
}
