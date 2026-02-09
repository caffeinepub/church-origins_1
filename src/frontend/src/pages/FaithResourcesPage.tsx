import { Link } from '@tanstack/react-router';
import EvangelismPageShell from '../components/evangelism/EvangelismPageShell';
import EvangelismCtaCard from '../components/evangelism/EvangelismCtaCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { BookOpen, Heart, Users, MessageCircle } from 'lucide-react';

export default function FaithResourcesPage() {
  return (
    <EvangelismPageShell
      title="Faith Resources"
      subtitle="Tools and guidance for growing in your relationship with Jesus Christ"
      showHero={true}
    >
      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-foreground">
          Whether you're exploring faith for the first time or seeking to deepen your walk with Christ, these resources will help guide you on your spiritual journey.
        </p>

        <Card className="border-border/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-serif">Getting Started</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base leading-relaxed">
              If you're new to faith or considering what it means to follow Jesus, start here. These foundational resources explain the Gospel message and how to begin a relationship with God.
            </p>
            <div className="grid gap-3 mt-4">
              <Link
                to="/peace-with-god"
                className="block p-4 border border-border/40 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors"
              >
                <h4 className="font-semibold mb-1">Peace with God</h4>
                <p className="text-sm text-muted-foreground">
                  Understand the Gospel message and God's plan for reconciliation
                </p>
              </Link>
              <Link
                to="/why-jesus"
                className="block p-4 border border-border/40 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors"
              >
                <h4 className="font-semibold mb-1">Why Jesus?</h4>
                <p className="text-sm text-muted-foreground">
                  Discover the unique identity and work of Jesus Christ
                </p>
              </Link>
              <Link
                to="/how-to-begin"
                className="block p-4 border border-border/40 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors"
              >
                <h4 className="font-semibold mb-1">How to Begin</h4>
                <p className="text-sm text-muted-foreground">
                  Step-by-step guidance for starting your faith journey
                </p>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-serif">Growing in Faith</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base leading-relaxed">
              For believers seeking to grow deeper in their relationship with Christ, these resources provide guidance on assurance, spiritual disciplines, and next steps in your walk with God.
            </p>
            <div className="grid gap-3 mt-4">
              <Link
                to="/assurance-next-steps"
                className="block p-4 border border-border/40 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors"
              >
                <h4 className="font-semibold mb-1">Assurance & Next Steps</h4>
                <p className="text-sm text-muted-foreground">
                  Find confidence in your salvation and learn how to grow
                </p>
              </Link>
              <Link
                to="/topics-questions/how-to-read-the-bible"
                className="block p-4 border border-border/40 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors"
              >
                <h4 className="font-semibold mb-1">How to Read the Bible</h4>
                <p className="text-sm text-muted-foreground">
                  Practical guidance for engaging with Scripture
                </p>
              </Link>
              <Link
                to="/topics-questions/what-is-prayer"
                className="block p-4 border border-border/40 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors"
              >
                <h4 className="font-semibold mb-1">What Is Prayer?</h4>
                <p className="text-sm text-muted-foreground">
                  Learn about communicating with God through prayer
                </p>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-serif">Community & Church Life</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base leading-relaxed">
              Faith is not meant to be lived in isolation. Discover the importance of Christian community and how to connect with other believers.
            </p>
            <div className="grid gap-3 mt-4">
              <Link
                to="/connect"
                className="block p-4 border border-border/40 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors"
              >
                <h4 className="font-semibold mb-1">Connect with Community</h4>
                <p className="text-sm text-muted-foreground">
                  Join the Church Origins community and find local fellowship
                </p>
              </Link>
              <Link
                to="/topics-questions/what-is-the-church"
                className="block p-4 border border-border/40 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors"
              >
                <h4 className="font-semibold mb-1">What Is the Church?</h4>
                <p className="text-sm text-muted-foreground">
                  Understand God's design for the body of Christ
                </p>
              </Link>
              <Link
                to="/topics-questions/what-is-baptism"
                className="block p-4 border border-border/40 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors"
              >
                <h4 className="font-semibold mb-1">What Is Baptism?</h4>
                <p className="text-sm text-muted-foreground">
                  Learn about this important step of obedience
                </p>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/40 bg-accent/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <MessageCircle className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-serif">Topics & Questions</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base leading-relaxed">
              Have specific questions about faith, theology, or Christian living? Browse our comprehensive collection of biblical answers to common questions.
            </p>
            <Link
              to="/topics-questions"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Explore All Topics
              <span className="text-lg">→</span>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Church Origins Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              Church Origins exists to help people discover and grow in their relationship with Jesus Christ through Scripture-centered content, authentic community, and biblical teaching. Every resource here is designed to point you to the truth of God's Word and the hope found in the Gospel.
            </p>
          </CardContent>
        </Card>

        <EvangelismCtaCard />
      </div>
    </EvangelismPageShell>
  );
}
