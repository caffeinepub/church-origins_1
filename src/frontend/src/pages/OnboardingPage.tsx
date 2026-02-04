import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSaveUserProfile } from '../hooks/useQueries';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Loader2 } from 'lucide-react';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const saveProfile = useSaveUserProfile();

  const [name, setName] = useState('');
  const [lifeSituation, setLifeSituation] = useState('');
  const [spiritualNeeds, setSpiritualNeeds] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !lifeSituation.trim() || !spiritualNeeds.trim()) {
      return;
    }

    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        lifeSituation: lifeSituation.trim(),
        spiritualNeeds: spiritualNeeds.trim(),
      });
      navigate({ to: '/feed' });
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-serif">Welcome</CardTitle>
          <CardDescription className="text-base leading-relaxed">
            Help us tailor your daily Scripture and reflections to your spiritual journey.
            This information helps us provide content that speaks to where you are today.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lifeSituation">Life Situation</Label>
              <Textarea
                id="lifeSituation"
                placeholder="Share a bit about your current life situation (e.g., student, parent, career transition, retirement...)"
                value={lifeSituation}
                onChange={(e) => setLifeSituation(e.target.value)}
                rows={3}
                required
              />
              <p className="text-xs text-muted-foreground">
                This helps us provide relevant Scripture and reflections.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="spiritualNeeds">Spiritual Needs & Focus Areas</Label>
              <Textarea
                id="spiritualNeeds"
                placeholder="What areas of spiritual growth are you focusing on? (e.g., discernment, patience, faith during trials, understanding God's will...)"
                value={spiritualNeeds}
                onChange={(e) => setSpiritualNeeds(e.target.value)}
                rows={4}
                required
              />
              <p className="text-xs text-muted-foreground">
                Share what you're seeking guidance on in your walk with God.
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={saveProfile.isPending || !name.trim() || !lifeSituation.trim() || !spiritualNeeds.trim()}
            >
              {saveProfile.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Continue to Daily Feed'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
