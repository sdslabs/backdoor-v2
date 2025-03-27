import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-4">
      <h1 className="text-6xl font-display text-primary">backdoor</h1>
      <p>Here are the buttons and badges as per the design.</p>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4">
          <p className="text-xl uppercase">Button</p>
          <Button>Default</Button>
          <Button variant={'highlight'}>Highlight</Button>
          <Button variant={'secondary'}>Secondary</Button>
          <Button variant={'outline'}>Outline</Button>
          <Button variant={'outline-highlight'}>Outline highlight</Button>
          <Button variant={'destructive'}>Destructive</Button>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xl uppercase">Badge</p>
          <Badge>Default</Badge>
          <Badge variant={'primary'}>Primary</Badge>
          <Badge variant={'highlight'}>Highlight</Badge>
          <Badge variant={'outline'}>Outline</Badge>
          <Badge variant={'destructive'}>Destructive</Badge>
        </div>
      </div>
      <p>Make a route for testing your components :)</p>
    </div>
  );
}
