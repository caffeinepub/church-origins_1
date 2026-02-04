import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Book, Lightbulb, MessageSquare } from 'lucide-react';
import type { ScriptureEntry, DiscernmentReflection, Testimony } from '../../backend';

type FeedItem =
  | { type: 'scripture'; data: ScriptureEntry; index: number }
  | { type: 'discernment'; data: DiscernmentReflection; index: number }
  | { type: 'testimony'; data: Testimony; index: number };

interface FeedItemCardProps {
  item: FeedItem;
}

export default function FeedItemCard({ item }: FeedItemCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (item.type === 'scripture') {
      navigate({ to: '/scripture/$index', params: { index: String(item.index) } });
    } else if (item.type === 'discernment') {
      navigate({ to: '/discernment/$index', params: { index: String(item.index) } });
    }
  };

  if (item.type === 'scripture') {
    const scripture = item.data;
    return (
      <Card
        className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-primary/60"
        onClick={handleClick}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <Book className="h-5 w-5 text-primary" />
              <Badge variant="secondary" className="text-xs">Scripture</Badge>
            </div>
          </div>
          <CardTitle className="text-xl font-serif mt-2">
            {scripture.references.join(', ')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3 leading-relaxed">
            {scripture.text}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (item.type === 'discernment') {
    const discernment = item.data;
    return (
      <Card
        className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-accent/60"
        onClick={handleClick}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-accent-foreground" />
              <Badge variant="outline" className="text-xs">Discernment Guidance</Badge>
            </div>
          </div>
          <CardTitle className="text-lg font-medium mt-2">
            {discernment.labels.length > 0 ? discernment.labels[0] : 'Reflection'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3 leading-relaxed">
            {discernment.content}
          </p>
          {discernment.references.length > 0 && (
            <p className="text-xs text-muted-foreground mt-3 italic">
              {discernment.references.join(', ')}
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  if (item.type === 'testimony') {
    const testimony = item.data;
    return (
      <Card className="border-l-4 border-l-muted">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <Badge variant="secondary" className="text-xs">Testimony (Personal Experience)</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {testimony.content}
          </p>
          {testimony.scriptureReferences.length > 0 && (
            <p className="text-xs text-muted-foreground mt-4 italic">
              References: {testimony.scriptureReferences.join(', ')}
            </p>
          )}
          <p className="text-xs text-muted-foreground/70 mt-4 italic">
            This testimony represents personal experience and is not doctrinal teaching.
          </p>
        </CardContent>
      </Card>
    );
  }

  return null;
}
