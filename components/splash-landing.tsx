import { Button } from '@/components/ui/button';

export default function SplashLanding() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-8 px-4">
      <h1 className="text-8xl sm:text-9xl font-display text-primary text-center">
        hydra
      </h1>
      <p className="max-w-sm text-center text-muted-foreground">
        Stay tuned for upcoming competitions and further information.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          disabled
          className="disabled:pointer-events-auto disabled:cursor-not-allowed"
        >
          Login
        </Button>
        <Button
          disabled
          variant="outline"
          className="disabled:pointer-events-auto disabled:cursor-not-allowed"
        >
          Sign Up
        </Button>
        <Button
          disabled
          variant="outline"
          className="disabled:pointer-events-auto disabled:cursor-not-allowed"
        >
          Reset Pass
        </Button>
      </div>
    </section>
  );
}
