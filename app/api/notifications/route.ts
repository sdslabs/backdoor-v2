export async function GET(request: Request) {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  const send = (title: string, description: string) => {
    const data = JSON.stringify({
      title,
      description,
      datetime: new Date().toISOString(),
    });
    writer.write(encoder.encode(`data: ${data}\n\n`));
  };

  const interval = setInterval(() => {
    const now = new Date();
    send(
      'New Notification',
      `This is a message sent at ${now.toLocaleTimeString()}`
    );
  }, 5000);

  request.signal.addEventListener('abort', () => {
    clearInterval(interval);
    writer.close();
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
