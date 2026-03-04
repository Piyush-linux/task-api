- [x] indexing
- [ ] Pagination
- [ ] filterig 
- [ ] API Design
- [ ] Error Handeling
- [ ] Docker
- [ ] Swagger API 
- [ ] API Testing : autocanon 
- [ ] Scalable 
- [ ] Testing API
- [ ] autocad, API testing tool
- [ ] Cluster


# ENV
```
NODE_ENV=development
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=taskuser
DB_PASSWORD=stronpassword
DB_NAME=task_manager
# openssl rand -hex 32
JWT_SECRET=0044168740a272a7ac27041740921a6fcd391fc4348311bbb2da9b9c049996bb

```


# Indexing
```sql
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_user_status ON tasks(user_id, status);
```
4️⃣ Composite Index (Optional)

If you frequently query like:

WHERE user_id=$1 AND status=$2

Then add:

CREATE INDEX idx_tasks_user_status
ON tasks(user_id, status);



# Connection Pooling Properly
```js
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

# Rate Limiting
npm install express-rate-limit
```sh
autocannon -c 100 -d 15 http://localhost:3000/auth/login

autocannon \
  -c 20 \
  -d 10 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/tasks
```

# Response Compression
```js
npm install compression
```


# Make API Stateless
```js

```

# Cluster / Scalibility



# Graceful Shutdown


# Security Headers
npm install helmet
What Helmet Protects Against:
X-DNS-Prefetch-Control
X-Frame-Options
X-Content-Type-Options
Strict-Transport-Security
Content-Security-Policy
These help prevent:
clickjacking
MIME sniffing attacks
XSS attacks
protocol downgrade attacks

# CORS Configuration

# API Documentation Section

# SQL injection protection

# input validation
Strict Input Sanitization: input.trim();
Stronger Password Policy: password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/)

# Protect Routes with Middleware

# XSS

# Account Lockout (Brute Force Protection)
An attacker might try thousands of passwords:
Update Database Schema:
```sql
ALTER TABLE users
ADD COLUMN failed_attempts INTEGER DEFAULT 0,
ADD COLUMN lock_until TIMESTAMP;
```

# Prevent Parameter Pollution

# API Testing Tools
