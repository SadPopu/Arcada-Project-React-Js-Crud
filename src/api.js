// Endereço da API Laravel.
// - No portfolio (build com PUBLIC_URL=/arcada): /arcada/api, servido pela mesma app.
// - Em desenvolvimento (npm start): /api, reencaminhado para o Laravel pelo "proxy" do package.json.
// Para outra API: REACT_APP_API_URL=http://... npm start
export const API = process.env.REACT_APP_API_URL || `${process.env.PUBLIC_URL}/api`;
