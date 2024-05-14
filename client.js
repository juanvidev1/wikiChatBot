class Client {
  async botResponse(url, data) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    let options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };
    let response = await fetch(url, options);
    return response.json();
  }
}

export default Client;
