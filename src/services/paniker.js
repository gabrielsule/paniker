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

const upsertPaniker = async (body) => {

  const qry = `
    INSERT INTO public.panikers
    (username, phone, email, coords, tokener)
    VALUES ('${body.username}', ${body.phone}, '${body.email}', point(${body.latitude},${body.longitude}), '${body.tokener}')
    ON CONFLICT (phone)
    DO UPDATE
    SET username=EXCLUDED.username, email=EXCLUDED.email, phone=EXCLUDED.phone, tokener=EXCLUDED.tokener, coords=EXCLUDED.coords
    returning id;
  `;

  const res = await pool.query(qry);

  if (res.rows.length !== 0) {
    if (body.masterId !== 0) {
      const data = await fillCloseCircle(body.masterId, res.rows[0].id);

      if (data) {
        return res.rows[0].id
      } else {
        throw new Error("error insertando datos");
      }
    }
  }
};

const fillCloseCircle = async (masterId, contactId) => {
  const qry = `
    INSERT INTO public.close_circle
    (paniker_id, contact_id)
    VALUES(${masterId}, ${contactId})
    ON CONFLICT (paniker_id, contact_id)
    DO NOTHING;`;

  console.log(qry);

  return await pool.query(qry)
    .then((res) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};


module.exports = {
  getPaniker: getPaniker,
  upsertPaniker: upsertPaniker,
}
