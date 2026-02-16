import { useState } from 'react';
import { Button } from '../ui/button';
import { Copy, Check, Coins } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

const ICP_ADDRESS = '420c7ea0a86cc767e60cefdfa0d043aa3b2b9307d1f40ae9a38f3c66b064df97';

export default function SupportWithIcpButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ICP_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="icp-gradient-button whitespace-nowrap text-sm md:text-base border-0"
        >
          <Coins className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="hidden sm:inline">Support with ICP</span>
          <span className="sm:hidden">Support</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Support with ICP</DialogTitle>
          <DialogDescription>
            Send ICP tokens to support this ministry. Copy the address below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded bg-muted px-3 py-2 text-xs font-mono break-all">
              {ICP_ADDRESS}
            </code>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="flex-shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Thank you for your generous support of Church Origins and the Gospel message.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
