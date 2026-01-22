---
description: How to add a new backend feature
---

1. Create the API route in `app/api/[feature]/route.ts`.
2. Secure it: Include the auth check block:
```typescript
const token = req.cookies.get('token')?.value || req.headers.get('authorization')?.split(' ')[1];
if (!token) return errorResponse('Not authorized', 401);
```
3. Update `task.md` to reflect the new API.
4. Notify user of the new capability.
