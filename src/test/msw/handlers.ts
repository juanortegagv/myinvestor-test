import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/funds', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '1');
    const limit = Number(url.searchParams.get('limit') ?? '10');
    const total = 3;
    const data = [
      { id: '1', name: 'Global Equity Fund', currency: 'USD', symbol: 'GEF', value: 120.45, category: 'GLOBAL', profitability: { YTD: 0.05, oneYear: 0.12, threeYears: 0.35, fiveYears: 0.5 } },
      { id: '2', name: 'Tech Growth Fund', currency: 'EUR', symbol: 'TGF', value: 210.32, category: 'TECH', profitability: { YTD: 0.08, oneYear: 0.18, threeYears: 0.42, fiveYears: 0.65 } },
      { id: '3', name: 'Healthcare Opportunities', currency: 'USD', symbol: 'HCO', value: 145.9, category: 'HEALTH', profitability: { YTD: 0.03, oneYear: 0.09, threeYears: 0.28, fiveYears: 0.41 } },
    ];
    const start = (page - 1) * limit;
    const end = page * limit;
    return HttpResponse.json({
      pagination: { page, limit, totalFunds: total, totalPages: Math.ceil(total / limit) },
      data: data.slice(start, end),
    });
  }),
  http.get('/funds/:id', ({ params }) => {
    return HttpResponse.json({ data: { id: String(params.id), name: 'X', currency: 'EUR', symbol: 'X', value: 1, category: 'GLOBAL', profitability: { YTD: 0, oneYear: 0, threeYears: 0, fiveYears: 0 } } });
  }),
  http.post('/funds/:id/buy', () => HttpResponse.json({ message: 'ok' })),
  http.post('/funds/:id/sell', () => HttpResponse.json({ message: 'ok' })),
  http.post('/funds/transfer', () => HttpResponse.json({ message: 'ok' })),
  http.get('/portfolio', () => HttpResponse.json({ data: [] })),
];


