export default function UserNotFound() {
  return (
    <div className="bg-background text-foreground p-6 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4">User Not Found</h1>
        <p className="text-xl mb-6">
          Sorry, we couldn&apos;t find a user with that username.
        </p>
      </div>
    </div>
  );
}
