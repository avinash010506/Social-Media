const http = require('http');

const request = (method, path, body = null) => {
  return new Promise((resolve, reject) => {
    const dataStr = body ? JSON.stringify(body) : '';
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    if (body) {
      options.headers['Content-Length'] = Buffer.byteLength(dataStr);
    }

    const req = http.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(responseBody));
          } catch (e) {
            resolve(responseBody);
          }
        } else {
          reject(new Error(`Status: ${res.statusCode}, Body: ${responseBody}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (body) {
      req.write(dataStr);
    }
    req.end();
  });
};

const runTest = async () => {
  console.log("Starting API Integration Verification Tests...\n");

  try {
    // 1. Sign up Alice
    console.log("1. Registering Alice...");
    const aliceSignup = await request('POST', '/api/signup', {
      name: "Alice Smith",
      username: "alice",
      email: "alice@example.com",
      password: "Password123"
    });
    console.log("   Success:", aliceSignup.response.username);

    // 2. Login Alice
    console.log("2. Logging in Alice...");
    const aliceLogin = await request('POST', '/api/login', {
      username: "alice",
      password: "Password123"
    });
    console.log("   Success! Token received:", !!aliceLogin.token);

    // 3. Sign up Bob
    console.log("3. Registering Bob...");
    const bobSignup = await request('POST', '/api/signup', {
      name: "Bob Jones",
      username: "bob",
      email: "bob@example.com",
      password: "Password123"
    });
    console.log("   Success:", bobSignup.response.username);

    // 4. Retrieve all users
    console.log("4. Fetching all users...");
    const usersList = await request('GET', '/api/users');
    console.log("   Registered users count:", usersList.response.length);
    console.log("   User list:", usersList.response.map(u => u.username).join(', '));

    // 5. Create a feed post for Alice
    console.log("5. Alice publishing a post...");
    const post = await request('POST', '/api/posts', {
      username: "alice",
      name: "Alice Smith",
      imageUrl: "https://picsum.photos/id/237/600/400",
      caption: "A cute dog post!"
    });
    const postId = post.response._id;
    console.log("   Post published successfully. ID:", postId);

    // 6. Like Alice's post as Bob
    console.log("6. Bob liking Alice's post...");
    const like = await request('POST', `/api/posts/${postId}/like`, {
      username: "bob"
    });
    console.log("   Post likes after Bob's like:", like.response.likes);

    // 7. Comment on Alice's post as Bob
    console.log("7. Bob commenting on Alice's post...");
    const comment = await request('POST', `/api/posts/${postId}/comment`, {
      username: "bob",
      text: "So adorable!"
    });
    console.log("   Comments count:", comment.response.comments.length);
    console.log("   Last comment:", comment.response.comments[comment.response.comments.length - 1]);

    // 8. Fetch feed posts
    console.log("8. Fetching feed list...");
    const feed = await request('GET', '/api/posts');
    console.log("   Feed posts count:", feed.response.length);
    console.log("   First feed item caption:", feed.response[0].caption);

    // 9. Bob sending a chat message to Alice
    console.log("9. Bob sending a direct message to Alice...");
    const chatSent = await request('POST', '/api/messages', {
      sender: "bob",
      receiver: "alice",
      text: "Hi Alice, nice posts!"
    });
    console.log("   Message sent successfully. ID:", chatSent.response._id);

    // 10. Fetch chat history between Bob and Alice
    console.log("10. Fetching chat history between Bob and Alice...");
    const history = await request('GET', `/api/messages/alice?sender=bob`);
    console.log("   Chat message history length:", history.response.length);
    console.log("   Last message from:", history.response[0].sender, "Text:", history.response[0].text);

    console.log("\nALL VERIFICATION TESTS COMPLETED SUCCESSFULLY! \u2705");

  } catch (error) {
    console.error("\nTEST FAILED! \u274C");
    console.error(error);
    process.exit(1);
  }
};

runTest();
