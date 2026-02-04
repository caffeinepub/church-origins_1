import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useCreatePost } from '../../hooks/useQueries';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function CreatePostComposer() {
  const [content, setContent] = useState('');
  const [references, setReferences] = useState('');
  const createPost = useCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error('Please enter some content for your post');
      return;
    }

    try {
      const refArray = references
        .split(',')
        .map(r => r.trim())
        .filter(r => r.length > 0);
      
      await createPost.mutateAsync({ content: content.trim(), references: refArray });
      setContent('');
      setReferences('');
      toast.success('Post shared successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create post');
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Share your thoughts, reflections, or prayer requests..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none"
            disabled={createPost.isPending}
          />
          <Input
            placeholder="Scripture references (optional, comma-separated)"
            value={references}
            onChange={(e) => setReferences(e.target.value)}
            disabled={createPost.isPending}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={createPost.isPending || !content.trim()}
              size="sm"
            >
              {createPost.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Share Post
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
