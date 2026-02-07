import TopicPageShell from '../TopicPageShell';
import { topicsQuestionsContent } from '../../../topicsQuestionsContent';

export default function WhatIsFaithPage() {
  const topic = topicsQuestionsContent.find(t => t.slug === 'what-is-faith')!;
  return <TopicPageShell topic={topic} />;
}
