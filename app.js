const config    = require('./config.json'),
      { neon }  = require('@neondatabase/serverless');

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = config;

// true&&(PGHOST=PGHOST.replace('.', '-pooler.'))
const sql = neon(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`);
console.log('::HIT::', `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`)

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result[0]);
}

// getPgVersion();

['server_addr', 'server_port'].forEach(query=>{
  sql(`select ${'inet_'+query}()`).then(arr=>{
    console.log('::QUERY::', query, arr)
  })
})