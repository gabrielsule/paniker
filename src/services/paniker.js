const { pool } = require('../db/citus');

const getPaniker = async (email) => {
  const qry = `
    select * from paniker
    where email = '${email}';
  `;

  const res = await pool.query(qry)
  if (!res?.rows[0]) {
    return [];
  }
  else {
    return res.rows[0];
  }
};

const postPaniker = async (body) => {
  const qry = `
    insert into paniker
    (nickname, phone, email, coords, tokener)
    values
    ('${body.nickname}', ${body.phone}, '${body.email}', point(${body.latitude},${body.longitude}), '${body.tokener}')
    returning id
  `;

  const res = await pool.query(qry)
  if (!res?.rows[0]) {
    return [];
  }
  else {
    return res.rows[0];
  }
};


const putPaniker = async (body) => {
  const qry = `
    update paniker
    set nickname = '${body.nickname}', phone = ${body.phone}, coords = point(${body.latitude},${body.longitude}), tokener = '${body.tokener}'
    where email = '${body.email}'
    returning id
  `;

  const res = await pool.query(qry)
  if (!res?.rows[0]) {
    return [];
  }
  else {
    return res.rows[0];
  }
};

module.exports = {
  getPaniker: getPaniker,
  postPaniker: postPaniker,
  putPaniker: putPaniker
}
