import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSubmitTestimony } from '../hooks/useQueries';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2, CheckCircle2, Info } from 'lucide-react';

export default function SubmitTestimonyPage() {
  const navigate = useNavigate();
  const submitTestimony = useSubmitTestimony();

  const [content, setContent] = useState('');
  const [scriptureRefs, setScriptureRefs] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    const references = scriptureRefs
      .split(',')
      .map((ref) => ref.trim())
      .filter((ref) => ref.length > 0);

    try {
      await submitTestimony.mutateAsync({
        content: content.trim(),
        labels: [],
        disclaimers: ['This testimony represents personal experience and is not doctrinal teaching.'],
        scriptureReferences: references,
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit testimony:', error);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl font-serif">Testimony Submitted</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Thank you for sharing your testimony. Your submission is now pending review and will appear
              in the community feed once approved.
            </p>
            <p className="text-sm text-muted-foreground">
              We review all testimonies to ensure they align with our community guidelines and provide
              edifying content for others on their spiritual journey.
            </p>
            <div className="pt-4 flex gap-3">
              <Button onClick={() => navigate({ to: '/feed' })}>
                Return to Feed
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  setContent('');
                  setScriptureRefs('');
                }}
              >
                Submit Another
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-serif">Share Your Testimony</CardTitle>
          <CardDescription className="text-base leading-relaxed">
            Share how you've witnessed God's work in your life. Your testimony may encourage others
            on their spiritual journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm leading-relaxed">
              <strong>Important:</strong> Testimonies shared here represent personal experience and spiritual
              insight, not authoritative doctrine. They are meant to encourage reflection and bear witness
              to God's work in our lives.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="content">Your Testimony</Label>
              <Textarea
                id="content"
                placeholder="Share your testimony... How have you seen God at work? What has He revealed to you? How has your faith grown?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                required
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Be specific and honest. Share what God has done, not what you think should be shared.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scriptureRefs">Scripture References (Optional)</Label>
              <Input
                id="scriptureRefs"
                type="text"
                placeholder="e.g., John 3:16, Romans 8:28"
                value={scriptureRefs}
                onChange={(e) => setScriptureRefs(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple references with commas.
              </p>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={submitTestimony.isPending || !content.trim()}
              >
                {submitTestimony.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Testimony'
                )}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              By submitting, you acknowledge this testimony represents your personal experience
              and will be reviewed before appearing in the community feed.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
