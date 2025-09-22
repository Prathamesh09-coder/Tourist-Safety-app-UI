export type ComplaintPayload = {
  reporter: string;
  contact?: string;
  category: string;
  title: string;
  details: string;
  address?: string;
  createdAt: string;
};

export async function submitComplaint(payload: ComplaintPayload): Promise<Response> {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL || 'https://httpbin.org';
  const url = `${baseUrl.replace(/\/$/, '')}/post`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return response;
}


