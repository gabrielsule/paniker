const { pool } = require('../db/citus');

const getCloseCircles = async (phone) => {
  const qry = `
    select p.*
    from panikers as p
    where p.id in
    (
      select cc.contact_id
      from close_circle as cc
      inner join panikers p2
      on cc.paniker_id = p2.id
      where p2.phone = ${phone}
    );   
`;

  const res = await pool.query(qry)
  if (!res?.rows[0]) {
    return [];
  }
  else {
    return res.rows;
  }
};

module.exports = {
  getCloseCircles: getCloseCircles,
}
