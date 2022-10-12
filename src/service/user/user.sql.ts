const queryUserByLoginAccountSql = `
  SELECT
    t.user_id userId,
    t.user_name userName,
    t.user_phone userPhone,
    t.user_email userEmail,
    t.user_pwd userPwd,
    t.user_address userAddress,
    t.create_time createTime,
    t.update_time updateTime
  FROM
    t_user t
  WHERE
    t.user_email = ?
    OR t.user_name = ?
    OR t.user_phone = ?
`;

export { queryUserByLoginAccountSql };
