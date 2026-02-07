import TopicPageShell from '../TopicPageShell';
import { topicsQuestionsContent } from '../../../topicsQuestionsContent';

export default function WhatIsTheGospelPage() {
  const topic = topicsQuestionsContent.find(t => t.slug === 'what-is-the-gospel')!;
  return <TopicPageShell topic={topic} />;
}
