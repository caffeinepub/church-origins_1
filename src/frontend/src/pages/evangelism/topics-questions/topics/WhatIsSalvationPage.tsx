import TopicPageShell from '../TopicPageShell';
import { topicsQuestionsContent } from '../../../topicsQuestionsContent';

export default function WhatIsSalvationPage() {
  const topic = topicsQuestionsContent.find(t => t.slug === 'what-is-salvation')!;
  return <TopicPageShell topic={topic} />;
}
