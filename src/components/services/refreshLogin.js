export const reloadAuthToken = async (dispatch, googleUser) => {
  try {
    const tokenObj = await googleUser.reloadAuthResponse();
    console.log('TCL: reloadAuthToken -> tokenObj', tokenObj);

    dispatch({
      type: 'SET_ACCESS_TOKEN',
      payload: tokenObj.access_token,
    });

    dispatch({
      type: 'SET_EXPIRES_AT',
      payload: tokenObj.expires_at,
    });
  } catch (error) {
    console.log('Could not refresh token');
    console.log(error);
  }
};

export const checkRefresh = async (expiresAt, dispatch, googleUser) => {
  const oneMin = 60 * 1000;
  const threshold = 5;
  return new Promise(async (resolve) => {
    if (expiresAt - Date.now() < (threshold * oneMin)) {
      console.log('refreshing', expiresAt - Date.now() < (threshold * oneMin));
      await reloadAuthToken(dispatch, googleUser);
    } else {
      console.log('not refreshing', expiresAt - Date.now(), (threshold * oneMin));
    }

    resolve();
  });
};
