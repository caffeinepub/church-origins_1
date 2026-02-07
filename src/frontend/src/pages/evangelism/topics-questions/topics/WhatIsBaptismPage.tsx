import TopicPageShell from '../TopicPageShell';
import { topicsQuestionsContent } from '../../../topicsQuestionsContent';

export default function WhatIsBaptismPage() {
  const topic = topicsQuestionsContent.find(t => t.slug === 'what-is-baptism')!;
  return <TopicPageShell topic={topic} />;
}
