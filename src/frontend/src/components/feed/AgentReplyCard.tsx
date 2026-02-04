import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle2, Book } from 'lucide-react';

interface AgentReplyCardProps {
  content: string;
  references: string[];
  timestamp: bigint;
}

export default function AgentReplyCard({ content, references, timestamp }: AgentReplyCardProps) {
  const date = new Date(Number(timestamp) / 1000000);

  return (
    <Card className="bg-accent/10 border-accent/30">
      <CardContent className="pt-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-medium text-sm">Scripture Agent</span>
          <Badge variant="secondary" className="flex items-center gap-1 text-xs">
            <CheckCircle2 className="h-3 w-3" />
            Verified System
          </Badge>
        </div>
        <p className="text-foreground leading-relaxed whitespace-pre-wrap mb-3">
          {content}
        </p>
        {references.length > 0 && (
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Book className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <span className="italic">{references.join(', ')}</span>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          {date.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
