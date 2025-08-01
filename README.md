### **Node.js Microservice Challenge: Resilient API Integration**

**Objective**:  
Create a fault-tolerant microservice in Node.js that integrates with a third-party API (simulated) and implements retry logic, caching, and proper error handling.

#### **Requirements**:

1. **Simulate a Flaky API**:

   - Create a mock endpoint that randomly fails (40% failure rate) or succeeds (60% success rate)
   - When successful, return a JSON payload with mock product data
   - When failing, return a 500 error or timeout

2. **Implement Resilient Consumer**:

   - Create a Node.js service (Express/Fastify) with:
     - Exponential backoff retry mechanism (max 3 retries)
     - In-memory cache (store successful responses for 30s)
     - Circuit breaker pattern (stop calling after 5 consecutive failures)
     - Timeout handling (abort after 2s)

3. **Add Observability**:

   - Log retry attempts, cache hits, and circuit breaker state changes
   - Expose metrics endpoint with:
     - Total requests
     - Success/failure counts
     - Cache hit ratio
