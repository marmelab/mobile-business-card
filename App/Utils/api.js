var api = {
  getProfile() {
    let url = 'https://api.linkedin.com/v1/people/~:(id,formatted-name,headline,picture-urls::(original),location,num-connections,industry,summary,email-address)?format=json';
    let headers = new Headers();
    headers.append('Connection', 'Keep-Alive');
    headers.append('Authorization', 'Bearer AQXzGMBEQfuTtHhkvNe3TfA1AeUPo-YpqtnEWynCyArKM4s4woX8P5I0s74PykqYtZtA91FN92Uqj2AamSkihv76X39djembMC5qNAyC0Y99JtTY7PEZrSoQw5evNk_M6PcpUfbewmThAxLoCX4HnrMAToDn20lS9R1LD-X6Eo1tMeENhUQ');

    return fetch(url, { headers }).then(res => res.json());
  }
};

module.exports = api;
