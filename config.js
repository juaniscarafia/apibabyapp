module.exports = {
  api: {
    port: process.env.API_PORT || 3004
  },
  pathBKP: './database/bkp',
  bkpH: '*/3',
  bkpM: '*'
};
