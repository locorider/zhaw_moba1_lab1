# Running
Just call `npm install` and afterwards `npm run serve` to run the application with live-reloading

# Building
`npm run build`

# Lab questions
## However, the current implementation has one advantage over REST. What is this advantage?
Depending on the design and environment of the application there might be more than a single advantage.

- Older browsers may not support HTTP methods like *PUT*, *PATCH* or *DELETE*.
- An application firewall might block the POST body (unlikely but possible)
- Delete operations can be handled by a simple link (GET)
- GET requests remain in the browser history
- GET requests can be cached
- When dealing with 'processes' instead of simple data manipulation the API is cleaner and clearer.

## Sourcecode
The source code is available on [https://github.com/locorider/zhaw_moba1_lab2](https://github.com/locorider/zhaw_moba1_lab2)
