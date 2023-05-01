export function isRedirect() {
  const code = getHashParams();
  if (code !== "") {
    return true;
  }
  return false;
}

export function getToken() {
  return getHashParams();
}

function getHashParams() {
  const codehash = window.location.hash.substring(1);
  const code = codehash.replace("access_token=", "");
  return code;
}
